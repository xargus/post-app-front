import React from 'react';
import { Memo } from '../components';
import PropTypes from 'prop-types';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class MemoList extends React.Component {

  componentDidMount() {
		this.props.requestMemoList();

    $(window).scroll(() => {
					if (!this.props.isWattingForRequest && $(document).height() - $(window).height() - $(window).scrollTop() < 10) {
							this.props.requestMemoList();
					}
		});
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
                    index = {i}/>
            );
        });
    };
    return (
      <div>
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
