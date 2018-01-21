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
    };
    // this.showModal=this.showModal.bind(this);
  }
  componentWillMount() {
    let currentOwnerId = null;
    if(this.props.id){
      currentOwnerId = this.props.id;
      localStorage.id = currentOwnerId;
    } else {
      currentOwnerId = localStorage.id;
    }
    this.props.fetchPetData(currentOwnerId);
  }

  //////////TRIGGER MODAL HERE//////////
  triggerModal(index) {
    this.setState({...this.state, showModal:true, petIndex: index});
  }
    //////////SHOW MODAL HERE//////////
  showModal(){
    // return PetListModal(this.state, self );
      return(
          <span>
          <div className='confirm-modal '>
              <div className="content-modal">
                  <div className="card">
                      <div className="card-content">"Are you sure you want to delete this item?"</div>
                      <div className="card-action">
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
      console.log('we have deleted this item from server', petDataProps);
      this.setState({...this.state, showModal:false, canDelete: false});
      this.props.delete_pet(petDataProps[petIndex]["ID"]).then(()=>this.props.fetchPetData(localStorage.getItem('id')).then(
          ()=>this.setState({...this.state, showModal: false, canDelete: false,})
      ));
  }
  render() {
    const {showModal}= this.state;
    const toggleCanDelete= !this.state.canDelete;
    const userPetList = this.props.petdata.map((item, index) => {
      const petAvatar = {
        backgroundImage: `url(${item.avatar})`
      };
      return (
        <div key={index} className='petList'>
          <Link to={"/pet-profile/" + this.props.petdata[index]["ID"]}>
            <div className="petAvatar" style={petAvatar} />
            <h3 className="petName">{item.name}</h3>
          </Link>
            <div className='deletePetBtn'>
          <i onClick={()=>{this.triggerModal(index)}} className={this.state.canDelete? "fa fa-times-circle aria-hidden=true": ''}></i>
            </div>
        </div>
      );
    });
    return (
      <div className='bodyContainer'>
        <div className="petListContainer">
          <h1 className="petListTitle">Pet List</h1>
          <div className="iconNav"></div>
            <div className="usersPetContainer">{userPetList}</div>
        </div>
        <div className="deleteNAddContainer">
          <button className={!this.state.canDelete? 'btn btn-outline-danger':'btn btn-outline-warning'}
              onClick={()=>{this.setState({canDelete: toggleCanDelete})}}>{!this.state.canDelete? "Delete a Pet": 'Cancel'}
          </button>
          <Link to="/add-pet/"><button className='btn btn-outline-success'>Add a Pet</button></Link>
            {showModal? this.showModal(): ''}
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
