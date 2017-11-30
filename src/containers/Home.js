import React from 'react';
import { connect } from 'react-redux';
import { Write, MemoList } from '../components';
import {memoAddPostRequest, memoListPostRequest} from '../actions/memo';

class Home extends React.Component {

	constructor(props) {
		super(props);
		this.handleAddPost = this.handleAddPost.bind(this);
		this.handleMemoListRequest = this.handleMemoListRequest.bind(this);
	}

	handleMemoListRequest() {
		if (this.props.isLoggedIn) {
			this.props.memoListPost(this.props.userId, this.props.accessToken, 0).then(() => {
						console.log(this.props.memoList);
			});
		}
	}

	handleAddPost(contents) {
        return this.props.memoAddPost(this.props.userId, this.props.accessToken, contents).then(() => {
            	const Materialize = window.Materialize;
                if(this.props.postStatus.status === 'ADD_POST_SUCCESS') {
                    Materialize.toast('Success!', 2000);
                } else {
                    Materialize.toast('Fail...', 2000);
                }

								this.handleMemoListRequest();
            }
        );
    }

    render() {
    	const write = (<Write onPost = {this.handleAddPost} />);
			const memoList = (<MemoList memoInfos = {this.props.memoList} requestMemoList = {this.handleMemoListRequest} />);
        return (
            <div className = "wrapper">
                {this.props.isLoggedIn ? write : undefined}
								{this.props.isLoggedIn ? memoList : undefined}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
	return {
			isLoggedIn : state.authentication.status.isLoggedIn,
			userId : state.authentication.userInfo.userId,
			accessToken : state.authentication.userInfo.accessToken,
      postStatus: state.memo.post,
			memoList: state.memo.memoList
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		memoAddPost : (userId, accessToken, contents) => {
			return dispatch(memoAddPostRequest(userId, accessToken, contents));
		},
		memoListPost : (userId, accessToken, start) => {
			return dispatch(memoListPostRequest(userId, accessToken, start));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
