import React from 'react';
import Logo from '../../../../server/images/petvet_logo.png';
import {Link} from 'react-router-dom';

export default props =>{
    return(
      <div className='header'>
          <Link to='/'>
              <div className="title"><img src={Logo}/></div>
          </Link>
      </div>

    )
}
