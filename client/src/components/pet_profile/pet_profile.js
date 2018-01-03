import React, {Component} from 'react';
import './pet_page.css';
import PetData from '../pet_data';
import {Link} from 'react-router-dom';


class PetProfile extends Component{
    constructor(props){
        super(props);

        this.state={
            petObject: PetData,
            petId: this.props.match.params.id
        };
    }
    getPetInfo(){
        const {petId}= this.state;
        console.log('pet object', this.props);
        console.log('this is the pet\s id', petId);
        console.log('this is us trying to log petId',this.props.data[parseInt(petId)]);
        const petImage= {
            backgroundImage: `url(${this.props.data[petId].avatar})`
        };
        console.log('this is dog image', petImage);
        return(
            <div className='petInfoContainer'>
                <div className="petImgContainer">
                    <div className='petImg' style={petImage}></div>
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
    listMedicalRecords(){
        const {petId}=this.state;
        const medicalRecordsList= this.props.data[petId].medicalRecords.map((item,index)=>{
            console.log('this is the item for medical record items', item.type);
            return(
                <div className='recordContainer'>
                    <h3 key={index}><Link to={'/pet-profile/'+petId+'/record-item/'+index}>{item.type}</Link></h3>
                </div>
            )
        });
        return medicalRecordsList;
    }
    render(){
        console.log(this.props);
        return(
            <div className='pet_page_body'>
                <header>
                    <h1 className='title'>Pet to Vet</h1>
                </header>
                {this.getPetInfo()}
                <hr/>
                <div className="medicalRecord">
                    <div className="recordList text-center">
                        {this.listMedicalRecords()}
                    </div>
                </div>
            </div>
        )
    }
}
export default PetProfile;
