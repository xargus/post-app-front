import React from 'react';
import TimeAgo from 'react-timeago';

/* eslint-disable no-template-curly-in-string */
/*eslint-env jquery*/
class Memo extends React.Component {

  constructor(props) {
    super(props);
    
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
      console.log("Memo handleClick");
      if (this.props.memoClick !== undefined) {
        this.props.memoClick(this.props.memoInfo);
      }
  }

  render() {
    const memoView = (
      <div className = 'card'>
          <div className = 'info' onClick = {this.handleClick}>
              <a className = 'title'>{this.props.memoInfo.title}</a> <TimeAgo date={this.props.memoInfo.updateDate}/>
              <div className = 'card-content'>
                  {this.props.memoInfo.content}
              </div>
              <div className = 'footer'>
                  <i className = 'material-icons log-footer-icon star icon-button'>star</i>
                  <span className = 'star-count'>0</span>
              </div>
          </div>
      </div>
    );

    return (
      <div className = 'container memo'>
          { memoView }
      </div>
    );
  }
}

export default Memo;
