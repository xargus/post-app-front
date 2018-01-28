import React from 'react';
import $ from 'jquery';

class Search extends React.Component {
  constructor(props) {
      super(props);
      this.handleClose = this.handleClose.bind(this);
      this.handleChange = this.handleChange.bind(this);

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

  componentDidMount() {
    var search = this;
    $('input').keydown( function(e) {
       var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
       if(key === 13) {
         search.props.history.push("/wall/" + search.state.keyword);
         search.handleClose();
       }
   });
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

  render() {
      return(
        <div className = "search-screen white-text">
            <div className = "right">
                <a className = "waves-effect waves-light btn red lighten-1" onClick = {this.handleClose}>CLOSE</a>
            </div>
            <div className = "container">
                <input className = "input"
                        value = {this.state.keyword}
                        onChange = {this.handleChange}>
                </input>
            </div>
        </div>
      );
  }
}

export default Search;
