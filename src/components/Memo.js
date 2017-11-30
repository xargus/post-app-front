import React from 'react';

/* eslint-disable no-template-curly-in-string */
/*eslint-env jquery*/
class Memo extends React.Component {
  render() {
    const dropDownButton = (
      <div className = 'option-button'>
          <a className='dropdown-button'
                 id={'dropdown-button-'+this.props.memoInfo._id}
                 data-activates={'dropdown-'+this.props.memoInfo._id}>
                <i className="material-icons icon-button">more_vert</i>
          </a>
          <ul id={'dropdown-'+this.props.memoInfo._id} className='dropdown-content'>
                <li><a>Edit</a></li>
                <li><a>Remove</a></li>
          </ul>
      </div>
    );

    const memoView = (
      <div className = 'card'>
          <div className = 'info'>
              <a className = 'username'>'title'</a>
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
          { memoView }
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

Memo.defaultProps = {
    memoInfo: {
        _id: '',
        content: ''
    }
};
