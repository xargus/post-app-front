import React from 'react';
import { connect } from 'react-redux';
import { Write } from '../components';
import {memoAddPostRequest, memoUpdateRequest, memoDetailPostRequest} from '../actions/memo';
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
    this.handleEdit = this.handleEdit.bind(this);

    this.state = {
      showProgress: false,
      isEditMode: false,
      initCompleted: false
    };
  }

  componentDidMount(){
      if (!this.props.isLoggedIn) {
          window.Materialize.toast('로그인이 필요합니다!!', 2000);
          this.props.history.replace('/');
          return;
      }

      var params = new URLSearchParams(this.props.location.search);
      var id = params.get("id");
      console.log("Writer componentDidMount id : " + id);
      if (id !== undefined && id !== null) {
        this.setState({
            isEditMode: true,
            showProgress: true
        });

        this.props.memoDetailPost(this.props.userId, id).then(() => {
          this.setState({
            showProgress: false,
            initCompleted: true
          });

          console.log("memoDetailPost", this.props.memoDetail);
        });
      } else {
          this.setState({
              initCompleted: true
          });
      }
  }

  handleEdit(memoId, title, content) {
    this.props.memoUpdate(this.props.userId, memoId, title, content).then(() => {
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

          this.props.history.goBack();
    });

    this.setState({
        showProgress: true
    });
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
      const write = (<Write handlePost = {this.handleAddPost}
                            handleEdit = {this.handleEdit}
                            memoDetail = {this.props.memoDetail}/>);
      const progress = (
        <div className = "progress-container">
            <div className = "progress">
              <CircularProgress size={80} thickness={5}/>
            </div>
        </div>
      );

      return (
          <div className = "wrapper">
            {this.props.isLoggedIn && this.state.initCompleted ? write : undefined}
            {this.state.showProgress ? progress : undefined}
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

Writer.childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
	return {
		memoAddPost : (userId, title, contents) => {
			return dispatch(memoAddPostRequest(userId, title, contents));
		},
		memoUpdate: (userId, memoId, title, content) => {
				return dispatch(memoUpdateRequest(userId, memoId, title, content));
		},
    memoDetailPost : (userId, id) => {
      return dispatch(memoDetailPostRequest(userId, id));
    }
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Writer);
