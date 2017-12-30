import React from 'react';
import { connect } from 'react-redux';
import { loginRequest, registerRequest, logoutRequest } from '../actions/authentication';

class Login extends React.Component {
	constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
				this.handleRegister = this.handleRegister.bind(this);
				this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogin(googleUser) {
        this.props.login(googleUser).then(() => {
            const Materialize = window.Materialize;

						console.log('handleLogin result', this.props.userInfo, this.props.status);
            if(this.props.status.status === 'LOGIN_SUCCESS') {
                Materialize.toast('Welcome, ' + this.props.userInfo.userName, 2000);
                this.props.history.push('/');
            } else if (this.props.status.status === 'UNREGISTERED_USER') {
								this.handleRegister();
						} else {
                Materialize.toast('login fail...', 2000);
								this.handleLogout();
            }
        });
    }

		handleRegister() {
				console.log('handle register');
				var googleUser = window.gapi.auth2.getAuthInstance().currentUser.get();
				this.props.register(googleUser).then(() => {
						const Materialize = window.Materialize;

						console.log('handleRegister result', this.props.status.status);
						if(this.props.status.status === 'REGISTER_SUCCESS') {
								this.handleLogin(googleUser);
						} else {
								Materialize.toast('register fail...', 2000);
								this.handleLogout();
						}
				});
		}

		handleLogout() {
				this.props.logout(window.gapi.auth2.getAuthInstance());
		}

    componentDidMount() {
        console.log('componentDidMount');
        var loginHandler = this.handleLogin;

        if (window.gapi !== undefined) {
            window.triggerGoogleLoaded();
        }

        window.addEventListener('google-loaded', handleGoogleLoaded);

        function handleGoogleLoaded() {
            console.log('handleGoogleLoaded()');
            window.gapi.signin2.render('signin', {
                'scope': 'profile email',
                'width': 'standard',
                'height': 50,
                'longtitle': true,
                'theme': 'dark',
                'onsuccess': onSuccess,
                'onfailure': onFailure
            });
        }

        function onSuccess(googleUser) {
            loginHandler(googleUser);
        }

        function onFailure(error) {
            const Materialize = window.Materialize;
            Materialize.toast('login fail...', 2000);

            console.log(error);
        }
    }

    render() {
        return (
            <div className="auth">
                <div className="card">
                    <div className="header blue white-text center">
                            <div className="card-content">LOGIN</div>
                    </div>

                    <div className="card-content">
                        <div id="signin"></div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.status,
        userInfo: state.authentication.userInfo
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (googleUser) => {
            return dispatch(loginRequest(googleUser));
        },
				register: (googleUser) => {
						return dispatch(registerRequest(googleUser));
				},
				logout: (auth) => {
            return dispatch(logoutRequest(auth));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
