import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { login, switchAuthentication } from "../../actions/";
import petBtn from "../../../dist/assets/images/pet_btn.png";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: "",
        password: ""
      },
      loginSuccess: true
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

    /////////////////////////////////////just for testing purposes
      let url = '/server/database_connect/server.php?action=post&resource=update_session';
      axios({
          url: url,
          method: 'post',
          dataType: 'json',
          data: {
              id: 1,
              auth: true,
              logout: true,
          }
      }).then(function(res) {
        url = '/server/database_connect/server.php?action=post&resource=read_session';
        axios({
            url: url,
            method: 'post',
            dataType: 'json',
            data: {
              id: 1,
            }
        })
      });
      // //////////////////////////////

    this.props
      .login(this.state.form.username, this.state.form.password)
      .then(() => {
        if (this.props.loginSuccess) {
          this.props.switchAuthentication(true);
          this.props.history.push("/pet-list/");
        }else{
          this.setState({
            loginSuccess: false
          })
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
      overflowY: "none"
    };
    const btnSize = {
      width: "150px"
    };

    return (
      <div className="bodyContainer" style={noScroll}>
        <div className="logoContainer">
          <h1>OWNER LOG IN</h1>
          <img style={btnSize} src={petBtn} />
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
              <p className="text-danger">{!this.state.loginSuccess? 'Incorrect username or password': ''}</p>
            </div>
            <div className="buttonContainer">
              <div className="register float-left text-left">
                <p className="d-inline">
                  <small>New User?</small>
                </p>
                <Link className="d-inline" to="/parent-page/">
                  <button
                    type="button"
                    className="btn btn-outline-success btn-sm"
                  >
                    Register
                  </button>
                </Link>
              </div>
              <button type="submit" className="btn btn-outline-primary btn-sm">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    id: state.login.id,
    loginSuccess: state.login.loginSuccess
  };
}

export default connect(mapStateToProps, { login, switchAuthentication })(LoginPage);
