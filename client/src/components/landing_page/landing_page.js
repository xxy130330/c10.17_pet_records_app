import React from 'react';
import './landing_page.css';
import {Link} from 'react-router-dom';
// import Logo from '../../assets/images/logo.svg';

export default props=>{

    return(
        <div>
            <header>
                <h1 className='title'>Pet to Vet</h1>
            </header>
            <div className='logoContainer'>
                <div className='logo'></div>
            </div>
            <div className='container'>
                <div className="home-msg">Welcome to PetVet! The easiest way to care for your pet's health and happiness!</div>
                <div className='buttonContainer'>
                    <Link to ='/pet-profile'><button className='btn btn-primary btn-block'>Pet Login</button></Link>
                    <button className='btn btn-success btn-block'>Vet Login</button>
                </div>

            </div>

        </div>
    )
}



//onClick='openLoginPage()'