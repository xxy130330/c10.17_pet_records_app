import React, { Component } from "react";
import Logo from "../../../../server/images/petvet_logo.png";
import { Link } from "react-router-dom";
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchVetClientPets} from "../../actions/";

class VetClientPets extends Component {
    constructor(props) {
        super(props);

    }
    componentWillMount() {
        const params= this.props.match.params;
        this.props.fetchVetClientPets(params.ownerId, params.vetId);
        console.log('these are the props in client pet list, ', this.props);

    }
    render() {
        const clientPetList = this.props.clientPetList.map((pet, index) => {
            const petAvatar = {
                backgroundImage: `url(${pet.avatar})`
            };
            return (
                <div key={index}>
                    <Link to={"/pet-profile/" + this.props.clientPetList[index]['petID']}>
                        <div className="petAvatar" style={petAvatar} />
                        <h3 className="petName">{pet.name}</h3>
                    </Link>

                    <div className="pull-right">
                        <div className={this.props.vetAccessLevel? "": "glyphicon glyphicon-minus removeRecordIcon"} />
                    </div>
                </div>
            );
        });
        return (
            <div className='bodyContainer'>
                <div className="petListContainer">
                    <h1 className="petListTitle">Patient# {this.props.match.params.ownerId} Pets</h1>
                    <div className="iconNav"></div>
                    <div className="usersPetContainer">{clientPetList}</div>
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