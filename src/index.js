import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { Home, Login, Wall } from './containers';
import { App } from './containers';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

const rootElement = document.getElementById('root');
ReactDOM.render(
	<Provider store={store}>
		<Router>
			<div>
				<Route component = {App} />
    		<Route exact path="/" component={Home}/>
        <Route path="/home" component={Home}/>
        <Route path="/login/:authType" component={Login}/>
				<Route path="/wall/:search_keyword" component={Wall}/>
			</div>
  		</Router>
  	</Provider>, rootElement
);
