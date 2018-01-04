import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./landing_page/landing_page";
import LoginPage from './login_page/login_page';
import PetList from "./pet_list/pet_list";
import PetProfile from "./pet_profile/pet_profile";
import ParentPage from "./parent_page/parent_page";
import AddPet from './add_pet/add_pet';

import RecordItem from "./record_item/record_item";
import PetData from "./pet_data";
import Footer from '../components/footer_menu/footer_menu';
import VetPage from '../components/vet_page_registration/vet_page_reg';

const App = () => (
    <Router>
        <div>
            <Route exact path = '/' component={LandingPage}/>
            <Route path = '/login-page/' component={LoginPage}/>
            <Route path = '/pet-list/' component={(props)=> {return(<PetList data={PetData}{...props}/>)}}/>
            <Route exact path = '/pet-profile/:id' component={(props)=> {return(<PetProfile data={PetData}{...props}/>)}}/>
            <Route exact path = '/pet-profile/:petId/record-item/:recordId'  component={(props)=>{return <RecordItem data={PetData}{...props} />}}/>
            <Route path = '/parent-page/' component={ParentPage}/>
            <Route path='/vet-page/' component={VetPage}/>
            <Route path='/add-pet/' component={AddPet}/>

            <Footer/>
        </div>
    </Router>
)

export default App;
