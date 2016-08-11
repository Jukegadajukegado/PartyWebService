import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import * as Colors from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import * as Pages from './views/pages.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as reducers from './reducers/index';
import { Provider } from 'react-redux'; 
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage';
import createSocketIoMiddleware from 'redux-socket.io';
let socket = io('/');
import io from 'socket.io-client';


const reducer = storage.reducer(combineReducers(reducers));

const engine = createEngine('0LvI1FTaqPos4a6');

const middleware = storage.createMiddleware(engine);

const middleware1 = applyMiddleware(middleware)(createStore);

let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

let middleware2 = applyMiddleware(socketIoMiddleware)(middleware1);

const store = middleware2(reducer);

const load = storage.createLoader(engine);
load(store);

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: Colors.green600,
  }
});
 


ReactDOM.render((
	<Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Pages.Home} />
                    <Route path="join" component={Pages.Join}/>
                    <Route path="create" component={Pages.Create} />
                    <Route path="settings" component={Pages.Settings} />
                    <Route path="game" component={Pages.Game} />
                    <Route path="*" component={Pages.NotFound} />
                </Route>
            </Router>
        </MuiThemeProvider>
    </Provider>
), document.getElementById('root'));
