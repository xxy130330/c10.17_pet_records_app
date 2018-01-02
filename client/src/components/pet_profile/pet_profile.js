import React, {Component} from 'react';
import './pet_page.css';
import PetData from '../pet_data';
import {Link} from 'react-router-dom';




class PetProfile extends Component{
    constructor(props){
        super(props);

        this.state={
            petObject: PetData
        }
    }
    listMedicalRecords(){
        return(
            // this.state.petObject[0]
            <div className='recordContainer'>
                <h3 className=''><Link to ='/record-item'>{[0].medicalRecords[0].type}</Link></h3>
            </div>
            )

    }
    render(){
        const {petObject}= this.state;
        const dogImage= {
            backgroundImage: `url(${petObject[0].avatar})`
        };
        return(
            <div className='pet_page_body'>
                <header>
                    <h1 className='title'>Pet to Vet</h1>
                </header>
                <div className='petInfoContainer'>
                    <div className="petImgContainer">
                        <div className='petImg' style={dogImage}></div>
                    </div>
                    <div className="petInfoDiv">
                        <div className="petInfo">
                            <h4>Name: {petObject[0].name}</h4>
                            <h4>DOB: {petObject[0].dob}</h4>
                            <h4>Breed: {petObject[0].breed}</h4>
                        </div>
                    </div>
                </div>
                <hr/>
                    <div className="medicalRecord">
                        <div className="recordList text-center">
                            {this.listMedicalRecords()}
                        </div>
                    </div>
                    <footer>
                        <div className='iconNav'>
                            <a href="#"><span className="glyphicon glyphicon-home"></span></a>
                        </div>
                        <div className='iconNav'>
                            <a href="#"><span className="glyphicon glyphicon-calendar"></span></a>
                        </div>
                        <div className='iconNav'>
                            <a href="#"><span className="glyphicon glyphicon-folder-open"></span></a>
                        </div>
                        <div className='iconNav'>
                            <a href="#"><span className="glyphicon glyphicon-plus"></span></a>
                        </div>
                    </footer>
            </div>
        )
    }
}
export default PetProfile;
