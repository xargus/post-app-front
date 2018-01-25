import React from 'react';
import { connect } from 'react-redux';
import { loginRequest, registerRequest, logoutRequest } from '../actions/authentication';
import CircularProgress from 'material-ui/CircularProgress';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PropTypes from 'prop-types';

export const AUTH_GOOGLE = "google";

class Login extends React.Component {
	getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

	constructor(props) {
        super(props);

				console.log("Login action : " + window.gapi.auth2.getAuthInstance().currentUser.get());

        this.handleLogin = this.handleLogin.bind(this);
				this.handleRegister = this.handleRegister.bind(this);
				this.handleLogout = this.handleLogout.bind(this);

				if (this.props.match.params.authType === AUTH_GOOGLE) {
						this.handleLogin(window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getId(),
															window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getName(),
															window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token,
															AUTH_GOOGLE);
				}
    }

    handleLogin(userId, userName, accessToken, authType) {
        this.props.login(userId, userName, accessToken, authType).then(() => {
            const Materialize = window.Materialize;

						console.log('handleLogin result', this.props.userInfo, this.props.status);
            if(this.props.status.status === 'LOGIN_SUCCESS') {
                Materialize.toast('Welcome, ' + this.props.userInfo.userName, 2000);
								document.cookie = "authType="+authType;
                this.props.history.replace('/');
            } else if (this.props.status.status === 'UNREGISTERED_USER') {
								this.handleRegister(userId, userName, accessToken, authType);
						} else {
                Materialize.toast('login fail...', 2000);
								this.handleLogout();
								this.props.history.replace('/');
            }
        });
    }

		handleRegister(userId, userName, accessToken, authType) {
				console.log('handle register');
				this.props.register(userId, accessToken, authType).then(() => {
						const Materialize = window.Materialize;

						console.log('handleRegister result', this.props.status.status);
						if(this.props.status.status === 'REGISTER_SUCCESS') {
								this.handleLogin(userId, userName, accessToken, authType);
						} else {
								Materialize.toast('register fail...', 2000);
								this.handleLogout();
						}
				});
		}

		handleLogout() {
				this.props.logout().then((result) => {
						document.cookie = "authType=;";
				});
		}

    render() {
        return (
					<div className = "progress-container">
							<div className = "progress">
								<CircularProgress size={80} thickness={5}/>
							</div>
					</div>
        );
    }
}

Login.childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        status: state.authentication.status,
        userInfo: state.authentication.userInfo
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (userId, userName, accessToken, authType) => {
            return dispatch(loginRequest(userId, userName, accessToken, authType));
        },
				register: (userId, accessToken, authType) => {
						return dispatch(registerRequest(userId, accessToken, authType));
				},
				logout: () => {
            return dispatch(logoutRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
