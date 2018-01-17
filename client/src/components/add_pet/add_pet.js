import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../../server/images/petvet_logo.png";
import photo from "../../../../server/images/photo.png";
import "./add_pet.css";
import axios from 'axios';
// import PetImgUpload from '../pet_img_upload/pet_img_upload';

import { connect } from "react-redux";
import { addPet, uploadImage } from "../../actions/";


class AddPet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        name: "",
        dob: "",
        breed: ""
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.currentOwnerId = null;
    this.url = null;
  }



  componentWillMount() {


    if(this.props.id){
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

    console.log('this.currentOwnerId', this.currentOwnerId);
    console.log('It works in add pet');


    const {name, dob, breed} = this.state.form;


                                            //this will be the url variable
    this.props.addPet(name, dob, breed, this.currentOwnerId , this.url).then(()=>this.props.history.push('/pet-to-vet/' + this.props.petId));

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
        // var fileName = e.target.files[0];


        //axios call for page.php
        //GET request user file name
        //return URL to store in db
        console.log(document.getElementById('file').files[0]);

        let data = new FormData();
        data.append('file', document.getElementById('file').files[0]);

        this.props.uploadImage(data).then(()=> this.url = this.props.url.data[0])

        // axios({
        //     method: 'post',
        //     encType: 'multipart/form-data',
        //     url: '../../../../server/database_connect/server.php?action=post&resource=upload-item',
        //     data: data,
        // }).then(function(res) {
        //     console.log(res);
        // });
    }
  render() {
      console.log(this.props);
    const { name, dob, breed } = this.state.form;
    return (
      <div>
        <div className="pictureContainer">
          <h2 className="text-center">Add Pet</h2>
        </div>
        <div>
          <form onSubmit={(e)=>this.getFileName(e)}>
            <input type="file" name="file" id='file'/>
            <button name="upload" value="true">upload</button>
          </form>
        </div>
        <form className="container" onSubmit={e => this.handleSubmit(e)}>
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

          <button className="btn btn-primary">Add Another Pet</button>

        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    id: state.login.id,
    url: state.uploadImage,
    petId: state.addPet.petId,
  };
}



export default connect(mapStateToProps, {
  addPet: addPet,
  uploadImage: uploadImage
})(AddPet);





