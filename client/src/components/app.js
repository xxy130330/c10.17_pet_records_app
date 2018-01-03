import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LandingPage from './landing_page/landing_page';
// import LoginPage from './login_page/login_page';
import PetList from "./pet_list/pet_list";
import PetProfile from "./pet_profile/pet_profile";

import RecordItem from "./record_item/record_item";
import PetData from './pet_data';



const App = () => (
    <Router>
        <div>
            <Route exact path = '/' component={LandingPage}/>
            {/*<LoginPage/>*/}
            <Route  path = '/pet-list/' component={(props)=> {
                return(
                    <PetList data={PetData}{...props}/>
                )
            }}/>
            <Route path = '/pet-profile/' component={(props)=> {
                return(
                    <PetProfile data={PetData}{...props}/>
                )
            }}/>
            <Route path = '/record-item' component={RecordItem}/>
            {/*<PetList/>*/}
            {/*<PetProfile/>*/}
            {/*<RecordItem/>*/}

        </div>
    </Router>

);

export default App;
