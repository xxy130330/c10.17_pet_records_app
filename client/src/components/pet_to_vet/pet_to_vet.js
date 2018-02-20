import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import {readSessions} from "../../actions/index";

class PetToVet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      petID: null,
      successModal: false,
      numError: false
    };
    this.currentOwnerId=null;
  }

  componentDidMount() {
      this.props.readSessions().then(()=>{
          // console.log('this is the current auth', this.props);
          if(!this.props.auth || this.props.vetAccess){
              this.props.history.push('/');
          }
          if(this.props.auth){
              this.currentOwnerId= this.props.sessionId;
          }
      });
  }

  handleSubmitss(values) {
    const url =
      "/server/database_connect/server.php?action=post&resource=petVetConnect";
    axios({
      method: "post",
      url: url,
      dataType: "json",
      data: {
        vetEmail: values.email,
        refNum: values.vetRefNum,
        ownerID: this.props.sessionId,
        petID: this.props.match.params.petId,
        oldVetName: this.props.match.params.vetName
      }
    })
      .then(res => {
        if (!res.data.success) {
          this.setState({
            numError: true
          });
        } else {
          this.setState({
            successModal: true,
            numError: false
          });
        }
      })
      .catch(() => console.log("no connection with server", res.data));
  }

  successModal() {
    return (
      <span>
        <div className="confirm-modal ">
          <div className="content-modal">
            <div className="card petListCard">
              <div className="card-header">Success!</div>
              <div className="card-block">
                <p className="card-text">
                  You have successfully connected your pet with your
                  veterinarian!
                </p>
              </div>
              <div className="card-footer">
                <button
                  onClick={() => this.props.history.push("/pet-list/")}
                  className="btn btn-outline-success"
                >
                  Done!
                </button>
              </div>
            </div>
          </div>
        </div>
      </span>
    );
  }

  renderInput({ label, input, type, meta: { touched, error, active, visited }}) {
    return (
      <div className="form-group row">
        <label className="col-form-label">{label}</label>
        <input className="form-control input-lg" type={type} {...input} />
        <p className="text-danger">{touched && error}</p>
      </div>
    );
  }

  render() {
    const { successModal } = this.state;
    return (
      <div className="bodyContainer">
        <h1 className="text-center">Connect Pet To Vet</h1>

        <form
          className="petToVetContainer"
          onSubmit={this.props.handleSubmit(this.handleSubmitss.bind(this))}
        >
          <Field
            name="email"
            label="Vet Email:"
            type="email"
            component={this.renderInput}
          />
          <Field
            name="vetRefNum"
            label="Vet Reference Number:"
            type="vetRefNum"
            component={this.renderInput}
          />
          {this.state.numError ? (<p className="text-danger">reference number invalid</p>) : ( "" )}
          <button className="btn btn-primary submitBtnPetToVet">Submit</button>
          <Link to="/pet-list" className="pull-right my-5">
            Skip
          </Link>
        </form>
        <div className="text-center connectPetSmallTag">
          <small className="text-muted">
            Contact your vet. If you know your vet's email and reference id
            please enter them above. If not, ask them to join the app and share
            their information.
          </small>
        </div>
        {successModal ? this.successModal() : ""}
      </div>
    );
  }
}

function validate(values) {
  const error = {};
  if (!values.vetRefNum) {
    error.vetRefNum = "Please enter reference number";
  }
  if (!values.email) {
    error.email = "Please enter your email";
  }
  return error;
}

PetToVet = reduxForm({
  form: "pet-to-vet",
  validate: validate
})(PetToVet);

function mapStateToProps(state) {
  return {
    id: state.login.id,
    sessionId: state.sessions.id,
    auth: state.sessions.auth,
      vetAccess: state.sessions.vetAccess
  };
}

export default connect(mapStateToProps, {readSessions})(PetToVet);
