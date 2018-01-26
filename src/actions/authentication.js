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
    AUTH_GET_STATUS_NONE,
    AUTH_LOGOUT
} from './ActionTypes';

import {
  LOGIN_URL,
  REGISTER_URL
} from './APIInfos';

import {AUTH_GOOGLE, AUTH_NAVER} from '../containers/Login';


function AuthModel(userId, userName, accessToken, authType) {
    this.userId = userId;
    this.userName = userName;
    this.accessToken = accessToken;
    this.authType = authType;
}

function getAuthModel(authType) {
    var model;
    if (authType === AUTH_GOOGLE) {
        model = new AuthModel(window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getId(),
                              window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getName(),
                              window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token,
                              authType);
    } else if (authType === AUTH_NAVER) {
        model = new AuthModel(window.naverLogin.user.getId(),
                          window.naverLogin.user.getName(),
                          window.naverLogin.accessToken.accessToken,
                          authType);
    }

    return model;
}

export function logoutRequest() {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            var authType = window.getCookie("authType")
            console.log('componentDidMount() cookie authType', authType);

            if (authType === AUTH_GOOGLE) {
                window.gapi.auth2.getAuthInstance().signOut().then(() => {
                    document.cookie = "authType=;";
                    dispatch(logout());
                    resolve(true);
                });
            } else if (authType === AUTH_NAVER) {
                window.naverLogin.logout();
                dispatch(logout());
                resolve(true);
            } else {
              dispatch(logout());
              resolve(true);
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
    				console.log('getStatusRequest() cookie authType', authType);

    				if (authType === AUTH_GOOGLE) {
    						window.addEventListener('google-loaded', function(){
                  var model = getAuthModel(authType);
                  if (model === undefined) {
                      dispatch(getStatusFailure());
                      resolve(false);
                      return;
                  }

                  dispatch(getStatusSuccess(model.userName, model.userId, model.accessToken, authType));
                  resolve(true);
                });
    				} else if (authType === AUTH_NAVER) {
              window.addEventListener('load', function () {
                  window.naverLogin.getLoginStatus(function (status) {
                    if (status) {
                      var model = getAuthModel(authType);
                      if (model === undefined) {
                          dispatch(getStatusFailure());
                          resolve(false);
                          return;
                      }

                      console.log("naver getStatus login!!", model.userName);
                      dispatch(getStatusSuccess(model.userName, model.userId, model.accessToken, authType));
                      resolve(true);
                    } else {
                      dispatch(getStatusFailure());
                      resolve(false);
                    }
                  });
              });
            } else {
              dispatch(getStatusNone());
              resolve(false);
            }
        });
    };
}

export function loginRequest(authType) {
    return (dispatch) => {
        dispatch(login());

        console.log("login request", authType);

        document.cookie = "authType="+authType;
        var model = getAuthModel(authType);
        if (model === undefined) {
          dispatch(loginFailure());
          return;
        }

        return $.post(LOGIN_URL, {
            userId: model.userId,
            oauthPlatform: model.authType,
            accessToken: model.accessToken
        })
        .done((response) => {
            var jsonResult = JSON.parse(response);
            console.log("login api result", response, jsonResult);
            if (jsonResult.result === 'NOT_REGISTERED_USER') {
              dispatch(unregisterUser());
            } else {
              dispatch(loginSuccess(model.userName, model.userId, model.accessToken, model.authType));
            }
        }).catch((error) => {
            console.log("login fail", error);
            dispatch(loginFailure(error));
        });
    };
}

export function registerRequest(authType) {
    return (dispatch) => {
        dispatch(register());

        console.log("register request", authType);
        var model = getAuthModel(authType);
        if (model === undefined) {
          return new Promise((resolve, reject) => {
            dispatch(registerFailure());
            resolve(false);
          });
        }

        return $.post(REGISTER_URL, {
            userId: model.userId,
            oauthPlatform: model.authType,
            accessToken: model.accessToken
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

export function getStatusNone() {
    return {
        type: AUTH_GET_STATUS_NONE
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
