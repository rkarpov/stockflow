import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import SessionForm from './session_form';

const msp = ({ errors }) => {
    return {
        formType: "Sign In",
        credentials: { email: '', password: '' },
        // loginErrors: errors.session,
        errors: errors.session,
    }
}

const mdp = dispatch => {
    return ({
        processForm: (user) => dispatch(login(user))
    })
}

export default connect(msp, mdp)(SessionForm)