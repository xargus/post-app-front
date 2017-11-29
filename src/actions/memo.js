import $ from 'jquery';
import {
    MEMO_ADD_POST,
    MEMO_ADD_POST_SUCCESS,
    MEMO_ADD_POST_FAILURE
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
