import React, {Component} from 'react';

class RecordItem extends Component{
    render(){
        return(
            <div>
                <header>
                    {/*<!--<div class='logoContainer'>-->*/}
                    {/*<!--<div class='logo'></div>-->*/}
                    {/*<!--</div>-->*/}
                    <h1 className='title'>Pet to Vet</h1>
                </header>
                <div className=" record_item_container">
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
export default RecordItem;