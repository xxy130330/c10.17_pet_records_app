import React, {Component} from 'react';
import Logo from '../../assets/images/petvet_logo.png';
import './manually_add_med_note.css';

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
        console.log(this.state.form);
        this.setState({
            form: {
                title: '',
                date: '',
                comment: ''
            }
        });
    }
    render(){
        const {title,date,comment}= this.state.form;
        return(
            <div>
                <header>
                  <div className="title">
                    <img src={Logo} />
                  </div>
                </header>
                <div className='logoContainer'>
                    <div className='logo'></div>
                </div>
                <form className='container' onSubmit={e=>this.handleSubmit(e)}>
                    <div className='form-group'>
                        <input onChange={e=> this.handleChange(e)} name='title' value={title} className='form-control input-lg' type='text' placeholder="Title"/>
                    </div>
                    <div className='form-group'>
                        <input  onChange={e=> this.handleChange(e)} name='date' value={date} className='form-control input-lg' type='text' placeholder="Date"/>
                    </div>
                    <div className='form-group'>
                        <textarea  onChange={e=> this.handleChange(e)} name='comment' value={comment} className="form-control" rows="10" placeholder="Comment"></textarea>
                    </div>
                    <div className="buttonContainer row">
                        <button className='btn btn-success'>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddMedNote;