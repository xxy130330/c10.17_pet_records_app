import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateSessions, readSessions } from "../../actions";
import Logo from "../../../../server/images/petvet_logo.png";
import ReactDOM from "react-dom";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.handleWindowClick = this.handleWindowClick.bind(this);

    this.state = {
      menu: false
    };
  }
  componentWillMount(){
      this.props.readSessions().then(()=>{
          console.log('this is the current auth', this.props);
          // if(!this.props.auth){
          //     this.props.history.push('/');
          // }
      });
  }

  handleWindowClick() {
    this.setState({
      menu: false
    });
  }

  handleOnClick() {
    let menuState = !this.state.menu;
    this.setState({
      menu: menuState
    });
  }
  handleLogout(){
      const auth = false;
      const logout = true;
      //hard coded id cus it doesnt matter
      const {id}= 1;
      this.props.updateSessions(id, auth, logout).then(()=>{
          this.props.readSessions().then(()=>{
              localStorage.removeItem('auth');
              console.log('these are the props after logging out', this.props);
          });
      })
  }
  showMenu() {
    return (
      <div
        className={!this.state.menu ? "" : "outsideMenuContainer slideDown"}
        onClick={this.handleWindowClick}
      >
        <div className="menuContainer">
          {!this.props.vetAccess ? (
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
          {!this.props.vetAccess ? (
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
          <Link to="/" onClick={()=>this.handleLogout()}>
            <div> LOG OUT </div>
          </Link>
        </div>
      </div>
    );
  }

  render() {
    const showBackButton = () => {
      switch (this.props.match.url) {
        case "/login-page":
        case "/vet-login-page":
        case "/pet-list/":
        case `/client-list/${this.props.vetId}`:
          return "";
        default:
          return (
            <a
              href="#"
              className="backBtn"
              onClick={() => {this.props.history.goBack()}}
            >
              BACK
            </a>
          );
      }
    };

    const showHamBtn = () => {
      switch (this.props.match.url) {
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
      id: state.login.id,
      auth: state.sessions.auth,
      vetAccess: state.sessions.vetAccess,
      vetId: state.sessions.id,
  };
}

export default connect(mapStateToProps,  {readSessions, updateSessions} )(NavBar);
