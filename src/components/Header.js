import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Search, Login } from '../components';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showSearch : false,
            showLogin : false
        };

        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleSearchClose = this.handleSearchClose.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLoginClose = this.handleLoginClose.bind(this);
    }

    handleSearchClick() {
        this.setState({
            showSearch : !this.state.showSearch
        });
    }

    handleLoginClose() {
        this.setState({
            showLogin : false
        });
    }

    handleLoginClick() {
      this.setState({
          showLogin : true
      });
    }

    handleSearchClose() {
      this.setState({
          showSearch : false
      });
    }

    render() {

    	const loginButton = (
            <li>
                <a onClick = {this.handleLoginClick} ><i className="material-icons">vpn_key</i></a>
            </li>
        );

        const logoutButton = (
            <li>
                <a onClick={this.props.onLogout}>
                    <i className="material-icons">lock_open</i>
                </a>
            </li>
        );

        return (
            <div>
                <nav>
                    <div className="nav-wrapper blue darken-1">
                        <Link to="/" className="brand-logo center">MEMOPAD</Link>

                        <ul>
                            <li><a onClick = {this.handleSearchClick}><i className="material-icons">search</i></a></li>
                        </ul>

                        <div className="right">
                            <ul>
                                { this.props.isLoggedIn ? logoutButton : loginButton }
                            </ul>
                        </div>
                    </div>
                </nav>

                <ReactCSSTransitionGroup transitionName="search" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                        { this.state.showSearch ? <Search history = {this.props.history} onClose = {this.handleSearchClose} /> : undefined}
                </ReactCSSTransitionGroup>

                <ReactCSSTransitionGroup transitionName="search" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                { this.state.showLogin ? <Login history = {this.props.history} onClose = {this.handleLoginClose}/> : undefined }
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

Header.propTypes = {
    isLoggedIn: PropTypes.bool,
    onLogout: PropTypes.func
};

Header.defaultProps = {
    isLoggedIn: false,
    onLogout: () => { console.error("logout function not defined");}
};

export default Header;
