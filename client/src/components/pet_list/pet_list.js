import React, {Component} from 'react';
import './new_pet_list_styles.css';

class PetList extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <header>
                    <h1 className='title'>Pet to Vet</h1>
                </header>
                <div className='petListContainer'>
                    <h1 className='petListTitle'>Pet List</h1>
                    <div className='usersPetContainer'>
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

export default PetList;