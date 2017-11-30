import React from 'react';
import { Header } from '../components';
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest } from '../actions/authentication';

class App extends React.Component {

	constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
				this.handleGoogleLoaded = this.handleGoogleLoaded.bind(this);
  }

  handleLogout() {
        this.props.logout(window.gapi.auth2.getAuthInstance()).then(
            () => {
            	const Materialize = window.Materialize;
                Materialize.toast('Good Bye!', 2000);
            }
        );
  }

	handleGoogleLoaded() {
			console.log('handleGoogleLoaded()');
			this.props.getStatus(window.gapi.auth2.getAuthInstance()).then((result) => {
					console.log("get status", result);
					// this.props.history.push('/');
			});
	}

	componentDidMount() {
				console.log('componentDidMount()');
				if (window.gapi !== undefined) {
            window.triggerGoogleLoaded();
        }

        window.addEventListener('google-loaded', this.handleGoogleLoaded);
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
