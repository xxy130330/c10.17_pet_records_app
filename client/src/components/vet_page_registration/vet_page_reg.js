import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { vet_register, vet_login } from "../../actions/";
import { Field, reduxForm } from "redux-form";
import RegisterModal from "../register_modal/register_modal";

class VetPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toggleModal: false
		};
	}
	renderInput({
		label,
		input,
		type,
		meta: { touched, error, active, visited }
	}) {
		return (
			<div className="form-group row">
				<label className="col-form-label">{label}</label>
				<input className="form-control" type={type} {...input} />
				<p className="text-danger">
					{!input.name
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
			.vet_register(
				values.fullName,
				values.phone,
				values.password,
				values.email
			)
			.then(() => {
				var time = setInterval(() => {
					this.props.vet_login(values.email, values.password);
					if (this.props.id) {
						clearInterval(time);
					}
				}, 4000);
			});
	}

	render() {
		return (
			<div className="bodyContainer">
				<h1 className="vetTitle">Vet Registration</h1>
				<form
					id="form-container"
					className="col-xs-10 col-xs-offset-1"
					onSubmit={this.props.handleSubmit(this.handleSubmits.bind(this))}
				>
					<Field
						name="fullName"
						label="Full Name"
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
						name="email"
						label="Email"
						type="text"
						component={this.renderInput}
					/>
					<Field
						name="password"
						label="Password"
						type="password"
						component={this.renderInput}
					/>
					<progress
						className="form-group row"
						max="100"
						value="0"
						id="pwStrength"
					/>
					<Field
						name="confirmpassword"
						label="Confirm Password"
						type="password"
						component={this.renderInput}
					/>
					<div className="buttonContainer row">
						<button className="signUpBtn btn btn-success">Sign Up</button>
					</div>
					{this.state.toggleModal ? (
						<RegisterModal
							routeUrl="/vet-login-page"
							{...this.props}
							confirm={this.props.id}
						/>
					) : (
						""
					)}
				</form>
			</div>
		);
	}
}

function validate(values) {
	var strengthBar = document.getElementById("pwStrength");
	var strength = 0;
	const error = {};
	if (!values.fullName) {
		error.fullName = "Please enter your full name";
	}
	if (!values.phone) {
		error.phone = "Please enter your phone number";
	}
	if (!values.password) {
		error.password = "Please enter a password";
	}
	if (!(values.password === values.confirmpassword)) {
		error.confirmpassword = "Passwords do not match";
	}
	if (!values.confirmpassword) {
		error.confirmpassword = "Please confirm your password";
	}
	if (!values.email) {
		error.email = "Please enter your email";
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
	// password strength regex
	if(values.fullName !== undefined){
		if(!values.fullName.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)){
<<<<<<< HEAD
			error.fullName = "Full name should only contain letters"
=======
			error.fullName = "Please enter a valid name"
>>>>>>> 12f75dc9167b1470edc51a1689fee0522356b1db
		}
	}
	if (values.password !== undefined) {
		if (values.password.length === 0) {
			strength = 0;
		}
		if (values.password.match(/[a-zA-Z][a-zA-Z0-9]+/)) {
			strength += 1;
		}
		if (values.password.match(/[!@#$%^&*()]+/)) {
			strength += 1;
		}
		if (values.password.length >= 5) {
			strength += 1;
		}
		if (values.password.length >= 8) {
			strength += 1;
		}
		switch (strength) {
			case 0:
				strengthBar.value = 0;
				break;
			case 1:
				strengthBar.value = 25;
				break;
			case 2:
				strengthBar.value = 50;
				break;
			case 3:
				strengthBar.value = 75;
				break;
			case 4:
				strengthBar.value = 100;
				break;
		}
	    if(strengthBar.value!==75){
	      error.password = "Password must be at least 5 characters and 1 symbol"
	    }
	}

	return error;
}

VetPage = reduxForm({
	form: "vet-page",
	validate: validate
})(VetPage);

function mapStateToProps(state) {
	return {
		id: state.vetlogin.id
	};
}
export default connect(mapStateToProps, { vet_register, vet_login })(VetPage);
