import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
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
        processForm: (user) => dispatch(login(user))
    })
}

export default connect(msp, mdp)(Portfolio)

