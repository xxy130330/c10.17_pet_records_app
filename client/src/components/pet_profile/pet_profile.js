import React, { Component } from "react";
import "./pet_page.css";
import PetData from "../../../../server/pet_data";
import { Link } from "react-router-dom";
import Logo from '../../assets/images/petvet_logo.png';

class PetProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      petObject: PetData,
      petId: this.props.match.params.id
    };
  }
  getPetInfo() {
    const { petId } = this.state;
    const petImage = {
      backgroundImage: `url(${this.props.data[petId].avatar})`
    };
    return (
      <div className="petInfoContainer">
        <div className="petImgContainer">
          <div className="petImg" style={petImage} />
        </div>
        <div className="petInfoDiv">
          <div className="petInfo">
            <h4>Name: {this.props.data[petId].name}</h4>
            <h4>DOB: {this.props.data[petId].dob}</h4>
            <h4>Breed: {this.props.data[petId].breed}</h4>
          </div>
        </div>
      </div>
    );
  }
  listMedicalRecords() {
    const { petId } = this.state;
    const medicalRecordsList = this.props.data[petId].medicalRecords.map(
      (item, index) => {
        console.log("this is the item for medical record items", item.type);
        return (
          <div className="recordContainer" key={index}>
            <h3>
              <Link to={"/pet-profile/" + petId + "/record-item/" + index}>
                {item.type}
              </Link>
            </h3>
          </div>
        );
      }
    );
    return medicalRecordsList;
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <header>
          <div className="title">
            <img src={Logo} />
          </div>
        </header>
        {this.getPetInfo()}
        <hr />
        <div className="medicalRecord">
          <div className="recordList text-center">
            {this.listMedicalRecords()}
          </div>
        </div>
      </div>
    );
  }
}
export default PetProfile;
