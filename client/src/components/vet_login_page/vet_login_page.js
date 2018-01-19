import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../../server/images/petvet_logo.png";
import axios from "axios";
import { connect } from "react-redux";
import { vet_login, switchAuthentication} from "../../actions/";

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
          console.log('the props after doing vet login axios call', this.props);
          this.props.history.push("/client-list/"+this.props.id);
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
          <h1>VET LOG IN</h1>
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
              className="userName form-control input-lg"
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
              className="password form-control input-lg"
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
            New Vet?
            <Link to="/vet-page/">Register</Link>
          </div>
        </form>
      </div>
    );
  }
}

// onclick="verifyLogin()"

function mapStateToProps(state) {
  return {
    id: state.vetlogin.id,
    success: state.vetlogin.success,
    errorMessage: state.vetlogin.errorMessage,
    accessLevel: state.vetlogin.accessLevel
  };
}

export default connect(mapStateToProps, { vet_login, switchAuthentication })(VetLoginPage);
