import React, { Component } from "react";
import { Link } from "react-router-dom";
import photo from "../../../../server/images/photo.png";
import "./add_pet.css";
import axios from "axios";
import { connect } from "react-redux";
import { addPet, uploadImage, readSessions } from "../../actions/";
import "../../../node_modules/croppie/croppie.css";
import croppie from "croppie";
import loading from '../../../dist/assets/images/loading.gif';

class AddPet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        name: "",
        dob: "",
        breed: ""
      },
      buttonClick: false,
      errorMessage: "",
      imageUpload: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.upload = this.upload.bind(this);
    this.currentOwnerId = null;
    this.url = null;
    this.croppie = null;
  }

  componentWillMount() {
    if (this.props.id) {
      this.currentOwnerId = this.props.id;
      localStorage.id = this.currentOwnerId;
    } else {
      this.currentOwnerId = localStorage.id;
    }
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    const { form } = this.state;
    form[name] = value;
    this.setState({ form: { ...form } });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      imageUpload:false
    })


    const { name, dob, breed } = this.state.form;
    if (!this.url) {
      this.props
        .addPet(
          name,
          dob,
          breed,
          this.currentOwnerId,
          "https://pawedin.com/system/pets/default_images/default_pet.jpg"
        )
        .then(() => {
          this.props.history.push("/pet-to-vet/" + this.props.petId + "/null");
        });
      return;
    }

    this.croppie
      .result({ type: "base64", size: "viewport", circle: true, format: "png" })
      .then(res => {
        axios({
          method: "post",
          encType: "multipart/form-data",
          url:
            "/server/database_connect/server.php?action=post&resource=base64_upload",
          data: {
            rawData: res,
            petID: this.props.petId
          }
        }).then(result => {
          this.upload(result.data.data[0]);
        });
      });
  }

  upload(url) {
    const { name, dob, breed } = this.state.form;
    this.url = url;

    this.props
      .addPet(name, dob, breed, this.currentOwnerId, this.url)
      .then(res => {
        this.props.history.push("/pet-to-vet/" + this.props.petId + "/null");
      })

    this.setState({
      form: {
        name: "",
        dob: "",
        breed: ""
      }
    });
  }

  getFileName(e) {
    e.preventDefault();

    this.setState({
      imageUpload: true
    })

    let data = new FormData();

    data.append("file", document.getElementById("file").files[0]);

    this.props
      .uploadImage(data)
      .then(res => {
        this.url = this.props.url.data[0];
      })
      .then(() => {
        this.setupCroppie(this.url);
      })

    this.setState({
      form: { ...this.state.form },
      buttonClick: true,
    });
  }

  setupCroppie(url) {


    let el = document.getElementById("croppie");

    this.croppie = new croppie(el, {
      viewport: { width: "100%", height: "100%", type: "circle" },
      boundary: { width: "100%", height: "100%" },
      showZoomer: true
    });

    this.croppie.bind({
      url: url
    });

  }

  render() {
    const { name, dob, breed } = this.state.form;

    const input = this.state.buttonClick ? ( "" ) : (
      <md-button>
        <input
          className="text-center"
          type="file"
          name="file"
          id="file"
          onChange={e => this.getFileName(e)}
        />
      </md-button>
    );

    console.log('image state', this.state.imageUpload);

    return (
      <div className="bodyContainer">
        <h2 className="text-center">Add Pet</h2>
        <p className="text-center" style={{ color: "red" }}>
          {this.state.errorMessage}
        </p>
        <div className='pictureContainer'>
          <div className={this.state.imageUpload ? 'pictureDivLoading' : 'pictureDiv'}>
            {input}
            <div type="file" name="croppie" id="croppie" />
          </div>
        </div>

        <form className="container" onSubmit={e => this.handleSubmit(e)}>
          <div className="text-center smallTagDiv">
            <small>Click on the camera to upload an image.</small>
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control input-lg"
              type="text"
              onChange={e => this.handleInputChange(e)}
              name="name"
              value={name}
            />
          </div>

          <div className="form-group">
            <label>D O B</label>
            <input
              className="form-control input-lg"
              type="date"
              onChange={e => this.handleInputChange(e)}
              name="dob"
              value={dob}
            />
          </div>

          <div className="form-group">
            <label>Breed</label>
            <input
              className="form-control input-lg"
              type="text"
              onChange={e => this.handleInputChange(e)}
              name="breed"
              value={breed}
            />
          </div>

          <button className="btn btn-primary">Add Pet</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    id: state.login.id,
    url: state.uploadImage,
    petId: state.addPet.petId
  };
}

export default connect(mapStateToProps, {
  addPet,
  uploadImage,
    readSessions
})(AddPet);
