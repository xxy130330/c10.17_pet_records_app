import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";


//ownerID who is currently logged in
//petID

//for ownerID , you can use this.props.id
//for petID, you can use this.props.match.params.petId

class PetToVet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        vetEmail: "",
        vetRefNum: ""
      },
      ownerID: localStorage.id,
      petID: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    console.log('PET TO VET PROPS:::', this.props);
    console.log('PET TO VET ownerID:::', this.props.id);
    console.log('PET TO VET PETID::::', this.props.match.params.petId);
    let currentOwnerId = null;
    if(this.props.id){
      currentOwnerId = this.props.id;
      localStorage.id = currentOwnerId;
    } else {
      currentOwnerId = localStorage.id;
    }
  }




  handleInputChange(e) {

    const { name, value } = e.target;
    const { form } = this.state;


    form[name] = value;
    this.setState({ form: { ...form } });
  }

  handleSubmit(e){
    e.preventDefault();
    console.log(this.state.form);

  }


  render() {

    const { vetEmail, vetRefNum } = this.state.form;
    return (
      <div>
        <div className="pictureContainer">
          <h2 className="text-center">Connect Pet To Vet</h2>
        </div>
        <form className="container" onSubmit={e => this.handleSubmit(e)}>
          <div className="form-group">
            <label>Vet Email</label>
            <input
              className="form-control input-lg"
              type="text"
              onChange={e => this.handleInputChange(e)}
              name="vetEmail"
              value={vetEmail}
            />
          </div>
          <div className="form-group">
            <label>Vet Ref #</label>
            <input
              className="form-control input-lg"
              type="text"
              onChange={e => this.handleInputChange(e)}
              name="vetRefNum"
              value={vetRefNum}
            />
          </div>
          <button className="btn btn-primary">Submit</button>
          <Link to='/pet-list' className='pull-right my-5'> Skip </Link>


        </form>
      </div>
    );
  }
}



function mapStateToProps(state) {
  return {
    id: state.login.id,
  };
}


export default connect(mapStateToProps)(PetToVet)


