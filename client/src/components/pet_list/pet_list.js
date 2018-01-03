import React, { Component } from "react";
import "./new_pet_list_styles.css";
import pet_data from "../pet_data";
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
          <div>
            <Link to={"pet-profile/:"+index} ><div className="petAvatar" style={petAvatar} id={index} /></Link>
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



        {/*<footer>*/}
          {/*<div className="iconNav">*/}
            {/*<a href="#">*/}
              {/*<span className="glyphicon glyphicon-home" />*/}
            {/*</a>*/}
          {/*</div>*/}
          {/*<div className="iconNav">*/}
            {/*<a href="#">*/}
              {/*<span className="glyphicon glyphicon-calendar" />*/}
            {/*</a>*/}
          {/*</div>*/}
          {/*<div className="iconNav">*/}
            {/*<a href="#">*/}
              {/*<span className="glyphicon glyphicon-folder-open" />*/}
            {/*</a>*/}
          {/*</div>*/}
          {/*<div className="iconNav">*/}
            {/*<a href="#">*/}
              {/*<span className="glyphicon glyphicon-plus" />*/}
            {/*</a>*/}
          {/*</div>*/}
        {/*</footer>*/}
      </div>
    );
  }
}

export default PetList;
