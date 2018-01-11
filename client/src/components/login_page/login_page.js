import React, {Component} from 'react';
import './login_page.css';
import {Link} from 'react-router-dom';
import Logo from '../../../../server/images/petvet_logo.png';
import axios from 'axios';

export default class LoginPage extends Component{
    
    constructor(props){
        super(props);

        this.state={
            form:{
                username: '',
                password: ''
            }
        };
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

        const url = '/server/database_connect/server.php?action=post&resource=login';
        axios({
            method: 'post',
            dataType: 'json',
            url: url,
            data: {
                username: this.state.form.username,
                password: this.state.form.password,
            }
        }).then(function(res) {
            console.log(res);
        });
        this.setState({
            form:{
                username:'',
                password:''
            },
            PetData : this.state.PetData,
        })
    }

    render(){

        const {username, password} = this.state.form;

        return(
            <div>
                <div className='logoContainer'>
                    <div className='logo'></div>
                </div>
                <form id='form-container' className='col-xs-10 col-xs-offset-1' onSubmit={(e)=>this.handleSubmit(e)}>
                    <div className='form-group'>
                        <label>User Name</label>
                        <input className='userName form-control input-lg' type='text' placeholder="Username" onChange={e=>this.handleInputChange(e)}  name='username' value={username}/>
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input className='password form-control input-lg' type='password' placeholder="Password" onChange={e=>this.handleInputChange(e)}  name='password' value={password}/>
                    </div>
                    <div className='buttonContainer'>
                        {/*<Link to="/pet-list/">*/}
                            <button className='btn btn-primary'>Login</button>
                        {/*</Link>*/}
                    </div>
                    <br/>
                        <div id="register">New User?
                            <Link to='/parent-page/'>Register</Link>
                        </div>
                        <div id="register">New Vet?
                            <Link to='/vet-page/'>Register</Link>
                        </div>

                </form>
            </div>
        )
    }
}

// onclick="verifyLogin()"