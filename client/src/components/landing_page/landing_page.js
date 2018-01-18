import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../dist/assets/images/petvet_logo.png";
import petBtn from "../../../dist/assets/images/pet_btn.png";
import vetBtn from "../../../dist/assets/images/vet_btn.png";

export default props => {
  return (
    <div className="landingContainer">
      <div className="contentContainer">
        <div className="landinglogoContainer">
          <img className="loginLogo" src={Logo} />
        </div>
        <div className="msgBtnContainer">
          <div className="home-msg">
            Welcome to PetVet!
            <br />The easiest way to care for your pet's health and happiness!
          </div>
          <div className="loginBtnContainer">
            <Link to="/login-page">
              <div className="homeBtn">
                <img src={petBtn} />Pet Login
              </div>
            </Link>
            <Link to="/vet-login-page">
              <div className="homeBtn">
                <img src={vetBtn} />Vet Login
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

//onClick='openLoginPage()
