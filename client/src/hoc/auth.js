// import React, { Component } from "react";
// import { connect } from "react-redux";
// import {readSessions} from "../actions/index";
//
// export default function(WrappedComponent) {
//     class Auth extends Component {
//         componentWillMount() {
//             if (!this.props.auth) {
//                 this.props.readSessions().then(()=>{
//                     console.log('we are still not authorized after calling the function ', this.props);
//                 });
//               // this.props.history.push("/");
//             }else{
//                 console.log('we are authorized ', this.props);
//             }
//         }
//         componentWillReceiveProps(nextProps) {
//             if (!nextProps.auth) {
//                 console.log('our next props are not authorized ', this.props);
//                 // this.props.history.push("/");
//             }
//         }
//         render() {
//             return <WrappedComponent {...this.props} />;
//         }
//     }
//     function mapStateToProps(state) {
//         return {
//             auth: state.sessions.auth
//         };
//     }
//     return connect(mapStateToProps, {readSessions})(Auth);
// }