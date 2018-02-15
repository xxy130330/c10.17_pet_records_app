import React, { Component } from "react";
import { connect } from "react-redux";
import {readSessions} from "../actions/index";

export default function(WrappedComponent) {
    class Auth extends Component {
        componentWillMount() {
            console.log('before everything in auth', this.props.auth);
            if (!this.props.auth) {
                this.props.readSessions().then(()=>{
                    console.log('we are still not authorized after calling the function ', this.props);
                });
              this.props.history.push("/");
            }else{
                this.props.readSessions().then(()=>{
                    console.log('else part!!!', this.props.id);
                })

            }
        }
        componentWillReceiveProps(nextProps) {
            if (!nextProps.auth) {
                console.log('our next props are not authorized ', this.props);
                // this.props.history.push("/");
            }
        }
        render() {
            return <WrappedComponent {...this.props} />;
        }
    }
    function mapStateToProps(state) {
        return {
            auth: state.sessions.auth,
            id: state.sessions.id
        };
    }
    return connect(mapStateToProps, {readSessions})(Auth);
}
