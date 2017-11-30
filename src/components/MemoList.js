import React from 'react';
import { Memo } from '../components';
import PropTypes from 'prop-types';

class MemoList extends React.Component {

  componentDidMount() {
		this.props.requestMemoList();
	}

  render() {
    const mapToCompoents = (memoInfos) => {
        return memoInfos.map( (memo, i) => {
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
