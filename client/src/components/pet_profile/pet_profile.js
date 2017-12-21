import React, {Component} from 'react';
import './pet_page.css';


class PetProfile extends Component{
    render(){
        return(
            <div>
                <header>
                    <h1 className='title'>Pet to Vet</h1>
                </header>
                <div className='petInfoContainer'>
                    <div className="petImgContainer">
                    </div>
                    <div className="petInfoDiv">
                        <div className="petInfo">
                        </div>
                    </div>
                </div>
                <hr/>
                    <div className="medicalRecord">
                        <div className="recordList text-center">
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