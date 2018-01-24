import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';


class ParentPage extends Component{
    constructor(props){
      super(props);

      this.state ={
        toggleModal: false
      }
    }

    renderInput({label, input, type, meta: {touched, error, active, visited}}){

        return(
            <div className='form-group row'>
              <div>
                <label className='col-form-label'>{label}</label>
                <p className="text-danger errorMessage">{ input.name==='confirmpassword' ? touched && visited && error : touched && !active && error }</p>
              </div>
              <input className = 'form-control'type={type} {...input} />

            </div>
        )
    }

    renderTextArea({input, label, meta: {touched, error, active}}){

      return(
        <div className="form-group">
          <label>{label}</label>
          <textarea {...input} cols="30" rows="6" className="form-control"></textarea>
          <p className="text-danger">{ touched && !active && error }</p>
        </div>
      )
    }


    handleSubmits(values){


      this.setState({
        toggleModal: true
      })

      console.log(values);

      //   this.props.register(values.fullName, values.password, values.email)
      // .then( ()=> {
      //     var time = setInterval(()=>{
      //     this.props.login(values.email, values.password)
      //     if(this.props.id){

      //       clearInterval(time);
      //       // this.props.history.push('/login-page')
      //     }
      //   }, 4000)})
    }

    render(){


        return(
        <div className='bodyContainer'>
          <div className='contactUsPage'>
            <div className='text-center contactUsTitle'>
              <h1>Contact</h1>
              <h3>We'd love to help!</h3>
            </div>
          <form id='form-container' className='col-xs-10 col-xs-offset-1' onSubmit={this.props.handleSubmit(this.handleSubmits.bind(this))}>
            <Field name='name' label='Your Name' type='text' component={this.renderInput}/>
            <Field name='email' label='Your Email' type='email' component={this.renderInput}/>
            <Field name='message' label='Message' component={this.renderTextArea}/>


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

    if(!values.name){
        error.name = 'Please enter your name';
    }
    if(!values.email){
        error.email = 'Please enter your email';
    }
    if(!values.message){
        error.password = 'Please say something!!!';
    }


    return error;
}


ParentPage = reduxForm({
  form: 'parent-page',
  validate: validate
})(ParentPage)



export default connect(null, {})(ParentPage);





