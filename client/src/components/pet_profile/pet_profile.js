import React, { Component } from "react";
import "./pet_page.css";
import { Link } from "react-router-dom";
import Logo from "../../../../server/images/petvet_logo.png";
import { connect } from "react-redux";
import { fetchPetData, fetchProfileData } from "../../actions/";

class PetProfile extends Component {
  componentWillMount() {
    this.props.fetchProfileData(this.props.match.params.id);
    // this.props.fetchPetData();
      console.log('PET DATA: ', this.props.petdata);
  }

  getPetInfo() {
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
        </div>
      );
    });
    return medicalRecordsList;
  }
  render() {
    console.log('props', this.props);
    if (!this.props.petProfile.length) {
      return <h1>Loading</h1>;
    }
    return (

      <div>
        {this.getPetInfo()}
        <hr />
        <div className="medicalRecord">
          <div className="recordList text-center">
            <div className="iconNav">
              <Link to={`/pet-profile/${this.props.match.params.id}/add-med-note/`}>
                <span className="glyphicon glyphicon-plus" />
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
    petProfile: state.petProfile
  };
}

export default connect(mapStateToProps, {
  fetchPetData: fetchPetData,
  fetchProfileData: fetchProfileData
})(PetProfile);
