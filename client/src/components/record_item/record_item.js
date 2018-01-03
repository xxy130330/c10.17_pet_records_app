import React, {Component} from 'react';
import PetData from '../pet_data';
import './record_item.css';

class RecordItem extends Component{
    render(){
        return(
            <div className='record_item_body'>
                <header>
                    {/*<!--<div class='logoContainer'>-->*/}
                    {/*<!--<div class='logo'></div>-->*/}
                    {/*<!--</div>-->*/}
                    <h1 className='title'>Pet to Vet</h1>
                </header>
                <div className=" record_item_container">
                    <h2 className='record_item_header'>{PetData[0].medicalRecords[0].type}</h2>
                    <h3 className='record_item_date'>{PetData[0].medicalRecords[0].date}</h3>
                    <hr/>
                    <p>{PetData[0].medicalRecords[0].details}</p>
                </div>

            </div>
        )
    }
}
export default RecordItem;