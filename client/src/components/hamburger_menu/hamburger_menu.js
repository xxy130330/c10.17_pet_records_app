import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { switchAuthentication } from "../../actions";
// import Transition from "react-transition-group/Transition";
// import { slide as Menu } from "react-burger-menu";

class NavBar extends Component {
  constructor(props) {
    super(props);
    console.log("hamburger props:::", props);
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
      <div className={!this.state.menu ? "" : "menuContainer slideDown"}>
        <Link to="/" onClick={this.handleOnClick}>
          <div> home</div>
        </Link>
        {!this.props.vetAccessLevel ? (
          <Link to="/pet-list/" onClick={this.handleOnClick}>
            <div> pet list </div>
          </Link>
        ) : (
          <Link to="/client-list/" onClick={this.handleOnClick}>
            <div> client list </div>
          </Link>
        )}
        {!this.props.vetAccessLevel ? (
          <Link to="/add-pet/" onClick={this.handleOnClick}>
            <div> add pet </div>
          </Link>
        ) : (
          ""
        )}
        <Link to="/" onClick={() => props.switchAuthentication(false)}>
          <div> log out </div>
        </Link>
      </div>
    );
  }

  render() {
    console.log('hamburger render::', this.props);
    return (
      <div>
        <a href="#">
          <div className="backBtn" onClick={() => this.props.history.goBack()}>
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
