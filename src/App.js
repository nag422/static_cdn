// Main App

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import MomentUtils from 'material-ui-pickers/utils/moment-utils';
// import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

import App from './container/App';

// css

import './lib/reactifyCss';

import { configureStore } from './store';
import {ThemeProvider} from '@material-ui/core'
import theme from './theme'



function MainApp() {
  return (
    <Provider store={configureStore()}>
<ThemeProvider theme={theme}>
          <Router>
            <Switch>
               <Route path="/" component={App} />
            </Switch>
         </Router>


    
         </ThemeProvider>

    </Provider>
  );
}

export default MainApp;
