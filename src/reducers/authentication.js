import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    status: {
        status: 'INIT',
        error: '',
        isLoggedIn: false
    },
    userInfo: {
      userName: '',
      userId: '',
      accessToken: '',
      authType: '',
    }
};

export default function authentication(state, action) {
    if(typeof state === "undefined")
        state = initialState;

    switch(action.type) {
        /* LOGIN */
        case types.AUTH_LOGIN:
            return update(state, {
                status: {
                    status: { $set: 'LOGIN_WAITING' },
                    isLoggedIn: { $set: false },
                    error: { $set: '' }
                },
                userInfo: {
                  userName: { $set : ''},
                  userId: { $set : ''},
                  accessToken: { $set : ''},
                  authType: { $set: ''}
                }
            });
        case types.AUTH_LOGIN_SUCCESS:
            return update(state, {
                status: {
                    status: { $set: 'LOGIN_SUCCESS' },
                    isLoggedIn: { $set: true },
                    error: { $set: '' }
                },
                userInfo: {
                    userName: { $set : action.userName },
                    userId: { $set : action.userId },
                    accessToken: { $set : action.accessToken },
                    authType: { $set : action.authType}
                }
            });
        case types.AUTH_LOGIN_FAILURE:
            return update(state, {
                status: {
                    status: { $set: 'LOGIN_FAILURE' },
                    isLoggedIn: { $set: false },
                    error: { $set: '' }
                },
                userInfo: {
                  userName: { $set : ''},
                  userId: { $set : ''},
                  accessToken: { $set : ''},
                  authType: { $set: ''}
                }
            });
        case types.AUTH_UNREGISTERED_USER:
            return update(state, {
                status: {
                    status: { $set: 'UNREGISTERED_USER' },
                    isLoggedIn: { $set: false },
                    error: { $set: '' }
                },
                userInfo: {
                  userName: { $set : ''},
                  userId: { $set : ''},
                  accessToken: { $set : ''},
                  authType: { $set: ''}
                }
            });

        case types.AUTH_REGISTER:
            return update(state, {
                status: {
                    status: { $set: 'REGISTER_WAITING' },
                    isLoggedIn: { $set: false },
                    error: { $set: '' }
                },
                userInfo: {
                  userName: { $set : ''},
                  userId: { $set : ''},
                  accessToken: { $set : ''},
                  authType: { $set: ''}
                }
            });
        case types.AUTH_REGISTER_SUCCESS:
            return update(state, {
                status: {
                    status: { $set: 'REGISTER_SUCCESS' },
                    isLoggedIn: { $set: false },
                    error: { $set: '' }
                },
                userInfo: {
                  userName: { $set : ''},
                  userId: { $set : ''},
                  accessToken: { $set : ''},
                  authType: { $set: ''}
                }
            });
        case types.AUTH_REGISTER_FAILURE:
            return update(state, {
                status: {
                    status: { $set: 'REGISTER_FAILURE' },
                    isLoggedIn: { $set: false },
                    error: { $set: action.error }
                },
                userInfo: {
                  userName: { $set : ''},
                  userId: { $set : ''},
                  accessToken: { $set : ''},
                  authType: { $set: ''}
                }
            });

        case types.AUTH_GET_STATUS_NONE:
            return update(state, {
                status: {
                    status: { $set: 'STATUS_NONE'},
                    isLoggedIn: { $set: false },
                    error: { $set: '' }
                },
                userInfo: {
                  userName: { $set : ''},
                  userId: { $set : ''},
                  accessToken: { $set : ''},
                  authType: { $set: ''}
                }
            });
        case types.AUTH_GET_STATUS:
            return update(state, {
                status: {
                    status: { $set: 'STATUS_WATTING'},
                    isLoggedIn: { $set: false },
                    error: { $set: '' }
                },
                userInfo: {
                  userName: { $set : ''},
                  userId: { $set : ''},
                  accessToken: { $set : ''},
                  authType: { $set: ''}
                }
            });
        case types.AUTH_GET_STATUS_SUCCESS:
            return update(state, {
                status: {
                    status: { $set: 'GET_STATUS_SUCCESS'},
                    isLoggedIn: { $set: true },
                    error: { $set: '' }
                },
                userInfo: {
                  userName: { $set : action.userName },
                  userId: { $set : action.userId },
                  accessToken: { $set : action.accessToken },
                  authType: { $set: action.authType}
                }
            });
        case types.AUTH_GET_STATUS_FAILURE:
            return update(state, {
                status: {
                    status: { $set: 'GET_STATUS_FAILURE'},
                    isLoggedIn: { $set: false },
                    error: { $set: action.error }
                },
                userInfo: {
                  userName: { $set : ''},
                  userId: { $set : ''},
                  accessToken: { $set : ''},
                  authType: { $set: ''}
                }
            });


        /* LOGOUT */
        case types.AUTH_LOGOUT:
            return update(state, {
                status: {
                    status: { $set: 'LOGOUT'},
                    error: { $set: '' },
                    isLoggedIn: { $set: false }
                },
                userInfo: {
                  userName: { $set : ''},
                  userId: { $set : ''},
                  accessToken: { $set : ''},
                  authType: { $set: ''}
                }
            });

        default:
            return state;
    }
}
