import React from 'react';
import { connect } from 'react-redux';
import { memoDetailPostRequest } from '../actions/memo';
import CircularProgress from 'material-ui/CircularProgress';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PropTypes from 'prop-types';
import { Memo } from '../components';

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

  handleDelete(memoId, index) {

  }

  handleMemoUpdate(memoId, content, index) {

  }

  render() {
      const progress = (
        <div className = "progress-container">
            <div className = "progress">
              <CircularProgress size={80} thickness={5}/>
            </div>
        </div>
      );
      const memo = (<Memo
          memoInfo = {this.props.memoDetail}
          memoUpdate = { this.handleMemoUpdate }
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
    memoDetail: state.memo.memoDetail
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
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoDetail);
