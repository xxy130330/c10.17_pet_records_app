import React, { Component } from "react";
import { connect } from "react-redux";

export default function(WrappedComponent) {
  class Auth extends Component {
    componentWillMount() {
      console.log("componentwillmouth auth");
      if (!this.props.auth) {
        this.props.history.push("/");
      }
    }

    componentWillReceiveProps(nextProps) {
      if (!nextProps.auth) {
        console.log("componentwillreceiveprops auth:::", nextProps);
        this.props.history.push("/");
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  function mapStateToProps(state) {
    return {
      auth: state.user.auth
    };
  }
  return connect(mapStateToProps)(Auth);
}
