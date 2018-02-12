import React from 'react';
import { connect } from 'react-redux';
import { Write } from '../components';
import {memoAddPostRequest, memoUpdateRequest, memoDeleteRequest} from '../actions/memo';
import CircularProgress from 'material-ui/CircularProgress';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PropTypes from 'prop-types';

class Writer extends React.Component {

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

	constructor(props) {
    super(props);
    this.handleAddPost = this.handleAddPost.bind(this);

    this.state = {
      showProgress: false
    };
  }

  componentDidMount(){
      if (!this.props.isLoggedIn) {
          window.Materialize.toast('로그인이 필요합니다!!', 2000);
          this.props.history.replace('/');
          return;
      }
  }

  handleAddPost(title, contents) {
				this.setState({
						showProgress: true
				});

        return this.props.memoAddPost(this.props.userId, title, contents).then(() => {
            	const Materialize = window.Materialize;
                if(this.props.postStatus.status === 'ADD_POST_SUCCESS') {
                    setTimeout(() => {
                      Materialize.toast('Success!', 2000);
                      this.props.history.replace('/');
                    }, 300);
                } else {
                    Materialize.toast('Fail...', 2000);
                    this.setState({
      									showProgress: false
      							});
                }
            }
        );
    }

  render() {
      const write = (<Write onPost = {this.handleAddPost} />);
      const progress = (
        <div className = "progress-container">
            <div className = "progress">
              <CircularProgress size={80} thickness={5}/>
            </div>
        </div>
      );

      return (
          <div className = "wrapper">
            {this.props.isLoggedIn ? write : undefined}
            {this.state.showProgress ? progress : undefined}
          </div>
      );
  }
}

const mapStateToProps = (state) => {
	return {
			isLoggedIn : state.authentication.status.isLoggedIn,
			userId : state.authentication.userInfo.userId,
      postStatus: state.memo.post
	};
}

Writer.childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
	return {
		memoAddPost : (userId, title, contents) => {
			return dispatch(memoAddPostRequest(userId, title, contents));
		},
		memoUpdate: (userId, memoId, content, index) => {
				return dispatch(memoUpdateRequest(userId, memoId, content, index));
		},
		memoDelete: (userId, memoId, index) => {
				return dispatch(memoDeleteRequest(userId, memoId, index));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Writer);
