import $ from 'jquery';
import {
    MEMO_ADD_POST,
    MEMO_ADD_POST_SUCCESS,
    MEMO_ADD_POST_FAILURE,
    MEMO_LIST_POST,
    MEMO_LIST_POST_SUCCESS,
    MEMO_LIST_POST_FAILURE
} from './ActionTypes';

import {
  MEMO_URL
} from './APIInfos'

export function memoAddPostRequest(userId, accessToken, contents) {
    return (dispatch) => {
        dispatch(memoAddPost());

        return $.post(MEMO_URL, {
            action: 'INSERT',
            content: contents,
            userId: userId,
            accessToken: accessToken
        })
        .done((response) => {
          var jsonResult = JSON.parse(response);
          console.log("memo add api result", response, jsonResult);
          if (jsonResult.result === 'SUCCESS') {
              dispatch(memoAddPostSuccess());
          } else {
              dispatch(memoAddPostFailure());
          }
        }).catch((error) => {
            dispatch(memoAddPostFailure(error));
        });
    };
}

export function memoListPostRequest(userId, accessToken, start, limit = 10) {
    return (dispatch) => {
        dispatch(memoListPost());

        return $.post(MEMO_URL, {
            action: 'SELECT',
            start: start,
            limit: limit,
            userId: userId,
            accessToken: accessToken
        })
        .done((response) => {
            var jsonResult = JSON.parse(response);
            if (jsonResult.result === 'SUCCESS') {
                dispatch(memoListPostSuccess(jsonResult.memoList));
            } else {
                dispatch(memoListPostFailure());
            }
        })
        .catch((error) => {
            console.log("memo list error : " + error);
            dispatch(memoListPostFailure(error));
        });
    };
}

export function memoListPost() {
    return {
        type: MEMO_LIST_POST
    };
}

export function memoListPostSuccess(memoList) {
    return {
        type: MEMO_LIST_POST_SUCCESS,
        memoList
    };
}

export function memoListPostFailure(error = '') {
    return {
        type: MEMO_LIST_POST_FAILURE,
        error
    };
}

export function memoAddPost() {
    return {
        type : MEMO_ADD_POST
    };
}

export function memoAddPostSuccess() {
    return {
        type : MEMO_ADD_POST_SUCCESS
    };
}

export function memoAddPostFailure(error = '') {
    return {
        type : MEMO_ADD_POST_FAILURE,
        error: error
    };
}
