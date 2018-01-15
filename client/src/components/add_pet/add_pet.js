import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../../server/images/petvet_logo.png";
import photo from "../../../../server/images/photo.png";
import "./add_pet.css";
import axios from 'axios';
import PetImgUpload from '../pet_img_upload/pet_img_upload';

import { connect } from "react-redux";
import { addPet } from "../../actions/";


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
    this.props.addPet(name, dob, breed, this.currentOwnerId , 'http://localhost/server/images/rat.jpg').then(()=>this.props.history.push('/pet-list/'));

    this.setState({
      form: {
        name: "",
        dob: "",
        breed: ""
      }
    });


  }
  render() {
    const { name, dob, breed } = this.state.form;
    return (
      <div>
        <div className="pictureContainer">
          <h2 className="text-center">Add Pet</h2>
        </div>
        <div>
          <PetImgUpload/>
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
  };
}



export default connect(mapStateToProps, {
  addPet: addPet
})(AddPet);





