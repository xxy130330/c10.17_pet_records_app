import React, {Component} from 'react';
import './pet_page.css';
import PetData from '../pet_data';
import {Link} from 'react-router-dom';


class PetProfile extends Component{
    constructor(props){
        super(props);

        this.state={
            petObject: PetData
        };
    }
    getPetInfo(){
        const petId= this.props.match.params.id;
        console.log('pet object', this.props);
        console.log('this is the pet\s id', petId);
        debugger;
        console.log('this is us trying to log petId',this.props.data[parseInt(petId)]);
        const dogImage= {
            backgroundImage: `url(${this.props.data[petId].avatar})`
        };
        console.log('this is dog image', dogImage);
        return(
            <div className='petInfoContainer'>
                <div className="petImgContainer">
                    <div className='petImg' style={dogImage}></div>
                </div>
                <div className="petInfoDiv">
                    <div className="petInfo">
                        <h4>Name: {this.props.data[petId].name}</h4>
                        <h4>DOB: {this.props.data[petId].dob}</h4>
                        <h4>Breed: {this.props.data[petId].breed}</h4>
                    </div>
                </div>
            </div>
            )
    }
    render(){
        console.log(this.props);
        const {petObject}= this.state;
        return(
            <div className='pet_page_body'>
                <header>
                    <h1 className='title'>Pet to Vet</h1>
                </header>
                {this.getPetInfo()}
                <hr/>
                <div className="medicalRecord">
                    <div className="recordList text-center">
                        <div className='recordContainer'>
                            <h3 className=''><Link to ='/record-item'>{this.props.data[0].medicalRecords[0].type}</Link></h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default PetProfile;
