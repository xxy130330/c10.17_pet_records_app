import React, {Component} from 'react';
import Logo from '../../../../server/images/petvet_logo.png';
import axios from 'axios';

class VetPage extends Component {
    constructor(props){
        super(props);

        this.state= {
           form: {
               userName: '',
               password: '',
               confirmPassword: '',
               email: '',
               phone: ''
           }
        };
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleInputChange(e){
        const {name, value}= e.target;
        const {form}= this.state;
        form[name]= value;
        this.setState({form: {...form}});
    }
    handleSubmit(e){
        e.preventDefault();
        console.log('hello ', this.state);

        axios({
            method: 'post',
            url: '/server/database_connect/server.php?action=post&resource=registerVet',
            dataType: 'json',
            data: {
                username: this.state.form.userName,
                password: this.state.form.password,
                email: this.state.form.email,
                phone: this.state.form.email,
            },
        }).then(function(res) {
            console.log(res);
        });

        // this.setState({
        //     form: {
        //         userName: '',
        //         password: '',
        //         confirmPassword: '',
        //         email: '',
        //         phone: ''
        //     }
        // })
    }
    render(){
        const {userName, password, confirmPassword, email, phone} = this.state.form;
        return(
            <div>
                <form className='container' onSubmit={(e)=>this.handleSubmit(e)} >
                    <div className='form-group'>
                        <label>User Name</label>
                        <input onChange={(e)=> this.handleInputChange(e)} className='form-control input-lg' type='text' name='userName' value={userName} />
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input  onChange={(e)=>this.handleInputChange(e)} className='form-control input-lg' type='password' name="password" value={password} />
                    </div>
                    <div className='form-group'>
                        <label>Confirm Password</label>
                        <input onChange={(e)=>this.handleInputChange(e)} className='form-control input-lg' type='password' name="confirmPassword" value={confirmPassword}/>
                    </div>
                    <div className='form-group'>
                        <label>Email</label>
                        <input onChange={(e)=>this.handleInputChange(e)} className='form-control input-lg' type='text' name='email' value={email}/>
                    </div>
                    <div className='form-group'>
                        <label>Phone Number</label>
                        <input onChange={(e)=>this.handleInputChange(e)} className='form-control input-lg' type='text' name='phone' value={phone}/>
                    </div>
                    <div className='buttonContainer'>
                        {/*<button className='btn btn-primary'>Login</button>*/}
                        <button className='btn btn-success'>Sign Up</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default VetPage;