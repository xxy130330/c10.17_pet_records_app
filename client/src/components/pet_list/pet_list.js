import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPetData, delete_pet } from "../../actions/";
import '../assets/css/modal.css';
// import {ShowModal} from '../../helpers';


class PetList extends Component {
  constructor(props) {
    super(props);
    this.state={
      canDelete: false,
      showModal: false,
      petIndex: null,
      infoModal: false
    };
    // this.showModal=this.showModal.bind(this);
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
    this.props.fetchPetData(currentOwnerId).then(()=>{
        if(!this.props.petdata.length) {
            this.setState({
                infoModal: true
            })
        }
    });
  }
    infoModal(){
        return(
            <span>
          <div className='confirm-modal '>
              <div className="content-modal">
                  <div className="card petListCard">
                      <div className="card-header">Welcome To PetVet</div>
                      <div className="card-block">
                          <p className="card-text">The place where you can share your pet's medical information with your veterinarian!</p>
                          <p className='card-text'> Follow the steps below to get started:</p>
                          <ol>
                              <div>
                                  <li className='text-left'>Add a pet</li>
                                  <li className='text-left'>Connect your pet to a vet</li>
                                  <li className='text-left' >Record medical information</li>
                              </div>
                          </ol>
                      </div>
                      <div className="card-footer">
                            <button onClick={()=>this.setState({infoModal: false})} className='btn btn-outline-success'>Got It!</button>
                      </div>
                  </div>
              </div>
          </div>
        </span>
        )
    }

  //////////TRIGGER MODAL HERE//////////
  triggerModal(index) {
    this.setState({...this.state, showModal:true, petIndex: index});
  }
    //////////SHOW MODAL HERE//////////
  showModal(){
    // return PetListModal(this.state, self );
      const {petIndex}= this.state;
      const style={
          backgroundImage: `url(${this.props.petdata[petIndex].avatar})`
      }
      const item= this.props.petdata[petIndex];
      return(
        <span>
          <div className='confirm-modal '>
              <div className="content-modal">
                  <div className="card">
                      <div className="card-header">Are you sure you want to delete:</div>
                      <div className="card-block">
                          <div className='card-title'>{item.name}</div>
                          <div className="petAvatar petAvatarModal" style={style} />
                      </div>
                      <div className="card-footer">
                            <button onClick={()=> this.deleteFromServer()} className='btn btn-outline-success'>Confirm</button>
                            <button onClick={()=> this.setState({...this.state, showModal: false, canDelete: false})} className='btn btn-outline-danger'>Cancel</button>
                      </div>
                  </div>
              </div>
          </div>
        </span>
      )
  }
  deleteFromServer(){
      const {petIndex}= this.state;
      const petDataProps= this.props.petdata;
      // console.log('we have deleted this item from server', petDataProps);
      this.setState({...this.state, showModal:false, canDelete: false});
      this.props.delete_pet(petDataProps[petIndex]["ID"]).then(()=>this.props.fetchPetData(localStorage.getItem('id')).then(
          ()=>this.setState({...this.state, showModal: false, canDelete: false,})
      ));
  }
  render() {
    const {showModal,infoModal}= this.state;
    const toggleCanDelete= !this.state.canDelete;
    const userPetList = this.props.petdata.map((item, index) => {

      const petAvatar = {
        backgroundImage: `url(${item.avatar})`
      };
      const item_name = item.name.length>8 ? <h4 className='petListName'>{item.name}</h4> : <h2 className='petListName'>{item.name}</h2>
      return (
        <div key={index} className='row justify-content-center petRow'>
          <Link className='' to={"/pet-profile/" + this.props.petdata[index]["ID"]}>
            <div className="petAvatar" style={petAvatar}></div>
          </Link>
          <div className="nameContainer">
            {item_name}
          </div>
            <div className='deleteButton'>
                <i onClick={()=>{this.triggerModal(index)}} className={this.state.canDelete? "fa fa-times-circle aria-hidden=true fa-3x ": ''}></i>
            </div>
        </div>
      );
    });
    // console.log('pet list data length:::::', this.props.petdata);
    
    return (
      <div className='bodyContainer'>
        <div className="petListContainer">
          <h1 className="petListTitle">
          {this.props.petdata.length !== 0 ? 'Pet List' :'No Pet Added'}
          </h1>
            <div className='container'>
              {userPetList}
            </div>
        </div>
        <div className="deleteNAddContainer">
          <button className={!this.state.canDelete? 'btn btn-outline-danger':'btn btn-outline-warning'}
              onClick={()=>{this.setState({canDelete: toggleCanDelete})}}>{!this.state.canDelete? "Delete a Pet": 'Cancel'}
          </button>
          <Link to="/add-pet/"><button className='btn btn-outline-success addPet'>Add a Pet</button></Link>
            {showModal? this.showModal(): ''}
            {infoModal? this.infoModal():''}

        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    petdata: state.petdata,
    id: state.login.id,
    success: state.login.success,
    errorMessage: state.login.errorMessage,
    delete_pet: state.deletePet.delete_pet
  };
}

export default connect(mapStateToProps, { fetchPetData: fetchPetData, delete_pet: delete_pet})(
  PetList
);
