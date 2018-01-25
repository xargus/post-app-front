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

import {AUTH_GOOGLE} from '../containers/Login';

export function logoutRequest() {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            var authType = window.getCookie("authType")
            console.log('componentDidMount() cookie authType', authType);

            if (authType === AUTH_GOOGLE) {
                window.gapi.auth2.getAuthInstance().signOut().then(() => {
                    dispatch(logout());
                    resolve(true);
                });
            }
        });
    };
}

export function logout() {
    return {
        type: AUTH_LOGOUT
    };
}

export function getStatusRequest() {
    return (dispatch) => {
        dispatch(getStatus());

        return new Promise((resolve, reject) => {
            var authType = window.getCookie("authType")
    				console.log('componentDidMount() cookie authType', authType);

    				if (authType === AUTH_GOOGLE) {
    						if (window.gapi === undefined) {
    								window.triggerGoogleLoaded();
    						}
    						window.addEventListener('google-loaded', function(){
                  var user = window.gapi.auth2.getAuthInstance().currentUser.get();
                  if (user !== undefined && user.getBasicProfile() !== undefined) {
                      console.log("currentUser : ", user);
                      dispatch(getStatusSuccess(user.getBasicProfile().getName(), user.getBasicProfile().getId(), user.getAuthResponse().access_token, authType));
                      resolve(true);
                  } else {
                      dispatch(getStatusFailure());
                      resolve(false);
                  }
                });
    				}
        });
    };
}

export function loginRequest(userId, userName, accessToken, authType) {
    return (dispatch) => {
        console.log('Logged in as: ' + userName);

        dispatch(login());

        console.log("login request", userId, authType);

        return $.post(LOGIN_URL, {
            userId: userId,
            oauthPlatform: authType,
            accessToken: accessToken
        })
        .done((response) => {
            var jsonResult = JSON.parse(response);
            console.log("login api result", response, jsonResult);
            if (jsonResult.result === 'NOT_REGISTERED_USER') {
              dispatch(unregisterUser());
            } else {
              dispatch(loginSuccess(userName, userId, accessToken, authType));
            }
        }).catch((error) => {
            console.log("login fail", error);
            dispatch(loginFailure(error));
        });
    };
}

export function registerRequest(userId, accessToken, authType) {
    return (dispatch) => {
        dispatch(register());

        console.log("register request", userId, authType);

        return $.post(REGISTER_URL, {
            userId: userId,
            oauthPlatform: authType,
            accessToken: accessToken
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

export function getStatusSuccess(userName, userId, accessToken, authType) {
    return {
        type: AUTH_GET_STATUS_SUCCESS,
        userName,
        userId,
        accessToken,
        authType
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

export function loginSuccess(userName, userId, accessToken, authType) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        userName,
        userId,
        accessToken,
        authType
    };
}

export function loginFailure(error = '') {
    return {
        type: AUTH_LOGIN_FAILURE,
        error: error
    };
}
