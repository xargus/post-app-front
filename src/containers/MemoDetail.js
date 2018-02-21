import React from 'react';
import { connect } from 'react-redux';
import { memoDetailPostRequest, memoDeleteRequest, memoDetailClear } from '../actions/memo';
import CircularProgress from 'material-ui/CircularProgress';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PropTypes from 'prop-types';
import { MemoDetailView } from '../components';

class MemoDetail extends React.Component {
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  constructor(props) {
        super(props);
        this.state = {
    				showProgress: false
    		};

        this.handleDelete = this.handleDelete.bind(this);
        this.handleMemoUpdate = this.handleMemoUpdate.bind(this);
  }

  componentDidMount(){
    var params = new URLSearchParams(this.props.location.search);
    var id = params.get("id");
    console.log("MemoDetail id : " + id);

    if (!this.props.isLoggedIn) {
        window.Materialize.toast('로그인이 필요합니다!!', 2000);
        this.props.history.replace('/');
        return;
    }

    if (id === undefined) {
        window.Materialize.toast('잘못된 접근 입니다...', 2000);
        this.props.history.replace('/');
        return;
    }

    this.setState({
      showProgress: true
    });

    this.props.memoDetailPost(this.props.userId, id).then(() => {
      this.setState({
        showProgress: false
      });

      console.log("memoDetailPost", this.props.memoDetail);
    });
  }

  componentWillUnmount(){
    console.log("componentWillUnmount");
    this.props.memoDetailClear();

    if (this.props.needToRefesh) {
        this.props.history.replace('/');
    }
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

          this.props.history.replace('/');
			});

			this.setState({
					showProgress: true
			});
	}

  handleMemoUpdate(memoInfo) {
      this.props.history.push("/write?id=" + memoInfo._id);
  }

  render() {
      const progress = (
        <div className = "progress-container">
            <div className = "progress">
              <CircularProgress size={80} thickness={5}/>
            </div>
        </div>
      );
      const memo = (<MemoDetailView
          memoInfo = {this.props.memoDetail}
          memoEdit = { this.handleMemoUpdate }
          memoDelete = { this.handleDelete }/>);

      return (<div>
                {this.state.showProgress ? progress : undefined}
                {this.props.memoDetail === undefined ? undefined : memo}
              </div>
      );
  }
}
const mapStateToProps = (state) => {
	return {
    isLoggedIn : state.authentication.status.isLoggedIn,
    userId : state.authentication.userInfo.userId,
    postStatus: state.memo.post,
    memoDetail: state.memo.memoDetail,
    needToRefesh: state.memo.needToRefesh
	};
}

MemoDetail.childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
	return {
    memoDetailPost : (userId, id) => {
      return dispatch(memoDetailPostRequest(userId, id));
    },
    memoDelete: (userId, memoId, index) => {
				return dispatch(memoDeleteRequest(userId, memoId, index));
		},
    memoDetailClear: () => {
        return dispatch(memoDetailClear());
    }
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoDetail);
