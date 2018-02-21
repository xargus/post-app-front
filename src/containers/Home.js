import React from 'react';
import { connect } from 'react-redux';
import { MemoList } from '../components';
import { memoListPostRequest, memoClear} from '../actions/memo';
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
		this.handleWriteClick = this.handleWriteClick.bind(this);
		this.handleMemoClick = this.handleMemoClick.bind(this);

		this.state = {
				isWattingForRequest: false,
				transitionLeave: true,
				showProgress: false,
				timeStamp: ''
		};
	}

	componentDidMount(){
		var path = this.props.location === undefined ? undefined : this.props.location.pathname;
		console.log("Home componentDidMount", path);
		if ((path !== undefined && path.indexOf("home") === -1)) {
			this.props.memoClear().then((result) => {
					this.props.history.replace("/home");
			});
		}
	}

	handleMemoClick(memoInfo) {
			console.log("handleMemoClick", memoInfo);
			this.props.history.push("/MemoDetail?id=" + memoInfo._id);
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
														handleMemoClick = {this.handleMemoClick}
														memoInfos = {this.props.memoList}
														requestMemoList = {this.handleMemoListRequest}
														isWattingForRequest = { this.state.isWattingForRequest }
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
								{this.props.isLoggedIn ? memoList : undefined}
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
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
