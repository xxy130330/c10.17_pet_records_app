import React, { Component } from "react";
import PetData from "../../../../server/pet_data";
import "./record_item.css";
import Logo from '../../assets/images/petvet_logo.png';


class RecordItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      petObject: PetData,
      recordId: this.props.match.params.recordId,
      petId: this.props.match.params.petId
    };
  }
  render() {
    console.log("props", this.props);
    const { recordId, petId } = this.state;
    conss
    

    return (
      <div className="record_item_body">
        <header>
          <div className="title">
            <img src={Logo} />
          </div>
        </header>
        <div className=" record_item_container">
          <h2 className="record_item_header">
            {PetData[petId].medicalRecords[recordId].type}
          </h2>
          <h3 className="record_item_date">
            {PetData[petId].medicalRecords[recordId].date}
          </h3>
          <hr />
          <p>{PetData[0].medicalRecords[0].details}</p>
        </div>
      </div>
    );
  }
}
export default RecordItem;
