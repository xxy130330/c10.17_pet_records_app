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
            <Link to={`/client-list/${this.props.vetId}`} onClick={this.handleOnClick}>
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
    console.log("hamburger props:::::", this.props);
    return (
      <div className="container">
        <div className="row align-items-center">
          <div className="col-2">
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
          </div>
          {/* <div className="col-8"> */}
          {/* <div className="title"> */}
          <Link className="logoImgContainer col-8" to="/">
            <img className="logoImg" src={Logo} />
          </Link>
          {/* </div> */}
          {/* </div> */}

          <div className="col-2">
            <div className="hamburger" onClick={this.handleOnClick}>
              <div className="burger-line" />
              <div className="burger-line" />
              <div className="burger-line" />
            </div>
          </div>
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
