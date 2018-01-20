import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { slide as Menu } from "react-burger-menu";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.showMenu = this.showMenu.bind(this);
  }
  handleOnClick(e) {
    e.preventDefault();

    console.log("hamburger menu is clicked!", this.state);

    if (!this.state.menu) {
      this.setState({
        menu: true
      });
    } else {
      this.setState({
        menu: false
      });
    }
  }

  showMenu() {
    console.log("menu will show");
    return (
      <div className="menuContainer">
        <ul className="dropdown">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>
    );
  }

  render() {
    // const toggleMenu = !this.state.menu;
    const { menu } = this.state;

    return (
      <div>
        <div className="hamburger" onClick={e => this.handleOnClick(e)}>
          <div className="burger-line" />
          <div className="burger-line" />
          <div className="burger-line" />
        </div>
        {this.state.menu ? this.showMenu() : ""}
      </div>
    );
  }
}

export default NavBar;
