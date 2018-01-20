import React from "react";
import Logo from "../../../../server/images/petvet_logo.png";
import { Link } from "react-router-dom";
import {NavBar, navbar} from "../hamburger_menu/hamburger_menu";

export default props => {
  if (props.match.url === "/") return null;
  // console.log('header props url:', props.match.url);

  return (
    <div className="header">
      <Link to="/">
        <div className="title align-self-center">
          <img src={Logo} />
        </div>
      </Link>
      <NavBar {...navbar} />
    </div>
  );
};
