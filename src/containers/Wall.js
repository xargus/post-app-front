import React from 'react';
import { Home } from '../containers';

class Wall extends React.Component {
    constructor(props) {
        super(props);

        console.log("search keyword : " + this.props.match.params.search_keyword);
    }
    render() {
        return(
          <div>
              <Home keyword={this.props.match.params.search_keyword}></Home>
          </div>
        );
    }
}

export default Wall;
