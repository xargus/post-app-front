import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { Home, Login, Register } from './containers';
import { Header } from './components';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const rootElement = document.getElementById('root');
ReactDOM.render(
	<Router>
		<div>
			<Header />
    		<Route exact path="/" component={Home}/>
    		<Route path="/home" component={Home}/>
    		<Route path="/login" component={Login}/>
    		<Route path="/register" component={Register}/>
		</div>
  	</Router>, rootElement
);
