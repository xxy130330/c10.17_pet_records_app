import React, { Component } from "react";
import "./new_pet_list_styles.css";
import Logo from "../../../../server/images/petvet_logo.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPetData } from "../../actions/";

class PetList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let currentID = null;
    if(this.props.id){
      currentID = this.props.id;
      localStorage.id = currentID;
    } else {
      currentID = localStorage.id;
    }
    console.log('OWNER ID IN PET LIST',currentID);
    this.props.fetchPetData(currentID);
  }

  render() {
    const userPetList = this.props.petdata.map((item, index) => {
      const petAvatar = {
        backgroundImage: `url(${item.avatar})`
      };
      return (
        <div key={index}>
          <Link to={"/pet-profile/" + this.props.petdata[index]["ID"]}>
            <div className="petAvatar" style={petAvatar} />
            <h3 className="petName">{item.name}</h3>
            </Link>
            <div className="pull-right" onClick={()=>{console.log('pet removed!'+this.props.petdata[index]["ID"]);}}>
              
                          
                <div className="glyphicon glyphicon-minus removeRecordIcon" />
              
            </div>
          
        </div>
      );
    });
    return (
      <div>
        <div className="petListContainer">
          <h1 className="petListTitle">Pet List</h1>
          <div className="iconNav">
        <Link to="/add-pet/">
          <p>Add Pet</p>
                <div className="glyphicon glyphicon-plus addRecordIcon" />
        </Link>
      </div>
          <div className="usersPetContainer">{userPetList}</div>
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
    errorMessage: state.login.errorMessage
  };
}

export default connect(mapStateToProps, { fetchPetData: fetchPetData })(
  PetList
);
