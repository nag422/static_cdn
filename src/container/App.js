/**
 * App.js Layout Start Here
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Switch ,Redirect, Route} from 'react-router-dom';


import BrandButton from '../BrandButton'
import TextField from '@material-ui/core/TextField';
import AdminLayout from './AdminLayout'
import AuthLayout from './AuthLayout';





class App extends Component {

render(){
    return(

        
          
          
          <Switch>
            <Route exact path="/" render={props => "welcome"} />
            <Route path="/auth" render={props => <AuthLayout {...props} />} />
            <Route path="/admin" render={props => <AdminLayout {...props} />} />
            
    </Switch>
    
    
    
    

    )
}

}


export default App
