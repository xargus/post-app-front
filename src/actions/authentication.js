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

import {
  LOGIN_URL,
  REGISTER_URL
} from './APIInfos';

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

        return new Promise((resolve, reject) => {
            if (auth.isSignedIn.get()) {
                console.log("currentUser : ", auth.currentUser.get().getBasicProfile().getName());
                dispatch(getStatusSuccess(auth.currentUser.get().getBasicProfile().getName(), auth.currentUser.get().getBasicProfile().getId(), auth.currentUser.get().getAuthResponse().access_token));
                resolve(true);
            } else {
                dispatch(getStatusFailure());
                resolve(false);
            }
        });
    };
}

export function loginRequest(googleUser) {
    return (dispatch) => {
        console.log('Logged in as: ' + googleUser.getBasicProfile().getName());

        dispatch(login());

        console.log("login request", googleUser.getBasicProfile().getId(), googleUser.getAuthResponse().access_token);

        return $.post(LOGIN_URL, {
            userId: googleUser.getBasicProfile().getId(),
            oauthPlatform: 'google',
            accessToken: googleUser.getAuthResponse().access_token
        })
        .done((response) => {
            var jsonResult = JSON.parse(response);
            console.log("login api result", response, jsonResult);
            if (jsonResult.result === 'NOT_REGISTERED_USER') {
              dispatch(unregisterUser());
            } else {
              dispatch(loginSuccess(googleUser.getBasicProfile().getName(), googleUser.getBasicProfile().getId(), googleUser.getAuthResponse().access_token));
            }
        }).catch((error) => {
            console.log("login fail", error);
            dispatch(loginFailure(error));
        });
    };
}

export function registerRequest(googleUser) {
    return (dispatch) => {
        console.log('Logged in as: ' + googleUser.getBasicProfile().getName());

        dispatch(register());

        console.log("register request", googleUser.getBasicProfile().getId(), googleUser.getAuthResponse().access_token);

        return $.post(REGISTER_URL, {
            userId: googleUser.getBasicProfile().getId(),
            oauthPlatform: 'google',
            accessToken: googleUser.getAuthResponse().access_token
        })
        .done((response) => {
            var jsonResult = JSON.parse(response);
            console.log("register api result", response, jsonResult);
            if (jsonResult.result === 'SUCCESS') {
              console.log("register api result", jsonResult.result);
              dispatch(registerSuccess());
            } else {
              dispatch(registerFailure());
            }
        }).catch((error) => {
            console.log("register fail", error);
            dispatch(registerFailure(error));
        });
    };
}

export function getStatus() {
    return {
        type: AUTH_GET_STATUS
    };
}

export function getStatusSuccess(userName, userId, accessToken) {
    return {
        type: AUTH_GET_STATUS_SUCCESS,
        userName,
        userId,
        accessToken
    };
}

export function getStatusFailure() {
    return {
        type: AUTH_GET_STATUS_FAILURE
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

export function registerFailure(error = '') {
  return {
    type: AUTH_REGISTER_FAILURE,
    error: error
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

export function loginSuccess(userName, userId, accessToken) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        userName,
        userId,
        accessToken
    };
}

export function loginFailure(error = '') {
    return {
        type: AUTH_LOGIN_FAILURE,
        error: error
    };
}
