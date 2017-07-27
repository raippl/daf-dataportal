import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import configureStore from './configureStore'
import { Provider } from 'react-redux';

// Containers
import Full from './containers/Full/'

const history = createBrowserHistory();

const store = configureStore();

ReactDOM.render((
   <Provider store={store}>
    <HashRouter history={history}>
      <Switch>
        <Route path="/" name="Home" component={Full}/>
        <Route path="/ingestionform" name="Home" component={Full}/>
        <Route path="/ontologies" name="Home" component={Full}/>
      </Switch>
    </HashRouter>
  </Provider>
), document.getElementById('root'))
