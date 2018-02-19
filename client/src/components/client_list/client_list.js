import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { fetchVetClientData, readSessions } from "../../actions/";
import "../assets/css/modal.css";

class ClientList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };
  }
  componentWillMount() {
      this.props.readSessions().then(()=>{
          // console.log('this is the current auth', this.props);
          if(!this.props.auth || !this.props.vetAccess){
              this.props.history.push('/');
          }
      });
    const params = this.props.match.params;
    this.props.fetchVetClientData(params.vetId).then(() => {
      if (!this.props.clientList.length) {
        this.setState({
          showModal: true
        });
      }
    });
  }
  handleClientClick(index) {
    this.props.history.push(
      "/vet-client-pets/" + this.props.match.params.vetId + "/" + this.props.clientList[index].ownerID
    );
  }
  infoModal() {
    return (
      <span>
        <div className="confirm-modal ">
          <div className="content-modal">
            <div className="card clientListCard">
              <div className="card-header">Welcome To PetVet</div>
              <div className="card-title">Getting Started</div>
              <div className="card-block">
                <p>
                  Thank you for using our app. To get started, please share your
                  vet email and unique reference id with your clients in order
                  to gain access to their pets.
                </p>
              </div>
              <div className="card-footer">
                <button
                  onClick={() => this.setState({ showModal: false })}
                  className="btn btn-outline-success"
                >
                  Got It!
                </button>
              </div>
            </div>
          </div>
        </div>
      </span>
    );
  }
  render() {
    let clientInformation = this.props.clientList.map((client, index) => {
      return (
        <div
          className="recordContainer recordContainerClientList"
          key={index}
          onClick={key => this.handleClientClick(index)}
        >
          <h3>{client.name}</h3>
          <h5>Email: {client.email}</h5>
        </div>
      );
    });

    return (
      <div className="bodyContainer">
        <div className="vetInfoContainer">
          <div className="vetInfoDiv text-center">
            <h4>Vet Email: {this.props.email}</h4>
            <h4>Ref#: {this.props.ref_id}</h4>
          </div>
        </div>
        <hr />
        <div className="clientList">
          <div className="text-center">
            <h1>Client List</h1>
            {this.props.clientList.length ? (clientInformation) : (<h1>No Client Data</h1>)}
            {this.state.showModal ? this.infoModal() : ""}
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
    ref_id: state.vetClientData.ref_id,
      auth: state.sessions.auth,
      id: state.sessions.id,
      vetAccess: state.sessions.vetAccess

  };
}

export default connect(mapStateToProps, {fetchVetClientData, readSessions})(ClientList);
