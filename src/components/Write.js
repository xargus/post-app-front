import React from 'react';
import PropTypes from 'prop-types';

class Write extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			contents : '',
			title: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handlePost = this.handlePost.bind(this);
	}

	handleTitleChange(e) {
		this.setState({
			title : e.target.value
		});
	}

	handleChange(e) {
		this.setState({
			contents : e.target.value
		});
	}

	handlePost() {
		let title = this.state.title;
		let contents = this.state.contents;

		this.props.onPost(title, contents);
	}

	render() {
		return (
			<div className="container write">
				<div className = "card">
					<div className = "card-content-title">
						<div className = "card-content">
							<textarea className = "materialize-textarea"
								placeholder = "Write down your title"
								value = {this.state.title}
								onChange = {this.handleTitleChange}></textarea>
						</div>
					</div>
				</div>
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
