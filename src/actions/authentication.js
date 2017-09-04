import $ from 'jquery';

import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
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

export function loginRequest(googleUser) {
    return (dispatch) => {
        console.log('Logged in as: ' + googleUser.getBasicProfile().getName());

        dispatch(login());

        return $.post('/post/api/register', {
            userId: googleUser.getBasicProfile().getId(), 
            oauthPlatform: 'google',  
            accessToken: googleUser.getAuthResponse().access_token
        })
        .done((response) => {
            console.log("register api result", response);
            dispatch(loginSuccess(googleUser.getBasicProfile().getName()));
        }).catch((error) => {
            console.log("register fail", error);
            dispatch(loginFailure());
        });
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