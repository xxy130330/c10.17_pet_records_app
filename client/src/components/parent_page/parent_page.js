import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../../server/images/petvet_logo.png";
import { connect } from "react-redux";
import { register, login } from "../../actions/";
import { Field, reduxForm } from "redux-form";
import RegisterModal from "../register_modal/register_modal";

class ParentPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleModal: false
    };
  }

  renderInput({ label, input, type, meta: { touched, error, active, visited }}) {
    return (
      <div className="form-group row">
        <label className="col-form-label">{label}</label>
        <input className="form-control" type={type} {...input} />
        <p className="text-danger">
          {input.name === "confirmpassword"
            ? touched && visited && error
            : touched && !active && error}
        </p>
      </div>
    );
  }

  handleSubmits(values) {
    this.setState({
      toggleModal: true
    });

    this.props
      .register(values.fullName, values.password, values.email)
      .then(() => {
        var time = setInterval(() => {
          this.props.login(values.email, values.password);
          if (this.props.id) {
            clearInterval(time);
          }
        }, 4000);
      });
  }

  render() {
    return (
      <div className="bodyContainer">
        <div className="parentPage">
          <div className="text-center parentPageTitle">
            <h1>Pet Owner Register</h1>
          </div>
          <form id="form-container" className="col-xs-10 col-xs-offset-1" onSubmit={this.props.handleSubmit(this.handleSubmits.bind(this))}>
            <Field name="fullName" label="Full Name" type="text" component={this.renderInput}/>
            <Field name="email" label="Email" type="email" component={this.renderInput}/>
            <Field name="password" label="Password" type="password" component={this.renderInput}/>
            <Field name="confirmpassword" label="Confirm Password" type="password" component={this.renderInput}/>
            <div className="buttonContainer row">
              <button className="btn btn-success">Sign Up</button>
            </div>
            {this.state.toggleModal ? ( <RegisterModal routeUrl="/login-page" {...this.props} confirm={this.props.id} /> ) : ( "" )}
          </form>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const error = {};

  if (!values.fullName) {
    error.fullName = "Please enter your full name";
  }
  if (!values.password) {
    error.password = "Please enter a password";
  }
  if (!(values.password === values.confirmpassword)) {
    error.confirmpassword = "Passwords do not match";
  }
  if (!values.email) {
    error.email = "Please enter your email";
  }

  return error;
}

ParentPage = reduxForm({
  form: "parent-page",
  validate: validate
})(ParentPage);

function mapStateToProps(state) {
  return {
    id: state.login.id
  };
}

export default connect(mapStateToProps, {
  register: register,
  login: login
})(ParentPage);
