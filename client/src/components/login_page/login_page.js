import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../../server/images/petvet_logo.png";
import axios from "axios";
import { connect } from "react-redux";
import { login, switchAuthentication } from "../../actions/";

class LoginPage extends Component {
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
      .login(this.state.form.username, this.state.form.password)
      .then(() => {
        if (this.props.success) {
          this.props.switchAuthentication(true);
          this.props.history.push("/pet-list/");
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

    return (
      <div className='bodyContainer'>
        <div className="logoContainer">
          <h1>PET LOG IN</h1>
          <div className="logo" />
        </div>
        <form
          id="form-container"
          className="col-xs-10 col-xs-offset-1"
          onSubmit={e => this.handleSubmit(e)}
        >
          <div className="form-group">
            <label>User Name</label>
            <input
              className="form-control input-lg"
              type="text"
              placeholder="Username"
              onChange={e => this.handleInputChange(e)}
              name="username"
              value={username}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              className="form-control input-lg"
              type="password"
              placeholder="Password"
              onChange={e => this.handleInputChange(e)}
              name="password"
              value={password}
            />
            <p className="text-danger">{this.props.errorMessage}</p>
          </div>
          <div className="buttonContainer">
            {/*<Link to="/pet-list/" >*/}
            <button className="btn btn-primary">Login</button>
            {/*</Link>*/}
          </div>
          <br />
          <div id="register">
            New User?
            <Link to="/parent-page/">Register</Link>
          </div>
        </form>
      </div>
    );
  }
}

// onclick="verifyLogin()"

function mapStateToProps(state) {
  return {
    id: state.login.id,
    success: state.login.success,
    errorMessage: state.login.errorMessage
  };
}

export default connect(mapStateToProps, { login, switchAuthentication })(LoginPage);
