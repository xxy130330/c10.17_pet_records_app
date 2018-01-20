import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../../server/images/petvet_logo.png";
import axios from 'axios';
import { connect } from "react-redux";
import { fetchVetClientData } from "../../actions/";

class ClientList extends Component {
    componentWillMount() {
        const params =this.props.match.params;
        this.props.fetchVetClientData(params.vetId);
        console.log('these are the props in client list, ', this.props);
    }
    handleClientClick(index){
        this.props.history.push('/vet-client-pets/'+this.props.match.params.vetId +'/' +this.props.clientList[index].ownerID);
    }
  render() {
    // if (!this.props.clientList.length) {
    //     return <h1>Loading</h1>;
    // }

    let clientInformation= this.props.clientList.map((client, index)=>{
        return (
            <div className='recordContainer' key={index} onClick={(key)=>this.handleClientClick(index)}>
                <h3>{client.name}</h3>
                <h5>Email: {client.email}</h5>
            </div>
        )
    });




    console.log('IN RENDER ', this.props);
        return (
          <div className='bodyContainer'>
            <div className="vetInfoContainer">
              <div className="vetInfoDiv text-center">
                  <h4>Vet Email: {this.props.email}</h4>
                  <h4>Ref#: {this.props.ref_id}</h4>
              </div>
            </div>
            <hr />
            <div className="clientList">
              <div className="text-center">
                <h2>Client List</h2>
                  {this.props.clientList.length ?  clientInformation : <h1>No Client Data</h1>}

              </div>
            </div>
          </div>
        );
  }
}

function mapStateToProps(state) {
  return {
    clientList: state.vetClientData.clientList,
      vetAccessLevel: state.vetlogin.accessLevel,
    email: state.vetClientData.email,
    ref_id: state.vetClientData.ref_id
  };
}

export default connect(mapStateToProps, {fetchVetClientData: fetchVetClientData})(ClientList);





