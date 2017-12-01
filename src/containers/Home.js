import React from 'react';
import { connect } from 'react-redux';
import { Write, MemoList } from '../components';
import {memoAddPostRequest, memoListPostRequest, memoClear} from '../actions/memo';

class Home extends React.Component {

	constructor(props) {
		super(props);
		this.handleAddPost = this.handleAddPost.bind(this);
		this.handleMemoListRequest = this.handleMemoListRequest.bind(this);

		this.state = {
				isWattingForRequest: false,
				count: 0
		};
	}

	handleMemoListRequest() {
		if (!this.props.isLoggedIn) {
				return;
		}

		const start = this.props.memoList.length;
		this.setState({
				isWattingForRequest: true,
				count: start
		});
		this.props.memoListPost(this.props.userId, this.props.accessToken, start, 10).then(() => {
					console.log(this.props.memoList);
					if (this.props.memoList.length > this.state.count) {
							this.setState({
									isWattingForRequest: false
							});
					}
		});
	}

	handleAddPost(contents) {
        return this.props.memoAddPost(this.props.userId, this.props.accessToken, contents).then(() => {
            	const Materialize = window.Materialize;
                if(this.props.postStatus.status === 'ADD_POST_SUCCESS') {
                    Materialize.toast('Success!', 2000);
                } else {
                    Materialize.toast('Fail...', 2000);
                }
								this.props.memoClear();
								this.handleMemoListRequest();
            }
        );
    }

    render() {
    	const write = (<Write onPost = {this.handleAddPost} />);
			const memoList = (<MemoList
														memoInfos = {this.props.memoList}
														requestMemoList = {this.handleMemoListRequest}
														isWattingForRequest = { this.state.isWattingForRequest } />);
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
		memoListPost : (userId, accessToken, start, limit) => {
			return dispatch(memoListPostRequest(userId, accessToken, start, limit));
		},
		memoClear : () => {
			return dispatch(memoClear());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
