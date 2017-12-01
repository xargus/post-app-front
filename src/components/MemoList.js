import React from 'react';
import { Memo } from '../components';
import PropTypes from 'prop-types';
import $ from 'jquery';

class MemoList extends React.Component {

  componentDidMount() {
		this.props.requestMemoList();

    $(window).scroll(() => {
					// WHEN HEIGHT UNDER SCROLLBOTTOM IS LESS THEN 250
					if (!this.props.isWattingForRequest && $(document).height() - $(window).height() - $(window).scrollTop() < 10) {
							this.props.requestMemoList();
					}
		});
	}

  render() {
    const mapToCompoents = (memoInfos) => {
        return memoInfos.map( (memo, i) => {
            console.log('new memo', i);
            return (
                <Memo memoInfo = {memo} key = {memo._id}/>
            );
        });
    };
    return (
      <div>
          { mapToCompoents(this.props.memoInfos) }
      </div>
    );
  }
}

MemoList.propTypes = {
    memoInfos: PropTypes.array
};

MemoList.defaultProps = {
    memoInfos: []
};

export default MemoList;
