import React from 'react';
import { connect } from 'react-redux';
import { Home } from '../containers';
import { memoClear } from '../actions/memo';

class Wall extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            initCompleted: false
        };
        console.log("search keyword : " + this.props.match.params.search_keyword);
    }

    componentDidMount() {
      this.props.memoClear().then((result) => {
          this.setState({
            initCompleted: true
          });
      });
    }

    componentWillUnmount(){
      console.log("componentWillUnmount");
      this.props.history.replace("/");
    }

    render() {
        return(
          <div>
              { this.state.initCompleted ? <Home keyword={this.props.match.params.search_keyword}></Home> : undefined }
          </div>
        );
    }
}

const mapStateToProps = (state) => {
	return {
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		memoClear : () => {
			return dispatch(memoClear());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Wall);
