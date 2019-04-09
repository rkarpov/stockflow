import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Portfolio from './portfolio'
const msp = (state) => {
    return {
        currentUser: state.entities.users[state.session.id],
        formType: "Sign In",
        credentials: { email: '', password: '' },
        // loginErrors: errors.session,
        // errors: errors.session,
    }
}

const mdp = dispatch => {
    return ({
        logout: () => dispatch(logout()),
    })
}

export default connect(msp, mdp)(Portfolio)

