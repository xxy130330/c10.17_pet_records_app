import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { switchAuthentication } from "../../actions";

const Footer = props => {
  if (props.match.url === "/" || props.match.url === "/login-page") return null;

  return (
    <footer>
      <div className="iconNav">
        <a href="#">
          <span
            className="glyphicon glyphicon-chevron-left"
            onClick={() => props.history.goBack()}
          />
        </a>
      </div>
      <div className="iconNav">
        <Link to="/">
          <span
            onClick={() => props.switchAuthentication(false)}
            className="glyphicon glyphicon-comment"
          />
        </Link>
      </div>
      <div className="iconNav">
        <Link to="/add-pet/">
          <span className="glyphicon glyphicon-plus" />
        </Link>
      </div>
      <div className="iconNav">
        <Link to="/pet-list/">
          <span className="glyphicon glyphicon-home" />
        </Link>
      </div>
    </footer>
  );
};
function mapStateToProps(state) {
  return {
    auth: state.user.auth
  };
}

export default connect(mapStateToProps, { switchAuthentication })(Footer);
