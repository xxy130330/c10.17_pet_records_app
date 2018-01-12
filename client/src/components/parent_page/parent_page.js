import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './parent_page.css';
import Logo from '../../../../server/images/petvet_logo.png';

export default class ParentPage extends Component{
	constructor(props){
		super(props);

		this.state={
			form:{
				username: '',
				password: '',
				confirmpassword: '',
				email: ''
			}
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(e){
		const {name, value} = e.target;
		const {form} = this.state;
		form[name] = value;
		this.setState({form: {...form}});
	}

	handleSubmit(e){
		e.preventDefault();
		console.log(this.state.form);
		this.setState({
			form:{
				username: '',
				password: '',
				confirmpassword: '',
				email: ''
			}
		})
	}

	render(){

		const {username, password, confirmpassword, email} = this.state.form;

		return(
			<div>
                <div className="logoContainer">
                	<div className="logo"></div> 
                </div>             
                <hr/>
			
				<form id='form-container' className='col-xs-10 col-xs-offset-1' onSubmit={(e)=>this.handleSubmit(e)}>
	        		<div className='form-group row'>
	        			<label className='col-form-label'>Username</label>
						<input className = 'form-control'type="text" placeholder="Username" onChange={e=>this.handleInputChange(e)}  name='username' value={username}/>
	   			 	</div>
	        		<div className='form-group row'>
	          			<label className='col-form-label'>Password</label>
	       				<input className = 'form-control' type="password" placeholder="Password" onChange={e=>this.handleInputChange(e)}  name='password' value={password}/>
	       			</div>
	        		<div className='form-group row'>
	          			<label className='col-form-label'>Confirm Password</label>
	           			<input className = 'form-control' type="password" placeholder="Confirm Password" onChange={e=>this.handleInputChange(e)}  name='confirmpassword' value={confirmpassword}/>
	       		 	</div>
	       			<div className='form-group row'>
	       			    <label className='col-form-label'>Email</label>
	        		    <input className = 'form-control' type="text" placeholder="Email" onChange={e=>this.handleInputChange(e)}  name='email' value={email}/>
	      		 	</div>
	       			<div className="buttonContainer row">
	       		     	{/*<Link to='/add-pet/'>*/}
							<button className='btn btn-success'>Sign Up</button>
						{/*</Link>*/}
	       		 	</div>
	    		</form>
    		</div>

		)
	}
}