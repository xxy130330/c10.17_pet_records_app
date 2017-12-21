import React from 'react';
import './login_page.css';

export default props =>{
    return(
        <div>
            <header>
                <h1 className='title'>Pet to Vet</h1>
            </header>
            <div className='logoContainer'>
                <div className='logo'></div>
            </div>
            <div className='container'>
                <div className='form-group'>
                    <label>User Name</label>
                    <input className='userName form-control input-lg' type='text' placeholder="Username" />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input className='password form-control input-lg' type='password' placeholder="Password" />
                </div>
                <div className='buttonContainer'>
                    <button className='btn btn-primary' >Login</button>
                    <button className='btn btn-success'>Sign Up</button>
                </div>
                <br/>
                    <div id="register">New User?
                        <a href="http://##">Register.</a>
                    </div>

            </div>
        </div>
    )
}

// onclick="verifyLogin()"