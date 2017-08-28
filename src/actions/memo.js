import {
    MEMO_POST,
    MEMO_POST_SUCCESS,
    MEMO_POST_FAILURE
} from './ActionTypes';

export function memoPostRequest(contents) {
    return (dispatch) => {
        dispatch(memoPost());

        return Promise.resolve(dispatch(memoPostSuccess()));
        // return axios.post('/api/memo/', {contents})
        //         .then((response) => {
        //             dispatch(memoPostSuccess());
        //         })
        //         .then((error) => {
        //             dispatch(memoPostFailure());
        //         });
    };
}

export function memoPost() {
    return {
        type : MEMO_POST
    };
}

export function memoPostSuccess() {
    return {
        type : MEMO_POST_SUCCESS
    };
}

export function memoPostFailure(error) {
    return {
        type : MEMO_POST_FAILURE,
        error
    };
}