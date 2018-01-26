import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { switchAuthentication } from "../../actions";
// import Transition from "react-transition-group/Transition";
// import { slide as Menu } from "react-burger-menu";
import Logo from "../../../../server/images/petvet_logo.png";
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
  showMenu() {
    return (
      <div
        className={!this.state.menu ? "" : "outsideMenuContainer slideDown"}
        onClick={this.handleWindowClick}
      >
        <div className="menuContainer">
          {!this.props.vetAccessLevel ? (
            <Link to="/pet-list/" onClick={this.handleOnClick}>
              <div> PET LIST </div>
            </Link>
          ) : (
            <Link
              to={`/client-list/${this.props.vetId}`}
              onClick={this.handleOnClick}
            >
              <div> CLIENT LIST </div>
            </Link>
          )}
          {!this.props.vetAccessLevel ? (
            <Link to="/add-pet/" onClick={this.handleOnClick}>
              <div> ADD PET </div>
            </Link>
          ) : (
            ""
          )}
          <Link to="/about-us" onClick={this.handleOnClick}>
            <div> ABOUT US </div>
          </Link>
          <Link to="/contact-us" onClick={this.handleOnClick}>
            <div> CONTACT US </div>
          </Link>
          <Link to="/" onClick={() => this.props.switchAuthentication(false)}>
            <div> LOG OUT </div>
          </Link>
        </div>
      </div>
    );
  }
  render() {
    const showBackButton = () => {
      switch (this.props.match.url) {
        case "/pet-list/":
        case `/client-list/${this.props.vetId}`:
          return "";
        default:
          return (
            <a
              href="#"
              className="backBtn"
              onClick={() => {
                console.log("back clicked");
                this.props.history.goBack();
              }}
            >
              BACK
            </a>
          );
      }
    };

    const showHamBtn = () => {
      switch (this.props.match.url) {
        case "/parent-page/":
        case "/vet-page/":
        case "/login-page":
        case "/vet-login-page":
          return "";
        default:
          return (
            <div className="col-2">
              <div className="hamburger" onClick={this.handleOnClick}>
                <div className="burger-line" />
                <div className="burger-line" />
                <div className="burger-line" />
              </div>
            </div>
          );
      }
    };

    return (
      <div className="container">
        <div className="row align-items-center">
          <div className="col-2">{showBackButton()}</div>
          <div className="logoImgContainer col-8">
            <img className="logoImg" src={Logo} />
          </div>
          {showHamBtn()}
          {this.state.menu ? this.showMenu() : ""}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.user.auth,
    vetAccessLevel: state.vetlogin.accessLevel,
    vetId: state.vetlogin.id
  };
}

export default connect(mapStateToProps, { switchAuthentication })(NavBar);
