import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../../server/images/petvet_logo.png";
import photo from "../../../../server/images/photo.png";
import "./add_pet.css";

export default class AddPet extends Component {
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
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    const { form } = this.state;
    form[name] = value;
    this.setState({ form: { ...form } });
  }

  handleSubmit(e) {
    console.log(e);
    e.preventDefault();
    console.log(this.state.form);
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
          <div className="picture">
            <img src={photo} />
          </div>
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

          <Link to="/pet-list/">
            <button className="btn btn-primary">Add Another Pet</button>
          </Link>
        </form>
      </div>
    );
  }
}
