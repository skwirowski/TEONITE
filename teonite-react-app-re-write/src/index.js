import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import Main from './Components/main.component';

ReactDOM.render(
  <BrowserRouter>
    <Fragment>
      <Switch>
        <Route path = "/stats" component = {Main} />
        <Redirect from = "/" to = "/stats" />
      </Switch>
    </Fragment>
  </BrowserRouter>,

  document.getElementById('root')
);
registerServiceWorker();
