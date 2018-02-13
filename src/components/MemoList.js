import React from 'react';
import { Memo } from '../components';
import PropTypes from 'prop-types';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class MemoList extends React.Component {

  componentDidMount() {
    if ( this.props.memoInfos.length === 0 ) {
		    this.props.requestMemoList();
    }

    $(window).scroll(() => {
					if (!this.props.isWattingForRequest && this.props.totalLength > this.props.memoInfos.length && $(document).height() - $(window).height() - $(window).scrollTop() < 10) {
              console.log('request by scroll down');
              this.props.requestMemoList();
					}
		});
	}

  componentWillUnmount(){
    console.log("componentWillUnmount");
    $(window).unbind('scroll');
  }

  render() {
    const mapToCompoents = (memoInfos) => {
        return memoInfos.map( (memo, i) => {
            return (
                <Memo
                    memoInfo = {memo}
                    key = {memo._id}
                    memoUpdate = { this.props.memoUpdate }
                    memoDelete = { this.props.memoDelete }
                    index = {i}
                    memoClick = {this.props.handleMemoClick}/>
            );
        });
    };
    return (
      <div className = "memoList">
          <ReactCSSTransitionGroup
                        transitionName="memo"
                        transitionLeave={this.props.transitionLeave}
                        transitionEnterTimeout={2000}
                        transitionLeaveTimeout={1000}>
                            { mapToCompoents(this.props.memoInfos) }
          </ReactCSSTransitionGroup>
      </div>
    );
  }
}

MemoList.propTypes = {
    memoInfos: PropTypes.array,
    memoUpdate: PropTypes.func
};

MemoList.defaultProps = {
    memoInfos: [],
    memoUpdate: (memoId, content) => {
        console.log("memoUpdate function is Null");
    },
    transitionLeave: true
};

export default MemoList;
