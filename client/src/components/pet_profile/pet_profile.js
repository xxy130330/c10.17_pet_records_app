import React, { Component } from "react";
import "./pet_page.css";
import { Link } from "react-router-dom";
import Logo from "../../../../server/images/petvet_logo.png";
import {connect} from 'react-redux';
import { fetchPetData, fetchProfileData } from '../../actions/';

class PetProfile extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   petId: this.props.match.params.id
    // };
  }

  componentWillMount(){
    console.log('PET PROFILE:',this.props);
    this.props.fetchProfileData(this.props.match.params.id);
    this.props.fetchPetData();

  }

  //AXIOS CALL 3
    // componentWillMount() {
        //pulls up the specific record item that the user clicked on currently hardcoded for record item 4

        //this all needs to go into an on click handler that changes the recordID in the url to the petID for the record that the user clicked on
    //     const url = 'http://localhost:80/database_connect/server.php?&action=get&resource=record-item&recordID=4';

    //     axios.get(url).then((res) => {
    //         console.log(res.data);
    //         this.setState({
    //             PetData: (res.data.data),
    //         });
    //     });
    // }

  getPetInfo() {

    let petObj = null;
    for(var i = 0; i < this.props.petdata.length; i++){
      if(this.props.petdata[i]['ID'] === this.props.match.params.id){
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
    const  petId  = this.props.match.params.id;

    const medicalRecordsList = this.props.petProfile.map(
      (item, index) => {
        return (
          <div className="recordContainer" key={index}>
            <h3>
              <Link to={"/pet-profile/" + petId + "/record-item/" + this.props.petProfile[index]['recordID']}>
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
    console.log('PETPROFILE::::::::::',this.props.petdata);
    if (this.props.petProfile.length) {
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
      return <h1>Loading</h1>;
    }
  }
}

function mapStateToProps(state){
    return{
        petdata: state.petdata,
        petProfile: state.petProfile

    }
}



export default connect(mapStateToProps, {fetchPetData: fetchPetData, fetchProfileData: fetchProfileData})(PetProfile)








