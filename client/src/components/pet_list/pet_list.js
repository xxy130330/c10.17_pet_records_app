import React, { Component } from "react";

import Logo from "../../../../server/images/petvet_logo.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPetData, delete_pet } from "../../actions/";
import axios from 'axios';

class PetList extends Component {
  constructor(props) {
    super(props);
    this.state={
      canDelete: false
    }
  }

  componentWillMount() {
    let currentOwnerId = null;
    if(this.props.id){
      currentOwnerId = this.props.id;
      localStorage.id = currentOwnerId;
    } else {
      currentOwnerId = localStorage.id;
    }

    this.props.fetchPetData(currentOwnerId);

  }
  softDeletePet(index) {
    const petDataProps= this.props.petdata;
    this.props.delete_pet(petDataProps[index]["ID"]).then(()=>this.props.fetchPetData(localStorage.getItem('id')));
  }
  render() {
<<<<<<< HEAD
    const toggleCanDelete= !this.state.canDelete;
=======
console.log(this.props.petdata);
>>>>>>> eded15ad71fad9f17b2ed9b734f4a5535f02726e
    const userPetList = this.props.petdata.map((item, index) => {
      const petAvatar = {
        backgroundImage: `url(${item.avatar})`
      };
      return (
        <div key={index}>
          <Link to={"/pet-profile/" + this.props.petdata[index]["ID"]}>
            <div className="petAvatar" style={petAvatar} />
            <h3 className="petName">{item.name}</h3>
            </Link>

            <div className="pull-right" onClick={()=>{this.softDeletePet(index)}}>
                <div className={this.state.canDelete? "glyphicon glyphicon-minus removeRecordIcon": ''} />
            </div>

        </div>
      );
    });
    return (
      <div className='bodyContainer'>
        <div className="petListContainer">
          <h1 className="petListTitle">Pet List</h1>
          <div className="iconNav">
        <Link to="/add-pet/">
          <p>Add Pet</p>
                <div className="glyphicon glyphicon-plus addRecordIcon" />
        </Link>
      </div>
          <div className="usersPetContainer">{userPetList}</div>
        </div>
        <div>
          <button className={!this.state.canDelete? 'btn btn-danger':'btn btn-warning'} onClick={()=>{this.setState({canDelete: toggleCanDelete})}}>{!this.state.canDelete? "Delete a Pet": 'Cancel'}</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    petdata: state.petdata,
    id: state.login.id,
    success: state.login.success,
    errorMessage: state.login.errorMessage,
    delete_pet: state.deletePet.delete_pet
  };
}

export default connect(mapStateToProps, { fetchPetData: fetchPetData, delete_pet: delete_pet})(
  PetList
);
