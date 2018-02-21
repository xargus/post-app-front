import React from 'react';
import PropTypes from 'prop-types';

class Write extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			contents : '',
			title: '',
			isEditMode: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handlePost = this.handlePost.bind(this);
	}

	componentDidMount() {
		this.setState({
				contents : this.props.memoDetail === undefined ? '' : this.props.memoDetail.content,
				title : this.props.memoDetail === undefined ? '' : this.props.memoDetail.title,
				isEditMode : this.props.memoDetail === undefined ? false : true
		});

		console.log("Write componentDidMount " + this.state.isEditMode);
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

		console.log("Write handlePost " + this.state.isEditMode);
		if (this.state.isEditMode) {
			this.props.handleEdit(this.props.memoDetail._id, title, contents);
		} else {
			this.props.handlePost(title, contents);
		}
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
							<a onClick = {this.handlePost}>{this.state.isEditMode === true ? 'EDIT' : 'POST'}</a>
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
