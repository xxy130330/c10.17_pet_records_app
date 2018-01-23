import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { switchAuthentication } from "../../actions";
// import Transition from "react-transition-group/Transition";
// import { slide as Menu } from "react-burger-menu";
import ReactDOM from "react-dom";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.handleWindowClick = this.handleWindowClick.bind(this);
    // this.handleWindowClick = this.handleWindowClick.bind(this);
    // this.removeWindowClick = this.removeWindowClick.bind(this);

    this.state = {
      menu: false
    };

    console.log("click on body::::", event);
  }

  handleWindowClick() {
    this.setState({
      menu: false
    });
  }

  handleOnClick() {
    let menuState = !this.state.menu;
    // this.handleWindowClick();
    this.setState({
      menu: menuState
    });
  }
  // handleWindowClick() {
  //   document.addEventListener(
  //     "click",
  //     this.handleClickOutside.bind(this),
  //     true
  //   );
  // }
  // removeWindowClick() {
  //   console.log("removewindowclick::::", this);
  //   document.removeEventListener(
  //     "click",
  //     this.handleClickOutside.bind(this),
  //     true
  //   );
  //   this.setState({
  //     menu: false
  //   });
  // }

  // handleClickOutside(event) {
  //   // const windowDom = ReactDOM.findDOMNode(this);
  //   const windowDom = this.node;

  //   if (!windowDom || !windowDom.contains(event.target)) {
  //     console.log('this is the menu::::', this.node);
  //     console.log('window outsideeeee::::', windowDom, event.target);
  //     this.removeWindowClick();
  //   }
  // }
  showMenu() {
    return (
      <div
        className={!this.state.menu ? "" : "outsideMenuContainer slideDown"}
        onClick={this.handleWindowClick}
      >
        <div className="menuContainer">
          <Link to="/" onClick={this.handleOnClick}>
            <div> Home</div>
          </Link>
          {!this.props.vetAccessLevel ? (
            <Link to="/pet-list/" onClick={this.handleOnClick}>
              <div> Pet List </div>
            </Link>
          ) : (
            <Link to="/client-list/:vetId" onClick={this.handleOnClick}>
              <div> Client List </div>
            </Link>
          )}
          {!this.props.vetAccessLevel ? (
            <Link to="/add-pet/" onClick={this.handleOnClick}>
              <div> Add Pet </div>
            </Link>
          ) : (
            ""
          )}
          <Link to="/about-us" onClick={this.handleOnClick}>
            <div> About Us </div>
          </Link>
          <Link to="/about-us" onClick={this.handleOnClick}>
            <div> Contact Us </div>
          </Link>
          <Link to="/" onClick={() => this.props.switchAuthentication(false)}>
            <div> Log Out </div>
          </Link>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div>
        <a href="#">
          <div className="backBtn" onClick = {() => this.props.history.goBack()}>
            BACK
          </div>
        </a>
        <div>
          <div className="hamburger" onClick={this.handleOnClick}>
            <div className="burger-line" />
            <div className="burger-line" />
            <div className="burger-line" />
          </div>
        </div>
        {this.state.menu ? this.showMenu() : ""}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.user.auth,
    vetAccessLevel: state.vetlogin.accessLevel
  };
}

export default connect(mapStateToProps, { switchAuthentication })(NavBar);
