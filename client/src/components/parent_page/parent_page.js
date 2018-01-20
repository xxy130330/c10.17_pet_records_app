import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../../../server/images/petvet_logo.png';
import { connect } from "react-redux";
import { register, login } from "../../actions/";
import { Field, reduxForm } from 'redux-form';

class ParentPage extends Component{
	constructor(props){
		super(props);

		this.state={
			errorMessage: ''
		}
	}

	renderInput({label, input, type, meta: {touched, error, active, visited}}){

		return(
			<div className='form-group row'>
  			<label className='col-form-label'>{label}</label>
				<input className = 'form-control'type={type} {...input} />
                <p className="text-danger">{ input.name==='confirmpassword' ? touched && visited && error : touched && !active && error }</p>
	 		</div>
		)
	}


	handleSubmits(values){
		console.log('values', values);


		this.props.register(values.username, values.password, values.email)
            .then(()=> this.props.login(values.username, values.password))
                .then( ()=> console.log(this.props.login));
 //            .then( ()=>{ this.props.history.push('/login-page')})
	// }
    }

	render(){


		return(
			<div className='bodyContainer'>
        <div className='parentPage'>
          <div className='text-center parentPageTitle'>
            <h1>Pet Owner Register</h1>
          </div>
          <form id='form-container' className='col-xs-10 col-xs-offset-1' onSubmit={this.props.handleSubmit(this.handleSubmits.bind(this))}>
            <Field name='username' label='Username' type='text' component={this.renderInput}/>
            <Field name='password' label='Password' type='password' component={this.renderInput}/>
            <Field name='confirmpassword' label='Confirm Password' type='password' component={this.renderInput}/>

            <Field name='email' label='Email' type='email' component={this.renderInput}/>


            <div className="buttonContainer row">

              <button className='btn btn-success'>Sign Up</button>

            </div>

          </form>
        </div>
  		</div>

		)
	}
}

function validate(values){
  const error = {};

    if(!values.username){
        error.username = 'Please enter your username';
    }
    if(!values.password){
        error.password = 'Please enter a password';
    }
    if(!(values.password === values.confirmpassword)){
        error.confirmpassword = 'Passwords do not match';
    }
    if(!values.email){
        error.email = 'Please enter your email'
    }

    return error;
}


ParentPage = reduxForm({
  form: 'parent-page',
  validate: validate
})(ParentPage)

function mapStateToProps(state){
    return{
        id: state.login.id
    }
}


export default connect(mapStateToProps, {
  register: register,
  login: login
})(ParentPage);





