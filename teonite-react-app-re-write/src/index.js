import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import Main from './Components/main.component';

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
registerServiceWorker();
