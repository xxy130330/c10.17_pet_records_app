import React, { Component } from "react";
import "./new_pet_list_styles.css";

import Logo from '../../../../server/images/petvet_logo.png';

import {Link} from 'react-router-dom';


class PetList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('MADE IT HERE');
        console.log('PROPS: in pet list', this.props);
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
