import React from 'react';

class Search extends React.Component {
  constructor(props) {
      super(props);
      this.handleClose = this.handleClose.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleKeyDown = this.handleKeyDown.bind(this);

      this.state = {
          keyword : ''
      };

      const listenEscKey = (evt) => {
           evt = evt || window.event;
           if (evt.keyCode === 27) {
               this.handleClose();
           }
       };
       document.onkeydown = listenEscKey;
  }

  handleClose() {
      document.onkeydown = null;
      this.props.onClose();
  }

  handleChange(e) {
      this.setState({
          keyword : e.target.value
      });
  }

  handleKeyDown(e) {
      if (e.keyCode === 13) {
          this.props.history.push("/wall/" + this.state.keyword);
          this.handleClose();
      }
  }

  render() {
      return(
        <div className = "search-screen white-text">
            <div className = "right">
                <a className = "waves-effect waves-light btn red lighten-1" onClick = {this.handleClose}>CLOSE</a>
            </div>
            <div className = "container">
                <input value = {this.state.keyword}
                        onChange = {this.handleChange}
                        onKeyDown = {this.handleKeyDown}>
                </input>
            </div>
        </div>
      );
  }
}

export default Search;
