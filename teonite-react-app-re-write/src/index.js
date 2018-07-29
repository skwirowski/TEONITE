import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import Main from './Components/main.component';

ReactDOM.render(
  <BrowserRouter>
    <Fragment>
      <Redirect from = "/" to = "/stats" />
      <Route path = "/stats" component = {Main} />
    </Fragment>
  </BrowserRouter>,

  document.getElementById('root')
);
registerServiceWorker();
