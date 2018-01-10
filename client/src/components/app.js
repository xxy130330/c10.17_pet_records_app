import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./landing_page/landing_page";
import LoginPage from "./login_page/login_page";
import PetList from "./pet_list/pet_list";
import PetProfile from "./pet_profile/pet_profile";
import ParentPage from "./parent_page/parent_page";
import AddPet from "./add_pet/add_pet";
import RecordItem from "./record_item/record_item";
import Header from "../components/header_component/header";
import Footer from "../components/footer_menu/footer_menu";
import VetPage from "../components/vet_page_registration/vet_page_reg";
import AddMedNote from "../components/manually_add_med_note_page/manually_add_med_note";

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
          <Route path="/pet-list/" component={PetList} />
          <Route exact path="/pet-profile/:id" component={PetProfile} />

          <Route
            exact
            path="/pet-profile/:petId/record-item/:recordId"
            component={RecordItem}
          />

          <Route path="/parent-page/" component={ParentPage} />
          <Route path="/add-pet/" component={AddPet} />
          <Route path="/vet-page" component={VetPage} />
          <Route path="/add-med-note" component={AddMedNote} />
          <Route path="/*" render={Footer} />
        </div>
      </Router>
    );
  }
}

export default App;
