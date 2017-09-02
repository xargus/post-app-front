import React from 'react';
import { connect } from 'react-redux';
import { loginWithGoogle } from '../actions/authentication';
import GoogleLogin from 'react-google-login';

class Login extends React.Component {
	constructor(props) {
        super(props);
        // this.handleLogin = this.handleLogin.bind(this);
        this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    }

    handleGoogleLogin(response) {
        this.props.login(response);
    }
    
    // handleLogin(id, pw) {
    //     return this.props.login(id, pw).then(
    //         () => {
    //         	const Materialize = window.Materialize;

    //             if(this.props.status === "SUCCESS") {
    //                 // create session data
    //                 // let loginData = {
    //                 //     isLoggedIn: true,
    //                 //     username: id
    //                 // };

    //                 // document.cookie = 'key=' + btoa(JSON.stringify(loginData));

    //                 Materialize.toast('Welcome, ' + id + '!', 2000);
    //                 this.props.history.push('/');
    //                 return true;
    //             } else {
    //                 let toastContent = ('<span style="color: #FFB4BA">Incorrect username or password</span>');
    //                 Materialize.toast(toastContent, 2000);
    //                 return false;
    //             }
    //         }
    //     );
    // }
    
    render() {
        return (
            <div className="auth">
                <div className="card">
                    <div className="header blue white-text center">
                            <div className="card-content">LOGIN</div>
                    </div>

                    <div className="card-content">
                        <GoogleLogin
                            clientId="519909259598-qq25td7clds3ht9jr4bc339i50po6l6g.apps.googleusercontent.com"
                            buttonText="Login With Google"
                            onSuccess={this.handleGoogleLogin}
                            onFailure={this.handleGoogleLogin}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (response) => { 
            return dispatch(loginWithGoogle(response)); 
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);