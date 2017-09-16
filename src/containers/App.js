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
        var thisProps = this.props;
        window.addEventListener('google-loaded', handleGoogleLoaded);

        function handleGoogleLoaded() {
            thisProps.getStatus(window.gapi.auth2.getAuthInstance());
        }
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