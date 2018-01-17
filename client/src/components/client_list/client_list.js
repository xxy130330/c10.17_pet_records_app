import React, { Component } from "react";
import "./client_list.css";
import { Link } from "react-router-dom";
import Logo from "../../../../server/images/petvet_logo.png";
import axios from 'axios';
// import { connect } from "react-redux";
// import { fetchPetData, fetchProfileData, deleteMedicalRecordItem } from "../../actions/";

export default class ClientList extends Component {
  // componentDidMount() {
  //   let currentOwnerId = null;
  //   if(this.props.id){
  //     currentOwnerId = this.props.id;
  //     localStorage.id = currentOwnerId;
  //   } else {
  //     currentOwnerId = localStorage.id;
  //   }
  //   this.props.fetchProfileData(this.props.match.params.id);
  //   this.props.fetchPetData(currentOwnerId);
  //   }



  // getPetInfo() {
  //   if(!this.props.petdata.length) return;

  //   let petObj = null;
  //   for (var i = 0; i < this.props.petdata.length; i++) {
  //     if (this.props.petdata[i]["ID"] === this.props.match.params.id) {
  //       petObj = this.props.petdata[i];
  //     }
  //   }
  //   const petImage = {
  //     backgroundImage: `url(${petObj.avatar})`
  //   };

  //   return (
  //     <div className="petInfoContainer">
  //       <div className="petImgContainer">
  //         <div className="petImg" style={petImage} />
  //       </div>


  //       <div className="petInfoDiv">
  //         <div>
  //           <Link to='/pet-to-vet/'><button>Connect this Pet to Vet</button></Link>
  //         </div>
  //         <div className="petInfo">
  //           <h4>Name: {petObj.name}</h4>
  //           <h4>DOB: {petObj.dob}</h4>
  //           <h4>Breed: {petObj.breed}</h4>
  //         {/*Will Display vet info here*/}
  //           <h4>Vet:</h4>

  //         </div>
  //       </div>

  //     </div>
  //   );
  // }
  // listMedicalRecords() {

  //     const petId = this.props.match.params.id;

  //   const medicalRecordsList = this.props.petProfile.map((item, index) => {
  //     return (
  //       <div className="recordContainer" key={index}>
  //         <h3>
  //           <Link
  //             to={
  //               "/pet-profile/" +
  //               petId +
  //               "/record-item/" +
  //               this.props.petProfile[index]["recordID"]
  //             }
  //           >
  //             {item.type}
  //           </Link>
  //         </h3>
  //         <div
  //           className="pull-right"
  //           onClick={() => {this.softDeleteRecord(index)}}
  //         >

  //           <div className="glyphicon glyphicon-minus removeRecordIcon" />
  //         </div>
  //       </div>
  //     );
  //   });
  //   return medicalRecordsList;
  // }
    componentWillMount() {
        //pull vets associated owners
        const url = '/server/database_connect/server.php?action=get&resource=client_list&vetID=' + 12;
        axios({
            method: 'get',
            dataType: 'json',
            url: url,
        }).then(res => {
            console.log(res.data);
        });
    }

  render() {
      // console.log('props after delete record item in render', this.props);
    // if (!this.props.petProfile.length) {
    //     return <h1>Loading</h1>;
    // }

    // let petName = null;
    // for (var i = 0; i < this.props.petdata.length; i++) {
    //   if (this.props.petdata[i]["ID"] === this.props.match.params.id) {
    //     petName = this.props.petdata[i].name;
    //   }
    // }


    return (
      <div>
        <div className="vetInfoContainer">
          <div className="vetInfoDiv text-center">
              <h4>Name: Some Vet's Nam</h4>
              <h4>Ref#: Some Vet's Ref#</h4>
          </div>
        </div>
        <hr />
        <div className="clientList">
          <div className="text-center">
            <h1>Client List</h1>
            <div className="recordContainer">
              <h3> Client One Name </h3>
            </div>
            <div className="recordContainer">
              <h3> Client Two Name </h3>
            </div>
            <div className="recordContainer">
              <h3> Client Three Name </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     petdata: state.petdata,
//     petProfile: state.petProfile,
//     deleteMedicalRecordItem: state.deleteMedicalRecordItem
//   };
// }

// export default connect(mapStateToProps, {
//     fetchPetData: fetchPetData,
//     fetchProfileData: fetchProfileData,
//     deleteMedicalRecordItem: deleteMedicalRecordItem
// })(PetProfile);





