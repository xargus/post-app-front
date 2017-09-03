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
        this.props.logout(window.gapi.auth2.getAuthInstance()).then(
            () => {
            	const Materialize = window.Materialize;
                Materialize.toast('Good Bye!', 2000);
            }
        );
    }

	componentDidMount() {
        window.gapi.load('auth2', () => {
            // Retrieve the singleton for the GoogleAuth library and set up the client.
            this.auth2 = window.gapi.auth2.init({
                client_id: '519909259598-qq25td7clds3ht9jr4bc339i50po6l6g.apps.googleusercontent.com',
                scope: 'profile email'
            }).then(() => {
                this.props.getStatus(window.gapi.auth2.getAuthInstance());
            });
        }, (error) => {
            console('init error', error);
        });
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
        getStatus: (auth) => {
            return dispatch(getStatusRequest(auth));
        }, 
        logout: (auth) => {
            return dispatch(logoutRequest(auth));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);