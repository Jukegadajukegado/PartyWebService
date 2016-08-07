import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import * as Colors from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import Pages from './views/pages.js';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: Colors.green600,
  }
});
ReactDOM.render((
    <MuiThemeProvider muiTheme={muiTheme}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Pages.Home} />
                <Route path="join" component={Pages.Join}/>
                <Route path="create" component={Pages.Create} />
                <Route path="*" component={Pages.NotFound} />
            </Route>
        </Router>
    </MuiThemeProvider>
), document.getElementById('root'));
