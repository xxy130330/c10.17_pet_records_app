import React, { Component } from "react";
import axios from "axios";
import auth from "../hoc/auth";
import { BrowserRouter as Router, Route } from "react-router-dom";

import LandingPage from "./landing_page/landing_page";
import LoginPage from "./login_page/login_page";
import VetLoginPage from "./vet_login_page/vet_login_page";
import PetList from "./pet_list/pet_list";
import PetProfile from "./pet_profile/pet_profile";
import ParentPage from "./parent_page/parent_page";
import AddPet from "./add_pet/add_pet";
import RecordItem from "./record_item/record_item";
import Header from "../components/header_component/header";
import Footer from "../components/footer_menu/footer_menu";
import VetPage from "../components/vet_page_registration/vet_page_reg";
import AddMedNote from "../components/manually_add_med_note_page/manually_add_med_note";
import PetToVet from '../components/pet_to_vet/pet_to_vet';
import ClientList from '../components/client_list/client_list';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      PetData: []
    };
  }

  render() {
    const { PetData } = this.state;

    return (
      <Router>
        <div>
          <Route to="/*" component={Header} />
          <Route exact path="/" component={LandingPage} />
          <Route path="/login-page/" component={LoginPage} />
          <Route path="/vet-login-page/" component={VetLoginPage} />
          <Route path="/pet-list/" component={auth(PetList)} />
          <Route exact path="/pet-profile/:id" component={auth(PetProfile)} />
          <Route
            exact
            path="/pet-profile/:petId/record-item/:recordId"
            component={auth(RecordItem)}
          />

          <Route path="/parent-page" component={auth(ParentPage)} />
          <Route path="/add-pet/" component={auth(AddPet)} />
          <Route path="/vet-page" component={auth(VetPage)} />
          <Route
            path="/pet-profile/:id/add-med-note"
            component={auth(AddMedNote)}
          />
          <Route path="/pet-to-vet/:petId" component={auth(PetToVet)} />
          <Route path='/client-list/' component={auth(ClientList)}/>
          <Route path="/*" component={Footer} />


        </div>
      </Router>
    );
  }
}

export default App;
