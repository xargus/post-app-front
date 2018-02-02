import React from 'react';
import { connect } from 'react-redux';
import { Write, MemoList } from '../components';
import { memoListPostRequest, memoClear, memoUpdateRequest, memoDeleteRequest} from '../actions/memo';
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
		this.handleMemoListRequest = this.handleMemoListRequest.bind(this);
		this.handleMemoUpdate = this.handleMemoUpdate.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleWriteClick = this.handleWriteClick.bind(this);

		this.state = {
				initCompleted: false,
				isWattingForRequest: false,
				transitionLeave: true,
				showProgress: false,
				timeStamp: ''
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
		this.props.memoListPost(this.props.userId, start, 10, this.props.keyword, this.state.timeStamp).then(() => {
					this.setState({
							showProgress: false,
							isWattingForRequest: false,
							transitionLeave: true
					});

					if (start === 0 ) {
						this.setState({
								timeStamp: window.getTimeStamp()
						});
					}

					console.log("memo List result",this.props.memoList.length, this.props.totalLength, this.state.timeStamp);
		});

		this.setState({
				showProgress: true
		});
	}

		handleWriteClick() {
				this.props.history.push('/write');
		}

    render() {
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
					<div className="floating-button">
						<a className="btn-floating btn-large waves-effect waves-light red" onClick = {this.handleWriteClick} ><i className="large material-icons">mode_edit</i></a>
					</div>
				);
        return (
            <div className = "wrapper">
								{this.state.showProgress ? progress : undefined}
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
		memoListPost : (userId, start, limit, keyword, timeStamp) => {
			return dispatch(memoListPostRequest(userId, start, limit, keyword, timeStamp));
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
