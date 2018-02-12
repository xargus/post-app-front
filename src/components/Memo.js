import React from 'react';
import TimeAgo from 'react-timeago';

/* eslint-disable no-template-curly-in-string */
/*eslint-env jquery*/
class Memo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editMode : false,
      value : props.memoInfo.content
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
      this.props.memoDelete(this.props.memoInfo._id, this.props.index);
  }

  handleChange(e) {
    this.setState({
        value: e.target.value
    });
  }

  toggleEdit() {
    if (this.state.editMode) {
        this.props.memoUpdate(this.props.memoInfo._id, this.state.value, this.props.index);
    }

    this.setState({
      editMode: !this.state.editMode
    });
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
                <li><a onClick = {this.toggleEdit}>Edit</a></li>
                <li><a onClick = {this.handleDelete}>Remove</a></li>
          </ul>
      </div>
    );

    const memoView = (
      <div className = 'card'>
          <div className = 'info'>
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

    const editView = (
      <div className = "write">
          <div className = "card">
              <div className = "card-content">
                  <textarea className = "materialize-textarea" onChange = { this.handleChange } value={this.state.value}></textarea>
              </div>
              <div className = "card-action">
                  <a onClick = { this.toggleEdit }>OK</a>
              </div>
          </div>
      </div>
    );

    return (
      <div className = 'container memo'>
          { this.state.editMode ? editView : memoView }
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

export default Memo;
