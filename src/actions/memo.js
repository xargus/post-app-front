import $ from 'jquery';
import {
    MEMO_ADD_POST,
    MEMO_ADD_POST_SUCCESS,
    MEMO_ADD_POST_FAILURE,
    MEMO_LIST_POST,
    MEMO_LIST_POST_SUCCESS,
    MEMO_LIST_POST_FAILURE,
    MEMO_CLEAR,
    MEMO_UPDATE,
    MEMO_UPDATE_SUCCESS,
    MEMO_UPDATE_FAILURE,
    MEMO_DELETE,
    MEMO_DELETE_SUCCESS,
    MEMO_DELETE_FAILURE
} from './ActionTypes';

import {
  MEMO_URL
} from './APIInfos'

export function memoDeleteRequest(userId, accessToken, memoId, index) {
    return (dispatch) => {
        dispatch(memoDelete());

        return $.post(MEMO_URL, {
            action: 'DELETE',
            memoId: memoId,
            userId: userId,
            accessToken: accessToken
        })
        .done((response) => {
            var jsonResult = JSON.parse(response);
            console.log("memo delete result", jsonResult);
            if (jsonResult.result === 'SUCCESS') {
                dispatch(memoDeleteSuccess(index));
            } else {
                dispatch(memoDeleteFailure());
            }
        })
        .catch((error) => {
            dispatch(memoDeleteFailure());
        });
    }
}

export function memoUpdateRequest(userId, accessToken, memoId, content, index) {
    return (dispatch) => {
        dispatch(memoUpdate());

        return $.post(MEMO_URL, {
            action: 'UPDATE',
            memoId: memoId,
            content: content,
            userId: userId,
            accessToken: accessToken
        })
        .done((response) => {
            var jsonResult = JSON.parse(response);
            console.log("memo update result", jsonResult);
            if (jsonResult.result === 'SUCCESS') {
                dispatch(memoUpdateSuccess(index, content));
            } else {
                dispatch(memoUpdateFailure());
            }
        })
        .catch((error) => {
            dispatch(memoUpdateFailure(error));
        })
    }
}

export function memoClear() {
    return (dispatch) => {
      dispatch(memoClearReturn());
    }
}

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

export function memoListPostRequest(userId, accessToken, start, limit) {
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
            console.log("memo list api result", response);
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

export function memoClearReturn() {
  return {
      type: MEMO_CLEAR
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

export function memoUpdate() {
    return {
      type : MEMO_UPDATE
    }
}

export function memoUpdateSuccess(index, content) {
    return {
      type : MEMO_UPDATE_SUCCESS,
      index : index,
      content : content
    }
}

export function memoUpdateFailure(error = '') {
    return {
      type : MEMO_UPDATE_FAILURE,
      error: error
    }
}

export function memoDelete() {
    return {
        type: MEMO_DELETE
    }
}

export function memoDeleteSuccess(index) {
    return {
        type: MEMO_DELETE_SUCCESS,
        index: index
    }
}

export function memoDeleteFailure(error = '') {
    return {
        type: MEMO_DELETE_FAILURE,
        error: error
    }
}
