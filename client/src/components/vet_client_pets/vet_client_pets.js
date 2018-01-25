import React, { Component } from "react";
import Logo from "../../../../server/images/petvet_logo.png";
import { Link } from "react-router-dom";
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchVetClientPets} from "../../actions/";
import '../assets/css/modal.css';


class VetClientPets extends Component {
    constructor(props) {
        super(props);

    }
    componentWillMount() {
        const params= this.props.match.params;
        this.props.fetchVetClientPets(params.ownerId, params.vetId);
        localStorage.id = params.ownerId;



    }
    render() {
        const clientPetList = this.props.clientPetList.map((pet, index) => {
            const petAvatar = {
                backgroundImage: `url(${pet.avatar})`
            };
            const pet_name = pet.name.length>8 ? <h4 className='petListName'>{pet.name}</h4> : <h2 className='petListName'>{pet.name}</h2>
            return (
                <div key={index} className='row justify-content-center petRow'>
                    <Link to={"/pet-profile/" + this.props.clientPetList[index]['petID']}>
                        <div className="petAvatar" style={petAvatar} />
                    </Link>
                    <Link to={"/pet-profile/" + this.props.clientPetList[index]['petID']} className="nameContainer">
                        {pet_name}
                    </Link>
                </div>
            );
        });
        return (
            <div className='bodyContainer'>
                <div className="petListContainer">
                    <h1 className="petListTitle">Patient# {this.props.match.params.ownerId} Pets</h1>
                    <div className="container">
                        {clientPetList}
                        </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        clientPetList: state.vetClientPetsData,
        vetAccessLevel: state.vetlogin.accessLevel
    };
}

export default connect(mapStateToProps, {fetchVetClientPets: fetchVetClientPets})(VetClientPets);
