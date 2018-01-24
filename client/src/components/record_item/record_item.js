import React, { Component } from "react";

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
            details: null,
            form: {
                editType: '',
                editDate: '',
                editDetails: ''
            }
        }
    }

  componentWillMount() {
    console.log('the props upon mount: ', this.props);
    this.props.fetchMedicalData(this.props.match.params.recordId).then(()=>{
        this.setState({
            canEdit: false,
            type: this.props.petMedical[0].type,
            date: this.props.petMedical[0].date,
            details: this.props.petMedical[0].details,
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
      console.log('this is the current state after clicking save changes', this.state.form);

      this.props.editMedicalRecord(this.state.form, params).then(()=>{
          this.props.fetchMedicalData(params.recordId).then(()=>{
              if(!this.props.petMedical) return <h1>Loading</h1>;
              this.setState({
                  type: this.props.petMedical[0].type,
                  date: this.props.petMedical[0].date,
                  details: this.props.petMedical[0].details,
              })
          })
      });

  }
  handleChange(e){
      const {value, name}= e.target;
      const {form} = this.state;
      form[name]= value;
      this.setState({form: {...form}});
      console.log(e.target.value);
  }
  render() {
    if (!this.props.petMedical.length) {
      return <h1>Loading</h1>;
    }
      const {type,date,details,canEdit}= this.state;
     const {editType, editDate, editDetails} =this.state.form;
      const staticData = (
          <div>
              <div>
                  <button onClick={()=>this.handleEditClick()}
                          className='btn btn-warning editBtn'
                          style={this.props.vetAccessLevel? {'display':'none'}: {'display':'inline-block'}}
                  >Edit</button>
              </div>
              <h2 className="record_item_header">{type}</h2>
              <h3 className="record_item_date" >{date}</h3>
              <hr />
              <p className="record_item_detail">{details}</p>
          </div>

      );
      const editData =(
          <form>
              <div className='form-group'>
                  <label htmlFor=""></label>
                  <input onChange={(e)=>this.handleChange(e)} type= 'text' name='editType' value ={editType} className="record_item_header"></input>
              </div>
              <div>
                  <label htmlFor="">Date</label>
                  <input onChange={(e)=>this.handleChange(e)}  type ='date' name='editDate' value ={editDate} className="record_item_date"></input>
              </div>
              <hr />
              <div className="form-group">
                  <label htmlFor="">Details</label>
                  <input onChange={(e)=>this.handleChange(e)} type='text' name='editDetails' value ={editDetails}></input>
              </div>
          </form>
      );
      const viewData= canEdit? editData: staticData;
      return (

        <div className="bodyContainer">
            {viewData}
            {canEdit? this.renderButton(): ''}
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    petMedical: state.petMedical,
      vetAccessLevel: state.vetlogin.accessLevel
  };
}

export default connect(mapStateToProps, {
  fetchMedicalData: fetchMedicalData,
  editMedicalRecord: editMedicalRecord
})(RecordItem);
