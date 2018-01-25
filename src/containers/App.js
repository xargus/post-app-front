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
            (result) => {
            	const Materialize = window.Materialize;
                Materialize.toast('Good Bye!', 2000);
								this.props.history.replace('/');
            }
        );
  }

	componentDidMount() {
			//google button 이용시 Missing required parameter 'client_id'가 발생하여 최초 로드시 init 무조건 하도록 수정.
			window.triggerGoogleLoaded();

			this.props.getLoginStatus().then((result) => {
					if (result === true) {
						console.log("login success");
					} else {
						console.log("login fail");
						this.handleLogout();
					}
			});
  }

    render() {
        return (
            <div>
                <Header isLoggedIn={this.props.status.isLoggedIn}
                onLogout={this.handleLogout}
								history = {this.props.history}/>
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
        getLoginStatus: () => {
            return dispatch(getStatusRequest());
        },
        logout: (auth) => {
            return dispatch(logoutRequest(auth));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
