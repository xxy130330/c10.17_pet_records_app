import React, { Component } from "react";
import axios from "axios";
import auth from "../hoc/auth";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "../css/style.css";
import "../css/media_queries.css";

import LandingPage from "./landing_page/landing_page";
import LoginPage from "./login_page/login_page";
import VetLoginPage from "./vet_login_page/vet_login_page";
import PetList from "./pet_list/pet_list";
import PetProfile from "./pet_profile/pet_profile";
import ParentPage from "./parent_page/parent_page";
import AddPet from "./add_pet/add_pet";
import RecordItem from "./record_item/record_item";
import Header from "../components/header_component/header";
// import Footer from "../components/footer_menu/footer_menu";
import VetPage from "../components/vet_page_registration/vet_page_reg";
import AddMedNote from "../components/manually_add_med_note_page/manually_add_med_note";
import PetToVet from "../components/pet_to_vet/pet_to_vet";
import ClientList from "../components/client_list/client_list";
import VetClientPets from "../components/vet_client_pets/vet_client_pets";
import AboutUs from "../components/about_us/about_us";
import ContactUs from '../components/contact_us/contact_us';

class App extends Component {

    constructor(props){
        super(props);
        this.state= {
            visible: true
        };
        this.handleConfirm=this.handleConfirm.bind(this);
    }
    handleConfirm(){
        this.setState({
            visible: false
        })
    }



  renderActivateModal(){
    const currentUrl = window.location.href;
      if(currentUrl === 'http://localhost:3000/?newuser' || currentUrl === 'https://petvet.tech/?newuser'){
      console.log('yes');
      return(
        <div className={`welcomeModalContainer ${!this.state.visible ? 'welcomeModalContainerHidden': ''}`}>
          <div className="card text-center">
            <div className='card-header'>
                PET VET
            </div>
            <div className="card-block">
                <h4 className='card-title'>You have successfully verified your account</h4>
                <p className="card-text">Please Log In</p>
            </div>
            <div className="card-action">
                <button className=' btn btn-primary text-center' onClick={this.handleConfirm}>Log In</button>
            </div>
            <div className="card-footer text-muted">Thank you</div>
          </div>
        </div>

      )
    }
  }

  render() {
    return (
      <Router>
        <div className="mainContainer">
          <Route path="/*" component={Header} />
          <Route path="/about-us" component={AboutUs} />
          <Route path="/contact-us/" component={(ContactUs)}/>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login-page/" component={LoginPage} />
          <Route path="/vet-login-page/" component={VetLoginPage} />
          <Route path="/pet-list/" component={auth(PetList)} />
          <Route exact path="/pet-profile/:id" component={PetProfile} />
          <Route
            exact
            path="/pet-profile/:petId/record-item/:recordId"
            component={RecordItem}
          />
          <Route path="/parent-page" component={ParentPage} />
          <Route path="/add-pet/" component={AddPet} />
          <Route path="/vet-page" component={VetPage} />
          <Route
            path="/pet-profile/:id/add-med-note"
            component={AddMedNote}
          />
          <Route path="/pet-to-vet/:petId/:vetName" component={PetToVet} />
          <Route path="/client-list/:vetId/" component={ClientList} />
          <Route
            path="/vet-client-pets/:vetId/:ownerId"
            component={VetClientPets}
          />
          {/* <Route path="/*" component={Footer} /> */}
          {this.renderActivateModal()}
        </div>
      </Router>
    );
  }
}

export default App;
