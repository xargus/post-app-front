import React from 'react';
import { connect } from 'react-redux';
import { Write, MemoList } from '../components';
import {memoAddPostRequest, memoListPostRequest, memoClear, memoUpdateRequest, memoDeleteRequest} from '../actions/memo';
import CircularProgress from 'material-ui/CircularProgress';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PropTypes from 'prop-types';

class Home extends React.Component {

	getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

	constructor(props) {
		super(props);
		this.handleAddPost = this.handleAddPost.bind(this);
		this.handleMemoListRequest = this.handleMemoListRequest.bind(this);
		this.handleMemoUpdate = this.handleMemoUpdate.bind(this);
		this.handleDelete = this.handleDelete.bind(this);

		this.state = {
				initCompleted: false,
				isWattingForRequest: false,
				transitionLeave: true,
				showProgress: false,
				time: ''
		};
	}

	componentDidMount(){
		this.props.memoClear().then((result) => {
				this.setState({
					initCompleted: true
				});
		});
		console.log("Home componentDidMount", this.props.memoList);
	}

	handleDelete(memoId, index) {
			this.props.memoDelete(this.props.userId, memoId, index, this.props.totalLength).then(() => {
					this.setState({
							showProgress: false
					});

					console.log("home delete result",this.props.memoList);
					const Materialize = window.Materialize;
					if (this.props.postStatus.status === 'DELETE_SUCCESS') {
							Materialize.toast('Memo Delete Success!', 2000);
					} else {
							Materialize.toast('Memo Delete Fail...', 2000);
					}
			});

			this.setState({
					showProgress: true
			});
	}

	handleMemoUpdate(memoId, content, index) {
			this.props.memoUpdate(this.props.userId, memoId, content, index).then(() => {
						this.setState({
								showProgress: false
						});

						console.log("home update result",this.props.memoList);
						const Materialize = window.Materialize;
						if (this.props.postStatus.status === 'UPDATE_SUCCESS') {
								Materialize.toast('Memo Update Success!', 2000);
						} else {
								Materialize.toast('Memo Update Fail...', 2000);
						}
			});

			this.setState({
					showProgress: true
			});
	}

	handleMemoListRequest() {
		if (!this.props.isLoggedIn) {
				return;
		}

		const start = this.props.memoList.length;
		this.setState({
				isWattingForRequest: true
		});

		console.log("request memo List");
		this.props.memoListPost(this.props.userId, start, 10, this.props.keyword).then(() => {
					this.setState({
							showProgress: false,
							isWattingForRequest: false,
							transitionLeave: true
					});

					console.log("memo List result",this.props.memoList.length, this.props.totalLength);
		});

		this.setState({
				showProgress: true
		});
	}

	handleAddPost(contents) {
				this.setState({
						showProgress: true
				});

        return this.props.memoAddPost(this.props.userId, contents).then(() => {
							this.setState({
									showProgress: false
							});

            	const Materialize = window.Materialize;
                if(this.props.postStatus.status === 'ADD_POST_SUCCESS') {
                    Materialize.toast('Success!', 2000);

										this.setState({
											transitionLeave: false
										});
										this.props.memoClear();
										this.handleMemoListRequest();
                } else {
                    Materialize.toast('Fail...', 2000);
                }
            }
        );
    }

    render() {
    	const write = (<Write onPost = {this.handleAddPost} />);
			const memoList = (<MemoList
														memoInfos = {this.props.memoList}
														requestMemoList = {this.handleMemoListRequest}
														isWattingForRequest = { this.state.isWattingForRequest }
														memoUpdate = { this.handleMemoUpdate }
														memoDelete = { this.handleDelete }
														transitionLeave = {this.state.transitionLeave}
														totalLength = {this.props.totalLength} />);
				const progress = (
					<div className = "progress-container">
							<div className = "progress">
								<CircularProgress size={80} thickness={5}/>
							</div>
					</div>
				);

				const floatingButton = (
					<div className="floating-button" >
						<a className="btn-floating btn-large waves-effect waves-light red"><i className="large material-icons">mode_edit</i></a>
					</div>
				);
        return (
            <div className = "wrapper">
								{this.state.showProgress ? progress : undefined}
                {this.props.isLoggedIn && this.state.initCompleted ? write : undefined}
								{this.props.isLoggedIn && this.state.initCompleted ? memoList : undefined}
								{this.props.isLoggedIn ? floatingButton : undefined}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
	return {
			isLoggedIn : state.authentication.status.isLoggedIn,
			userId : state.authentication.userInfo.userId,
      postStatus: state.memo.post,
			memoList: state.memo.memoList,
			totalLength: state.memo.totalLength
	};
}

Home.childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
	return {
		memoAddPost : (userId, contents) => {
			return dispatch(memoAddPostRequest(userId, contents));
		},
		memoListPost : (userId, start, limit, keyword) => {
			return dispatch(memoListPostRequest(userId, start, limit, keyword));
		},
		memoClear : () => {
			return dispatch(memoClear());
		},
		memoUpdate: (userId, memoId, content, index) => {
				return dispatch(memoUpdateRequest(userId, memoId, content, index));
		},
		memoDelete: (userId, memoId, index) => {
				return dispatch(memoDeleteRequest(userId, memoId, index));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
