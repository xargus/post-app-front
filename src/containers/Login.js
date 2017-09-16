import React from 'react';
import { connect } from 'react-redux';
import { loginRequest } from '../actions/authentication';

class Login extends React.Component {
	constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(googleUser) {
        this.props.login(googleUser).then(() => {
            const Materialize = window.Materialize;

            if(this.props.status === "SUCCESS") {
                Materialize.toast('Welcome, ' + this.props.currentUser, 2000);
                this.props.history.push('/');
            } else {
                Materialize.toast('login fail...', 2000);
            }
        });
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
                'width': 240,
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
        status: state.authentication.login.status,
        currentUser: state.authentication.status.currentUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (googleUser) => { 
            return dispatch(loginRequest(googleUser)); 
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);