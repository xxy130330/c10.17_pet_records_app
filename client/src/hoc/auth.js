// import React, { Component } from "react";
// import { connect } from "react-redux";
// import {readSessions} from "../actions/index";
//
// export default function(WrappedComponent) {
//     class Auth extends Component {
//         componentWillMount() {
//             this.props.readSessions().then(()=>{
//                 console.log('this is the current auth level and props ', this.props);
//                 if (this.props.auth) {
//                     localStorage.setItem('auth', true);
//                 }else{
//                     console.log('we are not authorized to access this ', this.props);
//                     this.props.history.push("/");
//                 }
//             })
//
//         }
//         componentWillReceiveProps(nextProps) {
//             if (!nextProps.auth) {
//                 console.log('our next props are not authorized ', this.props);
//                 this.props.history.push("/");
//             }
//         }
//         render() {
//             return <WrappedComponent newSessionId= {this.props.sessionId} {...this.props} />;
//         }
//     }
//     function mapStateToProps(state) {
//         return {
//             auth: state.sessions.auth,
//             sessionId: state.sessions.id,
//             vetAccess: state.sessions.vetAccess
//         };
//     }
//     return connect(mapStateToProps, {readSessions})(Auth);
// }