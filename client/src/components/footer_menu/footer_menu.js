import React from "react";
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="iconNav">
        <Link to="/">
          <span className="glyphicon glyphicon-home" />
        </Link>
      </div>
      <div className="iconNav">
        <a href="#">
          <span className="glyphicon glyphicon-calendar" />
        </a>
      </div>
      <div className="iconNav">
        <a href="#">
          <span className="glyphicon glyphicon-folder-open" />
        </a>
      </div>
      <div className="iconNav">
        <a href="#">
          <span className="glyphicon glyphicon-plus" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
