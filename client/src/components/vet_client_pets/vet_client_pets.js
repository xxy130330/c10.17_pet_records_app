import React, { Component } from "react";
import Logo from "../../../../server/images/petvet_logo.png";
import { Link } from "react-router-dom";
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchVetClientPets,readSessions} from "../../actions/";
import '../assets/css/modal.css';


class VetClientPets extends Component {
    constructor(props) {
        super(props);

    }
    componentWillMount() {
        console.log('these are the props in vet client list ', this.props);
        this.props.readSessions().then(()=>{
            console.log('this is the current auth', this.props);
            if(!this.props.auth || !this.props.vetAccess){
                this.props.history.push('/');
            }
        });
        const params= this.props.match.params;
        this.props.fetchVetClientPets(params.ownerId, params.vetId);
        // localStorage.id = params.ownerId;

    }
    render() {
        const clientPetList = this.props.clientPetList.map((pet, index) => {
            const petAvatar = {
                backgroundImage: `url(${pet.avatar})`
            };
            const pet_name = pet.name.length>8 ? <h4 className='petListName'>{pet.name}</h4> : <h2 className='petListName'>{pet.name}</h2>
            return (
                <Link key={index} to={"/pet-profile/" + this.props.clientPetList[index]['petID']+ "/"+this.props.match.params.ownerId}>
                <div key={index} className='row justify-content-center petRow'>
                    <div>
                        <div className="petAvatar" style={petAvatar} />
                    </div>
                    <div className="nameContainer">
                        {pet_name}
                    </div>
                </div>
                </Link>
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
        vetAccessLevel: state.vetlogin.accessLevel,
        sessionId: state.sessions.id,
        auth: state.sessions.auth,
        vetAccess: state.sessions.vetAccess
    };
}

export default connect(mapStateToProps, {fetchVetClientPets: fetchVetClientPets, readSessions})(VetClientPets);
