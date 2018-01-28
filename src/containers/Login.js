import React from 'react';
import { connect } from 'react-redux';
import { loginRequest, registerRequest, logoutRequest } from '../actions/authentication';
import CircularProgress from 'material-ui/CircularProgress';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PropTypes from 'prop-types';


class Login extends React.Component {
	getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

	constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
				this.handleRegister = this.handleRegister.bind(this);
				this.handleLogout = this.handleLogout.bind(this);
    }

		componentDidMount(){
			var params = new URLSearchParams(this.props.location.search);
			var authType = params.get("authType");
			var action = params.get("action");

			console.log("authType, action", authType, action);

			if (authType === undefined || authType === "undefined"
							|| action === undefined || action === "undefined" || action === "fail") {
				this.handleLogout();
				return;
			}

			if (authType === window.AUTH_NAVER) {
					var login = this;
					window.naverLogin.getLoginStatus(function (status) {
						if (status) {
							if (status === true) {
									console.log("login Naver!!");
									login.handleLogin(window.AUTH_NAVER)
							} else {
									login.handleLogout();
							}
						}
					});
			} else {
				 this.handleLogin(authType);
			}
		}

    handleLogin(authType) {
        this.props.login(authType).then(() => {
            const Materialize = window.Materialize;

						console.log('handleLogin result', this.props.userInfo, this.props.status);
            if(this.props.status.status === 'LOGIN_SUCCESS') {
                Materialize.toast('Welcome, ' + this.props.userInfo.userName, 2000);
                this.props.history.replace('/');
            } else if (this.props.status.status === 'UNREGISTERED_USER') {
								this.handleRegister(authType);
						} else {
                Materialize.toast('login fail...', 2000);
								this.handleLogout();
								this.props.history.replace('/');
            }
        });
    }

		handleRegister(authType) {
				console.log('handle register');
				this.props.register(authType).then(() => {
						const Materialize = window.Materialize;

						console.log('handleRegister result', this.props.status.status);
						if(this.props.status.status === 'REGISTER_SUCCESS') {
								this.handleLogin(authType);
						} else {
								Materialize.toast('register fail...', 2000);
								this.handleLogout();
						}
				});
		}

		handleLogout() {
				this.props.logout().then((result) => {

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
        login: (authType) => {
            return dispatch(loginRequest(authType));
        },
				register: (authType) => {
						return dispatch(registerRequest(authType));
				},
				logout: () => {
            return dispatch(logoutRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
