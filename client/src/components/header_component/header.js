import React from "react";
import Logo from "../../../../server/images/petvet_logo.png";
import { Link } from "react-router-dom";
import NavBar from "../hamburger_menu/hamburger_menu";

export default props => {
  if (props.match.url === "/") return null;
  // console.log('header props url:', props.match.url);

  function showNavBar() {
    switch (props.match.url) {
      case "/":
      case "/login-page":
      case "/vet-login-page":
      case "/parent-page/":
      case "/vet-page/":
        return "";

      default:
        return <NavBar />;
    }
  }

  return (
    <div className="header">
      <div className="title align-self-center">
        <Link to="/">
          <img src={Logo} />
        </Link>
      </div>
      {showNavBar()}
    </div>
  );
};
