import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { switchAuthentication } from "../../actions";
// import Transition from "react-transition-group/Transition";
// import { slide as Menu } from "react-burger-menu";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.state = {
      menu: false
    };
  }

  handleOnClick() {
    console.log("hamburger menu is clicked!", this.state);

    let menuState = !this.state.menu;
    this.setState({
      menu: menuState
    });
  }

  showMenu() {
    console.log("menu will show");

    return (
      <div className="">
        <div
          className={
            !this.state.menu
              ? ""
              : "menuContainer slideDown"
          }
        >
          
            <Link to="/">
              <div> home</div>
            </Link>
            <Link to="/pet-list/">
              <div> pet list </div>
            </Link>
            <Link to="/add-pet/">
              <div> add pet </div>
            </Link>
            <Link to="/" onClick={() => props.switchAuthentication(false)}>
              <div> log out </div>
            </Link>
          
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="hamburger" onClick={this.handleOnClick}>
          <div className="burger-line" />
          <div className="burger-line" />
          <div className="burger-line" />
        </div>
        {this.state.menu ? this.showMenu() : ""}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.user.auth
  };
}

export default connect(mapStateToProps, { switchAuthentication })(NavBar);
