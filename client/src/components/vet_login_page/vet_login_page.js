import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../../server/images/petvet_logo.png";
import axios from "axios";
import { connect } from "react-redux";
import { vet_login , readSessions,updateSessions} from "../../actions/";
import vetBtn from "../../../dist/assets/images/vet_btn.png";


class VetLoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: "paul21@gmail.com",
        password: "paul21"
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
    this.props.vet_login(this.state.form.username, this.state.form.password).then(() => {
        if (this.props.loginSuccess) {
            const auth= true;
            const logout= false;
            const vetAccess= true;
          this.props.updateSessions(this.props.id, auth, logout, vetAccess ).then(()=>{
              this.props.readSessions().then(()=>{
                  this.props.history.push("/client-list/" + this.props.id);
                  // console.log('these are now the props after logging into vet portal ', this.props);
              })
          });
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
          <h1>VET LOG IN</h1>
          <img style={btnSize} src={vetBtn} />
        </div>
        <div className="row formContainer align-items-center">
          <form className="col-10 offset-1" onSubmit={e => this.handleSubmit(e)}>
            <div className="form-group">
              <label>Email: </label>
              <input className="form-control " type="text" placeholder="Email"
                     onChange={e => this.handleInputChange(e)} name="username" value={username}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input className="form-control" type="password" placeholder="Password"
                     onChange={e => this.handleInputChange(e)} name="password" value={password}
              />
              <p className="text-danger">{!this.state.loginSuccess? 'Incorrect username or password': ''}</p>
            </div>
            <div className="loginBtnContainer">
              <div>
                <Link className="d-inline" to="/vet-page/">
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
    id: state.vetlogin.id,
    loginSuccess: state.vetlogin.loginSuccess,
    accessLevel: state.vetlogin.accessLevel
  };
}

export default connect(mapStateToProps, { vet_login, readSessions, updateSessions })(
  VetLoginPage
);
