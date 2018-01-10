import React from "react";
import {Link} from 'react-router-dom';


const Footer = (props) => {



  if(props.match.url === '/' || props.match.url === '/login-page') return null;

  return (
    <footer>
      <div className="iconNav">
        <a href="#">
          <span className="glyphicon glyphicon-chevron-left" onClick={()=>props.history.goBack()}/>
        </a>
      </div>
      <div className="iconNav">
        <Link to="/add-med-note/">
          <span className="glyphicon glyphicon-comment" />
        </Link>
      </div>
      <div className="iconNav">
        <Link to="/add-pet/">
          <span className="glyphicon glyphicon-plus" />
        </Link>
      </div>
      <div className="iconNav">
        <Link to="/pet-list/">
          <span className="glyphicon glyphicon-home" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
