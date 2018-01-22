import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../../server/images/petvet_logo.png";
import { connect } from "react-redux";
import { fetchPetData, fetchProfileData, deleteMedicalRecordItem } from "../../actions/";
import '../assets/css/modal.css';


class PetProfile extends Component {
    constructor(props){
        super(props);

        this.state={
            canDelete: false,
            showModal: false,
            recordIndex: null,

        }
    }
    componentWillMount() {
          console.log('PET LIST PROPS::::::', this.props);
    let currentOwnerId = null;
    if(this.props.id){
      currentOwnerId = this.props.id;
      localStorage.id = currentOwnerId;
    } else {
      currentOwnerId = localStorage.id;
    }
    this.props.fetchProfileData(this.props.match.params.id)
    .then(()=>this.props.fetchPetData(currentOwnerId))


    console.log('these are the props in pet profile, ', this.props);
    }

    softDeleteRecord() {
        const {recordIndex} =this.state;
        console.log('this is record item according to state ', recordIndex);
        const petProfileData= this.props.petProfile;
        console.log(' and this is petProfile Data on props ', petProfileData);

        this.props.deleteMedicalRecordItem(petProfileData[recordIndex]['recordID']).then(()=>{
            console.log('the current state of showModal after deleting : ' , this.state.showModal);
            this.props.fetchProfileData(this.props.match.params.id).then(
                this.setState({...this.state, showModal: false, canDelete: false,})
            )
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
          <div className="petAvatar petAvatarProfile" style={petImage} />
        </div>
        <div className="petInfoDiv">
          <div className='connectPetBtn'>
            <Link to={`/pet-to-vet/${this.props.match.params.id}`}>
                <button className='btn btn-outline-warning' style={this.props.vetAccessLevel? {'display':'none'}: {'display':'inline-block'}}>{petObj.vet!=='No vet connected'? 'Change Current Vet?' :'Connect this Pet to Vet?'}</button>
            </Link>
          </div>
          <div className="petInfo">
            <h4>Name: {petObj.name}</h4>
            <h4>DOB: {petObj.dob}</h4>
            <h4>Breed: {petObj.breed}</h4>
          {/*Will Display vet info here*/}
            <h4>Vet: {petObj.vet}</h4>
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
                <Link to={"/pet-profile/" + petId + "/record-item/" + this.props.petProfile[index]["recordID"]}>
                  {item.type}
                </Link>
            </h3>
            <span onClick={()=>this.triggerModal(index)} className="petProfileSpan pull-right">
                <i  className={this.state.canDelete? "fa fa-times-circle fa-2x aria-hidden=true": ''} ></i>
            </span>
        </div>
      );
    });
    return medicalRecordsList;
  }
    //////////TRIGGER MODAL HERE//////////
    triggerModal(index) {
        console.log('attempting to trigger the modal');
        this.setState({...this.state, showModal:true, recordIndex: index});
    }
    //////////SHOW MODAL HERE//////////
    showModal(){
        console.log('you have returned the modal elements');
        // return PetListModal(this.state, self );
        // const {recordIndex}= this.state;
        const {recordIndex}= this.state;
        console.log('record index after showing modal ', recordIndex);
        return(
            <span>
              <div className='confirm-modal '>
                  <div className="content-modal">
                      <div className="card">
                          <div className="card-header">Are you sure you want to delete:</div>
                          <div className="card-block">
                              <div className="card-title">
                                  <h5>Medical Record:</h5>
                              </div>
                          </div>
                          <div className='card-block'>
                              <h2 className='font-weight-bold'>{this.props.petProfile[recordIndex].type}</h2>
                          </div>
                          <div className="card-footer">
                                <button onClick={()=> this.softDeleteRecord()} className='btn btn-outline-success'>Confirm</button>
                                <button onClick={()=> this.setState({...this.state, showModal: false, canDelete: false})} className='btn btn-outline-danger'>Cancel</button>
                          </div>
                      </div>
                  </div>
              </div>
            </span>
        )
    }

  render() {
    console.log('IN REDNER FUNCTION:::::::::::',this.props.petdata);
    console.log('IN RENDER FUNCTION PARAMS ID::::::', this.props.match.params.id);
    var found = false;
    for(var i = 0; i <this.props.petdata.length; i++){

      if(this.props.petdata[i]['ID'] === this.props.match.params.id){
        found = true
      }
    }
    if(!found) return <h1>Loading</h1>;


    let petName = null;
    for (var i = 0; i < this.props.petdata.length; i++) {
      if (this.props.petdata[i]["ID"] === this.props.match.params.id) {
        petName = this.props.petdata[i].name;
      }
    }
    const toggleCanDelete= !this.state.canDelete;
    const {showModal}= this.state;
    return (

      <div className='bodyContainer'>
        {this.getPetInfo()}

        <div className="medicalRecord">
          <div className="text-center">
            <h1 className='listTitle'>Record List for {petName}</h1>
              {this.props.petProfile.length ?  this.listMedicalRecords() : <h1>No Pet Data</h1>}
              <div style={this.props.vetAccessLevel? {'display': 'none'}: {'display': 'inline'} }>
                  <button className={!this.state.canDelete? 'btn btn-outline-danger':'btn btn-outline-warning'}
                          onClick={()=>{this.setState({canDelete: toggleCanDelete})}}>{!this.state.canDelete? "Delete A Record": 'Cancel'}
                  </button>
                  <Link to={`/pet-profile/${this.props.match.params.id}/add-med-note/`}>
                      <button className= "btn btn-outline-success">
                          Add Medical Record
                      </button>
                  </Link>
                  {showModal? this.showModal(): ''}
              </div>
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
    deleteMedicalRecordItem: state.deleteMedicalRecordItem,
    vetAccessLevel: state.vetlogin.accessLevel,

  };
}
export default connect(mapStateToProps, {
    fetchPetData: fetchPetData,
    fetchProfileData: fetchProfileData,
    deleteMedicalRecordItem: deleteMedicalRecordItem,
})(PetProfile);
