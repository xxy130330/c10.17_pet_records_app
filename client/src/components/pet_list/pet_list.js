import React, { Component } from "react";
import "./new_pet_list_styles.css";
import axios from 'axios';

import Logo from '../../../../server/images/petvet_logo.png';

import {Link} from 'react-router-dom';


class PetList extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        //pulls up a high level overview of medical records for a specific pet, Your getting the title and ID of the record items
        const url = 'http://localhost:80/database_connect/server.php?action=get&resource=record-item&petID=5';

        axios.get(url).then((res) => {
            console.log(res.data);
            this.setState({
                PetData: (res.data.data),
            });
        });
    }


    render() {
        console.log(this.state);
        const userPetList = this.props.data.map((item, index) => {
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

export default PetList;
