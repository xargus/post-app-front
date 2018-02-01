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

import { getAccessToken } from './authentication'

export function memoDeleteRequest(userId, memoId, index, totalLength) {
    return (dispatch) => {
        dispatch(memoDelete());

        var token = getAccessToken();

        return $.post(MEMO_URL, {
            action: 'DELETE',
            memoId: memoId,
            userId: userId,
            accessToken: token
        })
        .done((response) => {
            var jsonResult = JSON.parse(response);
            console.log("memo delete result", jsonResult);
            if (jsonResult.result === 'SUCCESS') {
                dispatch(memoDeleteSuccess(index, totalLength - 1));
            } else {
                dispatch(memoDeleteFailure());
            }
        })
        .catch((error) => {
            dispatch(memoDeleteFailure());
        });
    }
}

export function memoUpdateRequest(userId, memoId, content, index) {
    return (dispatch) => {
        dispatch(memoUpdate());

        var token = getAccessToken();

        return $.post(MEMO_URL, {
            action: 'UPDATE',
            memoId: memoId,
            content: content,
            userId: userId,
            accessToken: token
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
        return new Promise((resolve, reject) => {
          dispatch(memoClearReturn());
          resolve(true);
        });
    }
}

export function memoAddPostRequest(userId, contents) {
    return (dispatch) => {
        dispatch(memoAddPost());

        var token = getAccessToken();

        return $.post(MEMO_URL, {
            action: 'INSERT',
            content: contents,
            userId: userId,
            accessToken: token
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

export function memoListPostRequest(userId, start, limit, keyword, timeStamp) {
    return (dispatch) => {
        dispatch(memoListPost());

        var token = getAccessToken();

        console.log("request memo", userId, start, limit, keyword);
        const selectParm = {
          action: 'SELECT',
          start: start,
          limit: limit,
          userId: userId,
          accessToken: token,
          time: timeStamp
        };
        const searchParm = {
          action: 'SEARCH',
          start: start,
          limit: limit,
          userId: userId,
          accessToken: token,
          content: keyword
        };

        return $.post(MEMO_URL, keyword === undefined ? selectParm : searchParm)
        .done((response) => {
            console.log("memo list api result", response);
            var jsonResult = JSON.parse(response);
            if (jsonResult.result === 'SUCCESS') {
                dispatch(memoListPostSuccess(jsonResult.memoList, jsonResult.totalLength));
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

export function memoListPostSuccess(memoList = [], totalLength = 0) {
    return {
        type: MEMO_LIST_POST_SUCCESS,
        memoList,
        totalLength
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

export function memoDeleteSuccess(index, totalLength) {
    return {
        type: MEMO_DELETE_SUCCESS,
        index: index,
        totalLength
    }
}

export function memoDeleteFailure(error = '') {
    return {
        type: MEMO_DELETE_FAILURE,
        error: error
    }
}
