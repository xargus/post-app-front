import $ from 'jquery';

import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_UNREGISTERED_USER,
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

export function loginRequest(googleUser) {
    return (dispatch) => {
        console.log('Logged in as: ' + googleUser.getBasicProfile().getName());

        dispatch(login());

        console.log("login request", googleUser.getBasicProfile().getId(), googleUser.getAuthResponse().access_token);

        return $.post('http://localhost:8080/post/api/auth/login', {
            userId: googleUser.getBasicProfile().getId(),
            oauthPlatform: 'google',
            accessToken: googleUser.getAuthResponse().access_token
        })
        .done((response) => {
            var parsed = JSON.parse(response);
            console.log("login api result", response, parsed);
            if (parsed.result === 'NOT_REGISTERED_USER') {
              dispatch(unregisterUser());
            } else {
              dispatch(loginSuccess(googleUser.getBasicProfile().getName()));
            }
        }).catch((error) => {
            console.log("login fail", error);
            dispatch(loginFailure());
        });
    };
}

export function registerRequest(googleUser) {
    return (dispatch) => {
        console.log('Logged in as: ' + googleUser.getBasicProfile().getName());

        dispatch(register());

        console.log("register request", googleUser.getBasicProfile().getId(), googleUser.getAuthResponse().access_token);

        return $.post('http://localhost:8080/post/api/auth/register', {
            userId: googleUser.getBasicProfile().getId(),
            oauthPlatform: 'google',
            accessToken: googleUser.getAuthResponse().access_token
        })
        .done((response) => {
            var parsed = JSON.parse(response);
            console.log("register api result", response, parsed);
            if (parsed.result === 'SUCCESS') {
              console.log("register api result", parsed.result);
              dispatch(registerSuccess());
            } else {
              dispatch(registerFailure());
            }
        }).catch((error) => {
            console.log("register fail", error);
            dispatch(registerFailure());
        });
    };
}

export function register() {
  return {
    type: AUTH_REGISTER
  }
}

export function registerSuccess() {
  return {
    type: AUTH_REGISTER_SUCCESS
  }
}

export function registerFailure() {
  return {
    type: AUTH_REGISTER_FAILURE
  }
}

export function unregisterUser() {
  return {
    type: AUTH_UNREGISTERED_USER
  }
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
