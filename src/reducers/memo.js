import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
	post : {
		status : 'INIT',
		error : ''
	},
	memoList: []
};

export default function memo(state, action) {
	if (typeof state === 'undefined') {
		state = initialState;
	}

	switch(action.type) {
		case types.MEMO_ADD_POST :
			return update(state, {
						post : {
						status : { $set: 'ADD_POST_WAITING' },
						error : { $set : '' }
					}
				});
		case types.MEMO_ADD_POST_SUCCESS :
			return update(state, {
						post : {
							status : { $set : 'ADD_POST_SUCCESS' },
							error : { $set : '' }
						}
					});
		case types.MEMO_ADD_POST_FAILURE :
			return update(state, {
						post : {
							status : { $set : 'ADD_POST_FAILURE'},
							error : { $set : action.error }
						}
					});

		case types.MEMO_LIST_POST:
				return update(state, {
						post : {
							status : { $set : 'LIST_POST_WATTING' },
							error : { $set : ''}
						},
						memoList : { $set: [] }
				});
		case types.MEMO_LIST_POST_SUCCESS:
				return update(state, {
					post : {
						status : { $set : 'LIST_POST_SUCCESS' },
						error : { $set : ''}
					},
					memoList : { $set: action.memoList }
				});
		case types.MEMO_LIST_POST_FAILURE:
				return update(state, {
						post : {
							status : { $set : 'LIST_POST_FAILURE' },
							error : { $set : action.error}
						},
						memoList : { $set: [] }
				});
		default :
			return state;
	}
}
