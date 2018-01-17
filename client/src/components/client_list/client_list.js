import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../../server/images/petvet_logo.png";
import axios from 'axios';
import { connect } from "react-redux";
import { fetchVetClientData } from "../../actions/";

class ClientList extends Component {
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
        const params =this.props.match.params;
        // const url = '/server/database_connect/server.php?action=get&resource=client_list&vetID=' + params.vetId;
        // axios({
        //     method: 'get',
        //     dataType: 'json',
        //     url: url,
        // }).then(res => {
        //     console.log(res.data);
        // });
        this.props.fetchVetClientData(params.vetId).then(()=>console.log('ON CLIENT-LIST these are now the props after fetching data', this.props));
    }

    fetchPetList(index) {
        console.log(this.props.match.params);

        const url = '/server/database_connect/server.php?action=get&resource=pets_for_vet&ownerID=' + this.props.clientList[index].ownerID + '&vetID=' + this.props.match.params.vetId;
        axios({
            method: 'get',
            dataType: 'json',
            url: url,
        }).then(res => {
            console.log(res);
        })
    }

    render() {
        if (!this.props.clientList.length) {
            return <h1>Loading</h1>;
        }
        console.log('clienList: ', this.props.clientList);
        console.log('name: ', this.props.name);
        console.log('ref ID: ', this.props.ref_id);

        let clientInformation= this.props.clientList.map((client, index)=>{
            return (
                <div className='recordContainer' key={index} onClick={()=> this.fetchPetList(index)}>
                    <h3>{client.name}</h3>
                    <h5>Email: {client.email}</h5>
                </div>
            )
        });



    return (
      <div className='bodyContainer'>
        <div className="vetInfoContainer">
          <div className="vetInfoDiv text-center">
              <h4>Vet Name: {this.props.name}</h4>
              <h4>Ref#: {this.props.ref_id}</h4>
          </div>
        </div>
        <hr />
        <div className="clientList">
          <div className="text-center">
            <h2>Client List</h2>
              {clientInformation}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    clientList: state.vetClientData.clientList,
    name: state.vetClientData.name,
    ref_id: state.vetClientData.ref_id
  };
}

export default connect(mapStateToProps, {fetchVetClientData: fetchVetClientData})(ClientList);





