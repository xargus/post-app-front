import React from 'react';
import { connect } from 'react-redux';
import { Write } from '../components';
import {memoAddPostRequest} from '../actions/memo';

class Home extends React.Component {

	constructor(props) {
		super(props);
		this.handleAddPost = this.handleAddPost.bind(this);
	}

	handleAddPost(contents) {
        return this.props.memoAddPost(this.props.userId, this.props.accessToken, contents).then(() => {
            	const Materialize = window.Materialize;
                if(this.props.postStatus.status === 'ADD_POST_SUCCESS') {
                    Materialize.toast('Success!', 2000);
                } else {
                    Materialize.toast('Fail...', 2000);
                }
            }
        );
    }

    render() {

    	const write = (<Write onPost = {this.handleAddPost} />);
        return (
            <div className = "wrapper">
                {this.props.isLoggedIn ? write : undefined}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
	return {
			isLoggedIn : state.authentication.status.isLoggedIn,
			userId : state.authentication.userInfo.userId,
			accessToken : state.authentication.userInfo.accessToken,
      postStatus: state.memo.post
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		memoAddPost : (userId, accessToken, contents) => {
			return dispatch(memoAddPostRequest(userId, accessToken, contents));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
