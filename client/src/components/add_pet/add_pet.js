import React, { Component } from "react";
import { Link } from "react-router-dom";
import photo from "../../../../server/images/photo.png";
import "./add_pet.css";
import axios from "axios";
import { connect } from "react-redux";
import { addPet, uploadImage } from "../../actions/";
import "../../../node_modules/croppie/croppie.css";
import croppie from "croppie";
import loading from '../../../dist/assets/images/loading.gif';
import { Field, reduxForm } from "redux-form";

class AddPet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonClick: false,
      errorMessage: "",
      imageUpload: false
    };


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

  handleSubmit(values) {
    this.setState({
      imageUpload:false
    })


    const { name, dob, breed } = values;
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
          this.upload(result.data.data[0], values);
        });
      });
  }

  upload(url, values) {
    const { name, dob, breed } = values;
    this.url = url;

    this.props
      .addPet(name, dob, breed, this.currentOwnerId, this.url)
      .then(res => {
        this.props.history.push("/pet-to-vet/" + this.props.petId + "/null");
      })

    this.props.reset();
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


  renderInput({input, type, label, meta:{touched, error}, meta}){
    return(
      <div className="form-group">
        <label>{label}</label>
        <input
          className="form-control input-lg"
          type={type}
          {...input}
        />
        <p className="text-danger">{touched && error}</p>
      </div>
    )
  }

  render() {

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

        <form className="container" onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}>
          <div className="text-center smallTagDiv">
            <small>Click on the camera to upload an image.</small>
          </div>

          <Field
            name="name"
            type="text"
            label="Name"
            component={this.renderInput}
          />
          <Field
            name="dob"
            type="date"
            label="D O B"
            component={this.renderInput}
          />
          <Field
            name="breed"
            type="text"
            label="Breed"
            component={this.renderInput}
          />

          <button type='submit' className="btn btn-primary">Add Pet</button>
        </form>
      </div>
    );
  }
}


function validate(values) {
  const error = {};
  if (!values.name) {
    error.name = "Please enter your pet's name";
  }
  if (!values.dob) {
    error.dob = "Passwords enter your pet's D O B";
  }
  if (!values.breed) {
    error.breed = "Please enter your pet's breed";
  }
  return error;
}

AddPet = reduxForm({
  form: "add-pet",
  validate: validate
})(AddPet);

function mapStateToProps(state) {
  return {
    id: state.login.id,
    url: state.uploadImage,
    petId: state.addPet.petId
  };
}

export default connect(mapStateToProps, {
  addPet,
  uploadImage
})(AddPet);
