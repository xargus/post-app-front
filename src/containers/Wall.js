import React from 'react';
import { Home } from '../containers';

class Wall extends React.Component {
    render() {
        return(
          <div>
              <Home keyword={this.props.match.params.search_keyword}></Home>
          </div>
        );
    }
}

export default Wall;
