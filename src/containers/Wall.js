import React from 'react';
import { connect } from 'react-redux';
import { Home } from '../containers';
import { memoClear } from '../actions/memo';

class Wall extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            initCompleted: false,
            keyword: this.props.match.params.search_keyword
        };
        console.log("search keyword : " + this.state.keyword);
    }

    componentDidMount() {
      this.props.memoClear().then((result) => {
          this.setState({
            initCompleted: true
          });
      });
    }

    componentDidUpdate(prevProps, prevState){
      console.log("componentDidUpdate search keyword : " + this.props.match.params.search_keyword);
      if (this.props.match.params.search_keyword !== this.state.keyword) {
          this.setState({
              keyword: this.props.match.params.search_keyword,
              initCompleted: false
          });

          this.props.memoClear().then((result) => {
              this.setState({
                initCompleted: true
              });
          });
      }
    }

    componentWillUnmount(){
      console.log("componentWillUnmount");
      this.props.history.replace("/");
    }

    render() {
        return(
          <div>
              { this.state.initCompleted ? <Home keyword={this.state.keyword}></Home> : undefined }
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
