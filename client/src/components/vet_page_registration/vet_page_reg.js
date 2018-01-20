import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../../server/images/petvet_logo.png";
import { connect } from "react-redux";
import { vet_register } from "../../actions/";
import { Field, reduxForm } from "redux-form";

class VetPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: ""
    };
  }

  renderInput({ label, input, type, meta: { touched, error, active } }) {
    return (
      <div className="form-group row">
        <label className="col-form-label">{label}</label>
        <input className="form-control" type={type} {...input} />
      </div>
    );
  }

  handleSubmits(values) {
    console.log("values", values);

    if (values.password !== values.confirmpassword) {
      this.setState({
        errorMessage: "Please match the password"
      });
      return;
    } else if (values.password === values.confirmpassword) {
      this.setState({
        errorMessage: ""
      });
    }

    this.props
      .vet_register(values.username, values.phone, values.password, values.email)
      .then(() => {
        this.props.history.push("/vet-login-page");
      });
  }
  render() {
    return (
      <div className='bodyContainer'>
        {/*<div className="logoContainer">*/}
          {/*<div className="logo" />*/}
        {/*</div>*/}
        {/*<hr />*/}
        <h1 className="vetTitle">Vet Registration</h1>
        <form
          id="form-container"
          className="col-xs-10 col-xs-offset-1"
          onSubmit={this.props.handleSubmit(this.handleSubmits.bind(this))}
        >
          <Field
            name="username"
            label="Username"
            type="text"
            component={this.renderInput}
          />
          <Field
            name="phone"
            label="Phone"
            type="text"
            component={this.renderInput}
          />
          <Field
            name="password"
            label="Password"
            type="password"
            component={this.renderInput}
          />
          <Field
            name="confirmpassword"
            label="Confirm Password"
            type="password"
            component={this.renderInput}
          />

          <Field
            name="email"
            label="Email"
            type="email"
            component={this.renderInput}
          />

          <div className="buttonContainer row">
            <button className="btn btn-success">Sign Up</button>
          </div>

          <p className="text-danger">{this.state.errorMessage}</p>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  return errors;
}

VetPage = reduxForm({
  form: "vet-page",
  validate: validate
})(VetPage);

export default connect(null, {
  vet_register
})(VetPage);
