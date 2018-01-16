import React, { Component } from "react";
import "./record_item.css";
import Logo from "../../../../server/images/petvet_logo.png";
import { connect } from "react-redux";
import { fetchMedicalData } from "../../actions/";

class RecordItem extends Component {

    constructor(props){
        super(props);

        this.canEdit= false;
    }

  componentWillMount() {
    this.props.fetchMedicalData(this.props.match.params.recordId);
    console.log('record id using the url, ', this.props.match.params.recordId);
    console.log('can we edit upon mounting? ', this.canEdit);
  }

  handleEditClick(){
        this.canEdit=true;
        console.log('the handle edit button has been clicked', this.canEdit);

  }
  render() {
    if (!this.props.petMedical.length) {
      return <h1>Loading</h1>;
    }

    return (
        <div className=" record_item_container">
            <div>
                <button onClick={()=>this.handleEditClick()} className='btn btn-warning'>Edit</button>
            </div>
            <h2 className="record_item_header" contentEditable={this.canEdit? 'true': 'false'}>{this.props.petMedical[0].type}</h2>
            <h3 className="record_item_date" contentEditable={this.canEdit? 'true': 'false'}>{this.props.petMedical[0].date}</h3>
            <hr />
            <p contentEditable={this.canEdit? 'true': 'false'}>{this.props.petMedical[0].details}</p>
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
