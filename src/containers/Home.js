import React from 'react';
import { connect } from 'react-redux';
import { Write } from '../components';
import {memoPostRequest} from '../actions/memo';

class Home extends React.Component {

	constructor(props) {
		super(props);
		this.handlePost = this.handlePost.bind(this);
	}

	handlePost(contents) {
        return this.props.memoPost(contents).then(
            () => {
            	const Materialize = window.Materialize;
                if(this.props.postStatus.status === "SUCCESS") {
                    // TRIGGER LOAD NEW MEMO
                    // TO BE IMPLEMENTED
                    Materialize.toast('Success!', 2000);
                } else {
                    /*
                        ERROR CODES
                            1: NOT LOGGED IN
                            2: EMPTY CONTENTS
                    */
                    let toastContent;
                    switch(this.props.postStatus.error) {
                        case 1:
                            // IF NOT LOGGED IN, NOTIFY AND REFRESH AFTER
                            toastContent = 'You are not logged in';
                            Materialize.toast(toastContent, 2000);
                            // setTimeout(()=> {location.reload(false);}, 2000);
                            break;
                        case 2:
                            toastContent = 'Please write something';
                            Materialize.toast(toastContent, 2000);
                            break;
                        default:
                            toastContent = 'Something Broke';
                            Materialize.toast(toastContent, 2000);
                            break;
                    }
                }
            }
        );
    }

    render() {

    	const write = (<Write onPost = {this.handlePost} />);
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
        postStatus: state.memo.post
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		memoPost : (contents) => { 
			return dispatch(memoPostRequest(contents));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);