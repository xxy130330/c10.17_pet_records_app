import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { slide as Menu } from "react-burger-menu";

// create classNamees
class NavBar extends Component({
    render(){
      return(
        <div className="hamburger">
      <div className="burger-line"></div>
      <div className="burger-line"></div>
      <div className="burger-line"></div>
    </div>
      );
    }
  })

export default NavBar;
