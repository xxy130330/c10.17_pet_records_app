import React, { Component } from "react";
import "./new_pet_list_styles.css";
import pet_data from "../../../../server/pet_data";
import {Link} from 'react-router-dom';

class PetList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // say something
    const userPetList= this.props.data.map((item,index)=>{
        const petAvatar = {
            backgroundImage: `url(${item.avatar})`
        };
        console.log(item.avatar);
        console.log('this is the index: ',index);
        return(
          <div key={index}>
            <Link to={"pet-profile/"+index} ><div className="petAvatar" style={petAvatar} id={index} /></Link>
            {/* This one would not need the `:` colon to be added to the link for the params*/}
          </div>
      )
    });
    return (
      <div>
        <header>
          <h1 className="title">Pet to Vet</h1>
        </header>
        <div className="petListContainer">
          <h1 className="petListTitle">Pet List</h1>
          <div className="usersPetContainer">
            {userPetList}
            {/*<Link to="/pet-profile/"><div className="petAvatar" style={petAvatar} /></Link>*/}
          </div>
        </div>
      </div>
    );
  }
}

export default PetList;
