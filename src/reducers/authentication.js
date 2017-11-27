import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    status: {
        status: 'INIT',
        error: -1,
        isLoggedIn: false,
        currentUser: ''
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
                    currentUser: { $set: '' },
                    error: { $set: -1 }
                }
            });
        case types.AUTH_LOGIN_SUCCESS:
            return update(state, {
                status: {
                    status: { $set: 'LOGIN_SUCCESS' },
                    isLoggedIn: { $set: true },
                    currentUser: { $set: action.username },
                    error: { $set: -1 }
                }
            });
        case types.AUTH_LOGIN_FAILURE:
            return update(state, {
                status: {
                    status: { $set: 'LOGIN_FAILURE' },
                    isLoggedIn: { $set: false },
                    currentUser: { $set: '' },
                    error: { $set: -1 }
                }
            });
        case types.AUTH_UNREGISTERED_USER:
            return update(state, {
                status: {
                    status: { $set: 'UNREGISTERED_USER' },
                    isLoggedIn: { $set: false },
                    currentUser: { $set: '' },
                    error: { $set: -1 }
                }
            });

        case types.AUTH_REGISTER:
            return update(state, {
                status: {
                    status: { $set: 'REGISTER_WAITING' },
                    isLoggedIn: { $set: false },
                    currentUser: { $set: '' },
                    error: { $set: -1 }
                }
            });
        case types.AUTH_REGISTER_SUCCESS:
            return update(state, {
                status: {
                    status: { $set: 'REGISTER_SUCCESS' },
                    isLoggedIn: { $set: false },
                    currentUser: { $set: '' },
                    error: { $set: -1 }
                }
            });
        case types.AUTH_REGISTER_FAILURE:
            return update(state, {
                status: {
                    status: { $set: 'REGISTER_FAILURE' },
                    isLoggedIn: { $set: false },
                    currentUser: { $set: '' },
                    error: { $set: action.error }
                }
            });

        case types.AUTH_GET_STATUS:
            return update(state, {
                status: {
                    status: { $set: 'STATUS_WATTING'},
                    isLoggedIn: { $set: false },
                    currentUser: { $set: '' },
                    error: { $set: -1 }
                }
            });
        case types.AUTH_GET_STATUS_SUCCESS:
            return update(state, {
                status: {
                    status: { $set: 'GET_STATUS_SUCCESS'},
                    isLoggedIn: { $set: true },
                    currentUser: { $set: action.username },
                    error: { $set: -1 }
                }
            });
        case types.AUTH_GET_STATUS_FAILURE:
            return update(state, {
                status: {
                    status: { $set: 'GET_STATUS_FAILURE'},
                    isLoggedIn: { $set: false },
                    currentUser: { $set: '' },
                    error: { $set: action.error }
                }
            });


        /* LOGOUT */
        case types.AUTH_LOGOUT:
            return update(state, {
                status: {
                    status: { $set: 'LOGOUT'},
                    error: { $set: -1 },
                    isLoggedIn: { $set: false },
                    currentUser: { $set: '' }
                }
            });

        default:
            return state;
    }
}
