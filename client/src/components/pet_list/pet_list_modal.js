import React, {Component} from 'react';
import '../assets/css/modal.css';
class PetListModal extends Component{
    constructor(props){
        super(props);
        this.state= {
            visible: false
        };
        this.handleConfirm=this.handleConfirm.bind(this);
    }
    handleConfirm(){
        this.props.callback();
        this.setState({
            visible: false
        })
    }
    render(){
        // console.log('modal props', this.props);
        const button= <button onClick={()=>this.setState({visible:true})} className={this.props.className? this.props.className: 'btn'}>
            {this.props.children? this.props.children: 'click me'};
        </button>;
        if(this.state.visible){
            return(
                <span>
                    {button}
                    <div className='confirm-modal '>
                        <div className="content-modal">
                            <div className="card">
                                <div className="card-content">
                                    {this.props.text}
                                </div>
                                <div className="card-action">
                                    <button onClick={this.handleConfirm} className='btn green'>Confirm</button>
                                    <button onClick={()=>this.setState({visible: false})} className='btn red'>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </span>
            )
        }
        return(
            button
        )
    }
}
export default PetListModal;