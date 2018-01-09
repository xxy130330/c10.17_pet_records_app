import React, { Component } from "react";
import "./pet_page.css";
import { Link } from "react-router-dom";
import Logo from "../../../../server/images/petvet_logo.png";
import axios from 'axios';

class PetProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      petId: this.props.match.params.id
    };
  }

  //AXIOS CALL 3
    componentWillMount() {
        //pulls up the specific record item that the user clicked on currently hardcoded for record item 4

        //this all needs to go into an on click handler that changes the recordID in the url to the petID for the record that the user clicked on
        const url = 'http://localhost:80/database_connect/server.php?&action=get&resource=record-item&recordID=4';

        axios.get(url).then((res) => {
            console.log(res.data);
            this.setState({
                PetData: (res.data.data),
            });
        });
    }

  getPetInfo() {
    console.log("props in pet_profile: ", this.props);
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
    console.log("in PetProfile:", this.props.data);
    if (this.props.data.length) {
      console.log("true");
      return (
        <div>
          {this.getPetInfo()}
          <hr />
          <div className="medicalRecord">
            <div className="recordList text-center">
              {this.listMedicalRecords()}
            </div>
          </div>
        </div>
      );
    } else {
      console.log("false");
      return <h1>Loading</h1>;
    }
  }
}
export default PetProfile;
