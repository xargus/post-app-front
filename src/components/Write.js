import React from 'react';
import PropTypes from 'prop-types';

class Write extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			contents : ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handlePost = this.handlePost.bind(this);
	}

	handleChange(e) {
		this.setState({
			contents : e.target.value
		});
	}

	handlePost() {
		let contents = this.state.contents;

		this.props.onPost(contents);
	}

	render() {
		return (
			<div className="container write">
				<div className = "card">
					<div className = "card-content">
						<textarea className = "materialize-textarea"
							placeholder = "Write down your memo"
							value = {this.state.contents}
							onChange = {this.handleChange}></textarea>
						<div className = "card-action">
							<a onClick = {this.handlePost}>POST</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Write.propTypes = {
	onPost : PropTypes.func
}

Write.defaultProps = {
	onPost : (content) => console.error("post function not defined")
}

export default Write;
