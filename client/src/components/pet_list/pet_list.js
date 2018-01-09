import React, { Component } from "react";
import "./new_pet_list_styles.css";
import axios from 'axios';

import Logo from '../../../../server/images/petvet_logo.png';
import {Link} from 'react-router-dom';


import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import { fetchPetData } from '../../actions/';


class PetList extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        this.props.fetchPetData();
        const petObj = this.props.fetchPetData();
        console.log('willMount', petObj);
    }

    render() {
        console.log('props in pet list', this.props);
        const userPetList = this.props.petdata.map((item, index) => {
            const petAvatar = {
                backgroundImage: `url(${item.avatar})`
            };
            console.log(item);
            return (
                <div key={index}>
                    <Link to={"/pet-profile/" + index}>
                        <div className="petAvatar" style={petAvatar} id={index} />
                        <h3 className="petName">{item.name}</h3>
                    </Link>
                </div>
            );
        });
        return (
            <div>
                <div className="petListContainer">
                    <h1 className="petListTitle">Pet List</h1>
                    <div className="usersPetContainer">{userPetList}</div>
                </div>
            </div>
        );
    }

}


function mapStateToProps(state){
    console.log(state)
    return{
        petdata: state.petdata
    }
}

// function mapDispatchToProps(dispatch){
//   return bindActionCreators( { fetchPetData }, dispatch);
// }

export default connect(mapStateToProps, {fetchPetData: fetchPetData})(PetList)
