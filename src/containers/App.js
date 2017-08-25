import React from 'react';
import { Header } from '../components';
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest } from '../actions/authentication';

class App extends React.Component {

	constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

     handleLogout() {
        this.props.logout().then(
            () => {
            	const Materialize = window.Materialize;
                Materialize.toast('Good Bye!', 2000);

                // // EMPTIES THE SESSION
                // let loginData = {
                //     isLoggedIn: false,
                //     username: ''
                // };

                // document.cookie = 'key=' + btoa(JSON.stringify(loginData));
            }
        );
    }

	componentDidMount() {
        // get cookie by name
        // function getCookie(name) {
        //     var value = "; " + document.cookie;
        //     var parts = value.split("; " + name + "=");
        //     if (parts.length == 2) return parts.pop().split(";").shift();
        // }

        // // get loginData from cookie
        // let loginData = getCookie('key');

        // // if loginData is undefined, do nothing
        // if(typeof loginData === "undefined") return;

        // // decode base64 & parse json
        // loginData = JSON.parse(atob(loginData));

        // // if not logged in, do nothing
        // if(!loginData.isLoggedIn) return;

        // page refreshed & has a session in cookie,
        // check whether this cookie is valid or not
        this.props.getStatus().then(
            () => {
            	const Materialize = window.Materialize;
                console.log(this.props.status);
                // if session is not valid
                if(!this.props.status.valid) {
                    // logout the session
                    // loginData = {
                    //     isLoggedIn: false,
                    //     username: ''
                    // };

                    // document.cookie='key=' + btoa(JSON.stringify(loginData));

                    // and notify
                    let toastContent = ('<span style="color: #FFB4BA">Your session is expired, please log in again</span>');
                    Materialize.toast(toastContent, 4000);

                }
            }
        );
    }


    render() {
        return (
            <div>
                <Header isLoggedIn={this.props.status.isLoggedIn}
                onLogout={this.handleLogout}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatus: () => {
            return dispatch(getStatusRequest());
        }, 
        logout: () => {
            return dispatch(logoutRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);