import React, {Component} from 'react';
import {Link} from 'react-router-dom';


export default class ParentPageModal extends Component{
    constructor(props){
        super(props);
        this.handleLoginBtn = this.handleLoginBtn.bind(this);
    }

    handleLoginBtn(){
        console.log('IN HANDLE LOG IN BTN:', this.props);
        this.props.history.push('/login-page')

    }

    message(){

        return(
            <div className="card text-center">
                <div className='card-header'>
                    PET VET
                </div>
                <div className="card-block">
                    <h4 className='card-title'>You must verify your email</h4>
                    <p className="card-text">Check your inbox and click a link to verify</p>
                </div>
                <div className="card-footer text-muted">Thank you</div>
            </div>


        )
    }

    confirmMessage(){
        return(
            <div className="card text-center">
                <div className='card-header'>
                    PET VET
                </div>
                <div className="card-block">
                    <h4 className='card-title'>You have successfully verified your account</h4>
                    <p className="card-text">Please Log In</p>
                </div>
                <div className="card-action">
                    {this.props.confirm ? <button className=' btn btn-primary text-center' onClick={this.handleLoginBtn}>Log In</button>: ''}
                </div>
                <div className="card-footer text-muted">Thank you</div>
            </div>
        )
    }


    render(){

            console.log('IN MODAL', this.props.confirm);

            console.log('IN MODAL PROPS BABY~', this.props)
            return (
                <span>

                    <div className="confirm-modal">
                        <div className="modal-content">
                            {this.props.confirm ? this.confirmMessage(): this.message() }
                        </div>
                    </div>
                </span>
            );

    }
}

