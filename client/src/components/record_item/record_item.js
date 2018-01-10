import React, { Component } from "react";
import "./record_item.css";
import Logo from "../../../../server/images/petvet_logo.png";
import { connect } from "react-redux";
import { fetchMedicalData } from "../../actions/";

class RecordItem extends Component {
  componentWillMount() {
    this.props.fetchMedicalData(this.props.match.params.recordId);
  }

  render() {
    if (!this.props.petMedical.length) {
      return <h1>Loading</h1>;
    }

    return (
      <div className=" record_item_container">
        <h2 className="record_item_header">{this.props.petMedical[0].type}</h2>
        <h3 className="record_item_date">{this.props.petMedical[0].date}</h3>
        <hr />
        <p>{this.props.petMedical[0].details}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    petMedical: state.petMedical
  };
}

export default connect(mapStateToProps, {
  fetchMedicalData: fetchMedicalData
})(RecordItem);
