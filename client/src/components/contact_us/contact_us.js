import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import loading from '../../../dist/assets/images/loading.gif';
import axios from "axios";

class ParentPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      thankyouModal: false,
      load: false
    };
  }

  renderInput({ label, input, type, meta: { touched, error, active, visited }
  }) {
    return (
      <div className="form-group row">
          <label className="col-form-label">{label}</label>
          <input className="form-control" type={type} {...input} />
          <p className="text-danger">{input.name === "confirmpassword" ? touched && visited && error : touched && !active && error}</p>
      </div>
    );
  }

  renderTextArea({ input, label, meta: { touched, error, active } }) {
    return (
      <div className="form-group">
          <label>{label}</label>
          <textarea {...input} cols="30" rows="6" className="form-control" />
          <p className="text-danger">{touched && !active && error}</p>
      </div>
    );
  }

  handleSubmits(values) {
    this.setState({
      load: true
    })
    const url =
      "/server/database_connect/server.php?action=post&resource=contact_us";
    axios({
      method: "post",
      dataType: "json",
      url: url,
      data: {
        name: values.name,
        email: values.email,
        message: values.message,
        contact: true
      }
    }).then((data)=>{
      this.props.reset();
      this.setState({
        thankyouModal: true,
        load: false
      });
    })
  }

  thankyouModal() {
    return (
      <span>
        <div className="confirm-modal ">
          <div className="content-modal">
            <div className="card petListCard">
              <div className="card-header">Thank You!</div>
              <div className="card-block">
                <p className="card-text">
                  Thank you for contacting us. We will respond back to you soon.
                </p>
              </div>
              <div className="card-footer">
                <button
                  onClick={()=> this.setState({thankyouModal: false})}
                  className="btn btn-outline-success"
                >
                  Done!
                </button>
              </div>
            </div>
          </div>
        </div>
      </span>
    );
  }

  render() {
    return (
      <div className="bodyContainer">
        <div className="contactUsPage">
          <div className="text-center contactUsTitle">
            <h1>Contact</h1>
            <h3>We'd love to help!</h3>
          </div>
          <form
            id="form-container"
            className="col-xs-10 col-xs-offset-1"
            onSubmit={this.props.handleSubmit(this.handleSubmits.bind(this))}
          >
            <Field
              name="name"
              label="Your Name"
              type="text"
              component={this.renderInput}
            />
            <Field
              name="email"
              label="Your Email"
              type="text"
              component={this.renderInput}
            />
            <Field
              name="message"
              label="Message"
              component={this.renderTextArea}
            />
            <div className="buttonContainer row">
            {!this.state.load ? <button className="btn btn-success">
                Send 
                </button> : <img src={loading}/>}
            </div>
          </form>
          {this.state.thankyouModal ? this.thankyouModal() : ""}
        </div>
      </div>
    );
  }
}

function validate(values) {
  const error = {};

  if (!values.name) {
    error.name = "Please enter your name";
  }
  if (!values.email) {
    error.email = "Please enter your email";
  }
  if (!values.message) {
    error.message = "Please enter a message";
  }
  if(values.name !== undefined){
		if(!values.name.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)){
			error.name = "Please enter a valid name"
		}
  }
  if (values.email !== undefined) {
		if (
			!values.email.match(
				/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
		) {
			error.email = "Please enter a valid email address";
		}
	}
  return error;
}

ParentPage = reduxForm({
  form: "parent-page",
  validate: validate
})(ParentPage);

export default connect(null, {})(ParentPage);
