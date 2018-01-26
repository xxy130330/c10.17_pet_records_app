import React from "react";
import Logo from "../../../../server/images/petvet_logo.png";
import { Link } from "react-router-dom";
import NavBar from "../hamburger_menu/hamburger_menu";

export default props => {
  if (props.match.url === "/") return null;
  // console.log('header props url:', props.match.url);
  console.log("header props:::", props);

  function showNavBar() {
    switch (props.match.url) {
      case "/":
        return "";

      default:
        return <NavBar {...props} />;
    }
  }

  return <div className="header">{showNavBar()}</div>;
};
