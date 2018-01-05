import React from "react";
import axios from 'axios';

import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./landing_page/landing_page";
// import LoginPage from './login_page/login_page';
import PetList from "./pet_list/pet_list";
import PetProfile from "./pet_profile/pet_profile";

import RecordItem from "./record_item/record_item";
// import PetData from "../../../server/pet_data";
var PetData = null;
axios({
    method: 'get',
    url: 'http://localhost/endpoint.php',
}).then(function(response) {
    let fetchedData = (response);
    PetData = JSON.parse(fetchedData.data.data);
    console.log(PetData);

});



import Footer from '../components/footer_menu/footer_menu';

const App = () => (
    <Router>
        <div>
            <Route exact path = '/' component={LandingPage}/>
            <Route  path = '/pet-list/' component={(props)=> {return(<PetList data={PetData}{...props}/>)}}/>
            <Route exact path = '/pet-profile/:id' component={(props)=> {return(<PetProfile data={PetData}{...props}/>)}}/>
            <Route exact path = '/pet-profile/:petId/record-item/:recordId'  component={(props)=>{return <RecordItem data={PetData}{...props} />}}/>
            <Footer/>
        </div>
    </Router>
)

export default App;
