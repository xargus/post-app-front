import React from 'react';
import PropTypes from 'prop-types';

class Memo extends React.Component {
  render() {
    return (
      <div className = 'container memo'>
          <div className = 'card'>
              <div className = 'info'>
                  <a className = 'username'>Writer</a>
                  <div className = 'option-button'>
                      <a className = 'dropdown-button' id = 'dropdown-button-id' data-activates = 'dropdown-id'>
                          <i className = 'material-icons icon-button'>more_vert</i>
                      </a>
                      <ul id = 'dropdown-id' className = 'dropdown-content'>
                          <li><a>Edit</a></li>
                          <li><a>Remove</a></li>
                      </ul>
                  </div>
                  <div className = 'card-content'>
                      Contents
                  </div>
                  <div className = 'footer'>
                      <i className = 'material-icons log-footer-icon star icon-button'>star</i>
                      <span className = 'star-count'>0</span>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

export default Memo;

Memo.propTypes = {
    data: PropTypes.object,
    ownerShip: PropTypes.bool
};

Memo.defaultProps = {
    data: {
        id: '',
        writer: '',
        contents: ''
    },
    ownerShip: false
};
