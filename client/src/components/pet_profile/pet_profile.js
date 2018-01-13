import React, { Component } from "react";
import "./pet_page.css";
import { Link } from "react-router-dom";
import Logo from "../../../../server/images/petvet_logo.png";
import { connect } from "react-redux";
import { fetchPetData, fetchProfileData } from "../../actions/";

class PetProfile extends Component {
  componentDidMount() {
    console.log("The Owners ID using url string", this.props.match.params.id);
    this.props.fetchProfileData(this.props.match.params.id);
    this.props.fetchPetData(this.props.match.params.id);
    console.log("PET DATA: ", this.props.petdata);

    //we need a condition, where if the pet has no record data, say no data available but still be able pull up their avatar, name, etc and allow them to add new record items, the user gets stuck on the loading screen
  }

  getPetInfo() {
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
            onClick={() => {
              console.log(
                "record removed! " + this.props.petProfile[index]["recordID"]
              );
            }}
          >
          
            <div className="glyphicon glyphicon-minus removeRecordIcon" />
          </div>
        </div>
      );
    });
    return medicalRecordsList;
  }
  render() {
    console.log("petprofile render props", this.props);
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
    id: state.login.id
  };
}

export default connect(mapStateToProps, {
  fetchPetData: fetchPetData,
  fetchProfileData: fetchProfileData
})(PetProfile);
