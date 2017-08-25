import React from 'react';
import { Authentication } from '../components';
import { connect } from 'react-redux';
import { registerRequest } from '../actions/authentication';

class Register extends React.Component {

	constructor(props) {
		super(props);
		this.hadnleRegister = this.hadnleRegister.bind(this);
	}

	hadnleRegister(id, pw) {
		return this.props.register(id, pw).then( 
			() => {
				const Materialize = window.Materialize;

				if (this.props.status === 'SUCCESS') {
					Materialize.toast('Success! Please log in.', 2000);
					this.props.history.push('/login');

					return true;
				} else {
					let errorMessage = [
	                        'Invalid Username',
	                        'Password is too short',
	                        'Username already exists'
	                    ];

	                let toastContent = ('<span style="color: #FFB4BA">' + errorMessage[this.props.errorCode - 1] + '</span>');
	                Materialize.toast(toastContent, 2000);
	                return false;
				}
			}
		);
	}

    render() {
        return (
            <div>
                <Authentication mode={false}
                onRegister = {this.hadnleRegister}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
	return {
		status : state.authentication.register.status,
		errorCode : state.authentication.register.error
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		register : (id, pw) => {
			return dispatch(registerRequest(id, pw));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);

