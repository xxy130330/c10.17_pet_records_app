import React from 'react';


export function ShowModal(self, onDelete){
    console.log('this is refering to keyword this and pet index ', self.state.petIndex);
    console.log('this is what onDelete is ', onDelete);
    return(
        <span>
          <div className='confirm-modal '>
              <div className="content-modal">
                  <div className="card">
                      <div className="card-content">
                          "Hello"
                      </div>
                      <div className="card-action">
                          <button onClick={()=> self.setState({...self.state, confirmDelete: true})} className='btn btn-outline-success'>Confirm</button>
                          <button onClick={()=> self.setState({...self.state, showModal: false})} className='btn btn-outline-danger'>Cancel</button>
                      </div>
                  </div>
              </div>
          </div>
        </span>
    )
}





