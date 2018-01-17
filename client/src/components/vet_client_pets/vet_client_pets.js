import React, { Component } from "react";
import Logo from "../../../../server/images/petvet_logo.png";
import { Link } from "react-router-dom";
import axios from 'axios';

class VetClientPets extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log('the props for vet client pets: ', this.props);

    }
    fetchPetList(index) {
        console.log(this.props.match.params);

        const url = '/server/database_connect/server.php?action=get&resource=pets_for_vet&ownerID=' + this.props.clientList[index].ownerID + '&vetID=' + this.props.match.params.vetId;
        axios({
            method: 'get',
            dataType: 'json',
            url: url,
        }).then(res => {
            console.log(res);
        })
    }
    render() {

        // const userPetList = this.props.petdata.map((item, index) => {
        //     const petAvatar = {
        //         backgroundImage: `url(${item.avatar})`
        //     };
        //     return (
        //         <div key={index}>
        //             <Link to={"/pet-profile/" + this.props.petdata[index]["ID"]}>
        //                 <div className="petAvatar" style={petAvatar} />
        //                 <h3 className="petName">{item.name}</h3>
        //             </Link>
        //
        //             <div className="pull-right" onClick={()=>{this.softDeletePet(index)}}>
        //                 <div className="glyphicon glyphicon-minus removeRecordIcon" />
        //             </div>
        //
        //         </div>
        //     );
        // });
        return (
            <div className='bodyContainer'>
                <div className="petListContainer">
                    <h1 className="petListTitle">Patient# {this.props.match.params.ownerId} Pets</h1>
                    <div className="iconNav"></div>
                    <div className="usersPetContainer">CURRENTLY NO PETS AVAILABLE</div>
                </div>
            </div>
        );
    }
}
export default VetClientPets;