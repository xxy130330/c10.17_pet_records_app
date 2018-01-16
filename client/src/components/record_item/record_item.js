import React, { Component } from "react";
import "./record_item.css";
import Logo from "../../../../server/images/petvet_logo.png";
import { connect } from "react-redux";
import { fetchMedicalData, editMedicalRecord } from "../../actions/";

class RecordItem extends Component {

    constructor(props){
        super(props);
        this.state={
            canEdit: false,
            type: null,
            date: null,
            details: null
        }
    }

  componentWillMount() {
    console.log('the props upon mount: ', this.props);
    this.props.fetchMedicalData(this.props.match.params.recordId).then(()=>{
        this.setState({
            canEdit: false,
            type: this.props.petMedical[0].type,
            date: this.props.petMedical[0].date,
            details: this.props.petMedical[0].details
        })
    });
  }

  handleEditClick(){
      this.setState({
            canEdit: true
        });

  }
  renderButton(){
      if(this.state.canEdit){
          return <button onClick={()=>this.saveChanges()} className='btn btn-success'>Save Changes</button>
      }
  }
  saveChanges(){
      const params= this.props.match.params;
      this.setState({...this.state, canEdit: false,});
      console.log('this is the current state after clicking save changes', this.state);
      // this.props.editMedicalRecord(this.state, params);
      // console.log('and these are the params', params);

  }
  handleChange(e){
      console.log(e.target.value);
  }
  render() {
    if (!this.props.petMedical.length) {
      return <h1>Loading</h1>;
    }
      console.log('this props after calling fetch medical data', this.props);
    console.log('re rendered state after clicking save changes', this.state);

      const {type,date,details,canEdit}= this.state;
      return (

        <div className=" record_item_container">
            <div>
                <button onClick={()=>this.handleEditClick()} className='btn btn-warning'>Edit</button>
            </div>
            <h2 onChange={(e)=>this.handleChange(e)} className="record_item_header" contentEditable={canEdit? 'true': 'false'}>{type}</h2>
            <h3 className="record_item_date" contentEditable={canEdit? 'true': 'false'}>{date}</h3>
            <hr />
            <p contentEditable={canEdit? 'true': 'false'}>{details}</p>
            {canEdit? this.renderButton(): ''}
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
  fetchMedicalData: fetchMedicalData,
  editMedicalRecord: editMedicalRecord
})(RecordItem);
