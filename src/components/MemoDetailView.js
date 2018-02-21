import React from 'react';
import TimeAgo from 'react-timeago';

/* eslint-disable no-template-curly-in-string */
/*eslint-env jquery*/
class MemoDetailView extends React.Component {

  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit() {
      this.props.memoEdit(this.props.memoInfo);
  }

  handleClick() {
      console.log("Memo handleClick");
      if (this.props.memoClick !== undefined) {
        this.props.memoClick(this.props.memoInfo);
      }
  }

  handleDelete() {
      this.props.memoDelete(this.props.memoInfo._id, this.props.index);
  }

  render() {
    const dropDownButton = (
      <div className = 'option-button'>
          <a className='dropdown-button'
                 id={'dropdown-button-'+this.props.memoInfo._id}
                 data-activates={'dropdown-'+this.props.memoInfo._id}>
                <i className="material-icons icon-button">more_vert</i>
          </a>
          <ul id={'dropdown-'+this.props.memoInfo._id} className='dropdown-content'>
                <li><a onClick = {this.handleEdit}>Edit</a></li>
                <li><a onClick = {this.handleDelete}>Remove</a></li>
          </ul>
      </div>
    );

    const memoView = (
      <div className = 'card'>
          <div className = 'info-detail' onClick = {this.handleClick}>
              <a className = 'title'>{this.props.memoInfo.title}</a> <TimeAgo date={this.props.memoInfo.updateDate}/>
              { dropDownButton }
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
          {memoView}
      </div>
    );
  }

  componentDidUpdate() {
        // WHEN COMPONENT UPDATES, INITIALIZE DROPDOWN
        // (TRIGGERED WHEN LOGGED IN)
        $('#dropdown-button-'+this.props.memoInfo._id).dropdown({
            belowOrigin: true // Displays dropdown below the button
        });
    }

    componentDidMount() {
        // WHEN COMPONENT MOUNTS, INITIALIZE DROPDOWN
        // (TRIGGERED WHEN REFRESHED)
        $('#dropdown-button-'+this.props.memoInfo._id).dropdown({
            belowOrigin: true // Displays dropdown below the button
        });
    }
}

export default MemoDetailView;
