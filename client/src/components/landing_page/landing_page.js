import React from 'react';
import './landing_page.css';
import {Link} from 'react-router-dom';
import Logo from '../../assets/images/petvet_logo.png';

export default props=>{

    return(
        <div>
        <header>
        <div className="title">
          <img src={Logo} />
        </div>
      </header>
            <div className='logoContainer'>
                <div className='logo'></div>
            </div>
            <div className='container'>
                <div className="home-msg">Welcome to PetVet! The easiest way to care for your pet's health and happiness!</div>
                <div className='buttonContainer'>
                    <Link to ='/pet-list'><button className='btn btn-primary btn-block'>Pet Login</button></Link>
                    <button className='btn btn-success btn-block'>Vet Login</button>
                </div>
            </div>
        </div>
    )
}



//onClick='openLoginPage()'