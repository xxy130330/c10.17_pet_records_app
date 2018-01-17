import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../../../server/images/petvet_logo.png';

export default props=>{

    return(
        <div className='bodyContainer'>
            <div className='logoContainer'>
                <div className='logo'></div>
            </div>
            <div className='container'>
                <div className="home-msg">Welcome to PetVet! The easiest way to care for your pet's health and happiness!</div>
                <div className='loginBtnContainer'>
                    <Link to ='/login-page'><div className='homeBtn'><img src="../../../../server/images/pet_btn.png"/>Pet Login</div></Link>
                    <Link to ='/vet-login-page'><div className='homeBtn'><img src="../../../../server/images/vet_btn.png"/>Vet Login</div></Link>
                </div>
            </div>
        </div>
    )
}



//onClick='openLoginPage()
