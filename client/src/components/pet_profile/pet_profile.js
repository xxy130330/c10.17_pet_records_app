import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../../server/images/petvet_logo.png";
import { connect } from "react-redux";
import { fetchPetData, fetchProfileData, deleteMedicalRecordItem } from "../../actions/";

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
    }

    softDeleteRecord(index) {
        const petProfileData= this.props.petProfile;
        console.log('props after mapping state to it in petprofile:', this.props);
        console.log('recordID of item trying to delete', petProfileData[index]["recordID"]);
        this.props.deleteMedicalRecordItem(petProfileData[index]['recordID']).then(()=>{
            this.props.fetchProfileData(this.props.match.params.id)
        });
    }

  getPetInfo() {
    if(!this.props.petdata.length) return;

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
          <div>
            <Link to={`/pet-to-vet/${this.props.match.params.id}`}><button>Connect this Pet to Vet</button></Link>
          </div>
          <div className="petInfo">
            <h4>Name: {petObj.name}</h4>
            <h4>DOB: {petObj.dob}</h4>
            <h4>Breed: {petObj.breed}</h4>
          {/*Will Display vet info here*/}
            <h4>Vet:</h4>

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
      console.log('props after delete record item in render', this.props);
    // if (!this.props.petProfile.length) {
    //     return <h1>Loading</h1>;
    // }

    let petName = null;
    for (var i = 0; i < this.props.petdata.length; i++) {
      if (this.props.petdata[i]["ID"] === this.props.match.params.id) {
        petName = this.props.petdata[i].name;
      }
    }


    return (
      <div className='bodyContainer'>
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
            { this.props.petProfile.length ?  this.listMedicalRecords() : <h1>No Pet Data</h1>}
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
