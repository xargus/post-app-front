// import axios from 'axios';
import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE,
    AUTH_GET_STATUS,
    AUTH_GET_STATUS_SUCCESS,
    AUTH_GET_STATUS_FAILURE,
    AUTH_LOGOUT
} from './ActionTypes';

export function logoutRequest(auth) {
    return (dispatch) => {

        return auth.signOut().then(dispatch(logout()));
    };
}

export function logout() {
    return {
        type: AUTH_LOGOUT
    };
}

export function getStatusRequest(auth) {
    return (dispatch) => {
        dispatch(getStatus());

        console.log("logged in : ", auth.isSignedIn.get());

        if (auth.isSignedIn.get()) {
            console.log("currentUser : ", auth.currentUser.get().getBasicProfile().getName());
            dispatch(getStatusSuccess(auth.currentUser.get().getBasicProfile().getName()));
        } else {
            dispatch(getStatusFailure());
        }
    };
}

export function getStatus() {
    return {
        type: AUTH_GET_STATUS
    };
}

export function getStatusSuccess(username) {
    return {
        type: AUTH_GET_STATUS_SUCCESS,
        username
    };
}

export function getStatusFailure() {
    return {
        type: AUTH_GET_STATUS_FAILURE
    };
}

export function registerRequest(username, password) {
    return (dispatch) => {
        // Inform Register API is starting
        dispatch(register());

        return Promise.resolve(dispatch(registerSuccess()));
        // return axios.post('/api/account/signup', { username, password })
        // .then((response) => {
        //     dispatch(registerSuccess());
        // }).catch((error) => {
        //     dispatch(registerFailure(error.response.data.code));
        // });
    };
}

export function register() {
    return {
        type: AUTH_REGISTER
    };
}

export function registerSuccess() {
    return {
        type: AUTH_REGISTER_SUCCESS,
    };
}

export function registerFailure(error) {
    return {
        type: AUTH_REGISTER_FAILURE,
        error
    };
}

export function loginRequest(googleUser) {
    return (dispatch) => {
        console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
        
        dispatch(login());

        return Promise.resolve(dispatch(loginSuccess(googleUser.getBasicProfile().getName())));

        // API REQUEST
        // return axios.post('/api/account/signin', { username, password })
        // .then((response) => {
        //     // SUCCEED
        //     dispatch(loginSuccess(username));
        // }).catch((error) => {
        //     // FAILED
        //     dispatch(loginFailure());
        // });
    };
}

export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(username) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        username
    };
}

export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}