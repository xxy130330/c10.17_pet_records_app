import React, { Component } from "react";
import "./pet_page.css";
import { Link } from "react-router-dom";
import Logo from "../../../../server/images/petvet_logo.png";
import { connect } from "react-redux";
import { fetchPetData, fetchProfileData, deleteMedicalRecordItem } from "../../actions/";
import axios from 'axios';

class PetProfile extends Component {
    componentDidMount() {
    let currentOwnerId = null;
    if(this.props.id){
      currentOwnerId = this.props.id;
      localStorage.id = currentOwnerId;
    } else {
      currentOwnerId = localStorage.id;
    }

    this.props.fetchProfileData(this.props.match.params.id);
    this.props.fetchPetData(currentOwnerId);
    //we need a condition, where if the pet has no record data, say no data available but still be able pull up their avatar, name, etc and allow them to add new record items, the user gets stuck on the loading screen
    }

    softDeleteRecord(index) {
        const petProfileData= this.props.petProfile;
        console.log('props after mapping state to it in petprofile:', this.props);
        console.log('recordID of item trying to delete', petProfileData[index]["recordID"]);
        this.props.deleteMedicalRecordItem(petProfileData[index]['recordID']).then(this.props.fetchProfileData(this.props.match.params.id));
    }

  getPetInfo() {

    if(!this.props.petdata.length) return;
    // console.log('PETPROFILE :::PROPS', this.props);
    // console.log('petdata from petprofile', this.props.petdata);
    let petObj = null;
    for (var i = 0; i < this.props.petdata.length; i++) {
      if (this.props.petdata[i]["ID"] === this.props.match.params.id) {
        petObj = this.props.petdata[i];
      }
    }

    const petImage = {
      backgroundImage: `url(${petObj.avatar})`
    };

    return (
      <div className="petInfoContainer">
        <div className="petImgContainer">
          <div className="petImg" style={petImage} />
        </div>
        <div className="petInfoDiv">
          <div className="petInfo">
            <h4>Name: {petObj.name}</h4>
            <h4>DOB: {petObj.dob}</h4>
            <h4>Breed: {petObj.breed}</h4>
          </div>
        </div>
      </div>
    );
  }
  listMedicalRecords() {
    const petId = this.props.match.params.id;
    const medicalRecordsList = this.props.petProfile.map((item, index) => {
      return (
        <div className="recordContainer" key={index}>
          <h3>
            <Link
              to={
                "/pet-profile/" +
                petId +
                "/record-item/" +
                this.props.petProfile[index]["recordID"]
              }
            >
              {item.type}
            </Link>
          </h3>
          <div
            className="pull-right"
            onClick={() => {this.softDeleteRecord(index)}}
          >

            <div className="glyphicon glyphicon-minus removeRecordIcon" />
          </div>
        </div>
      );
    });
    return medicalRecordsList;
  }
  render() {
    // console.log("petprofile render props", this.props);
    if (!this.props.petProfile.length) {
      return <h1>Loading</h1>;
    }
    let petName = null;
    for (var i = 0; i < this.props.petdata.length; i++) {
      if (this.props.petdata[i]["ID"] === this.props.match.params.id) {
        petName = this.props.petdata[i].name;
      }
    }
    return (
      <div>
        {this.getPetInfo()}
        <hr />
        <div className="medicalRecord">
          <div className="text-center">
            <h1>Record List for {petName}</h1>
            <div>
              <Link
                to={`/pet-profile/${this.props.match.params.id}/add-med-note/`}
              >
                <p>Add Record</p>
                <div className="glyphicon glyphicon-plus addRecordIcon" />
              </Link>
            </div>
            {this.listMedicalRecords()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    petdata: state.petdata,
    petProfile: state.petProfile,
    deleteMedicalRecordItem: state.deleteMedicalRecordItem
  };
}

export default connect(mapStateToProps, {
    fetchPetData: fetchPetData,
    fetchProfileData: fetchProfileData,
    deleteMedicalRecordItem: deleteMedicalRecordItem
})(PetProfile);
