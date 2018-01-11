import React, {Component} from 'react';
import Logo from '../../../../server/images/petvet_logo.png';
import './manually_add_med_note.css';
import axios from 'axios';
import { connect } from "react-redux";
import { addMedicalItem } from "../../actions/";

class AddMedNote extends Component {
    constructor(props){
        super(props);
        this.state= {
            form: {
                title: '',
                date: '',
                comment: ''
            }
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }
    handleChange(e){
        const {name, value}= e.target;
        const {form}= this.state;
        form[name]=value;
        this.setState({form: {...form}});
    }
    handleSubmit(e){
        e.preventDefault();
        const petId= this.props.match.params.id;
        this.props.addMedicalItem(petId, this.state.form);
        // const url = 'http://localhost:80/database_connect/server.php?action=post&resource=record-item';
        //
        // axios({
        //     method : 'post',
        //     url    : url,
        //     dataType: 'json',
        //     data   : {
        //         'petID': '5',
        //         'title': this.state.form.title,
        //         'type': 'hardcoded for now',
        //         'record_data': this.state.form.comment,
        //         'treatment_date': this.state.form.date,
        //     }
        // }).then((res) => {
        //     console.log(res.data);
        // });

        this.setState({
            form: {
                title: '',
                date: '',
                comment: ''
            }
        });
    }
    render(){
        // console.log('MANUAL', this.props.match.params.id)
        console.log('these are the props in MANUAL', this.props);
        const {title,date,comment}= this.state.form;
        return(
            <div>
                <div className='logoContainer'>
                    <div className='logo'></div>
                </div>
                <form className='container'>
                    <div className='form-group'>
                        <input onChange={e=> this.handleChange(e)} name='title' value={title} className='form-control input-lg' type='text' placeholder="Title"/>
                    </div>
                    <div className='form-group'>
                        <input  onChange={e=> this.handleChange(e)} name='date' value={date} className='form-control input-lg' type='date' placeholder="Date"/>
                    </div>
                    <div className='form-group'>
                        <textarea  onChange={e=> this.handleChange(e)} name='comment' value={comment} className="form-control" rows="10" placeholder="Comment"></textarea>
                    </div>
                    <div className="buttonContainer row">
                        <button type='button' className='btn btn-success' onClick={e=>this.handleSubmit(e)}>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}
//
// function mapStateToProps(state){
//     return{
//         addMedicalItem: state.addMedicalItem
//     }
// }

export default connect(null, {addMedicalItem: addMedicalItem})(AddMedNote);