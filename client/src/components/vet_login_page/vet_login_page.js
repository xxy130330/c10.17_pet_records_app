import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../../server/images/petvet_logo.png";
import axios from "axios";
import { connect } from "react-redux";
import { vet_login, switchAuthentication } from "../../actions/";
import vetBtn from "../../../dist/assets/images/vet_btn.png";

class VetLoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: "",
        password: ""
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
    e.preventDefault();

    this.props
      .vet_login(this.state.form.username, this.state.form.password)
      .then(() => {
        if (this.props.success) {
          this.props.switchAuthentication(true);
          this.props.history.push("/client-list/" + this.props.id);
        }
      });

    this.setState({
      form: {
        username: "",
        password: ""
      },
      PetData: this.state.PetData
    });
  }

  render() {
    const { username, password } = this.state.form;

    const noScroll = {
      "overflow-y": "none"
    };

    const btnSize = {
      width: '150px'
    }

    return (
      <div className="bodyContainer" style={noScroll}>
        <div className="logoContainer">
          <h1>VET LOG IN</h1>
          <img style={btnSize} src={vetBtn} />
        </div>
        <div className="row formContainer align-items-center">
        <form
        className="col-10 offset-1"
          onSubmit={e => this.handleSubmit(e)}
        >
          <div className="form-group">
            <label>Email: </label>
            <input
              className="form-control "
              type="text"
              placeholder="Email"
              onChange={e => this.handleInputChange(e)}
              name="username"
              value={username}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              onChange={e => this.handleInputChange(e)}
              name="password"
              value={password}
            />
            <p className="text-danger">{this.props.errorMessage}</p>
          </div>
          <div className="buttonContainer">
            <button className="btn btn-outline-primary">Login</button>
          </div>
          <br />
          <div id="register">
            New User?
            <Link to="/parent-page/"><button className="btn btn-outline-success btn-sm">Register</button></Link>
          </div>
        </form>
        </div>
      </div>
    );
  }
}

// onclick="verifyLogin()"

function mapStateToProps(state) {
  return {
    id: state.vetlogin.id,
    success: state.vetlogin.success,
    errorMessage: state.vetlogin.errorMessage
  };
}

export default connect(mapStateToProps, { vet_login, switchAuthentication })(
  VetLoginPage
);
