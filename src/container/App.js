/**
 * App.js Layout Start Here
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Switch ,Redirect, Route, withRouter} from 'react-router-dom';


import BrandButton from '../BrandButton'
import TextField from '@material-ui/core/TextField';
import AdminLayout from './AdminLayout'
import AuthLayout from './AuthLayout';
import { Profile } from './Profile';



const ProtectedRoute = ({component: Component,authUser, ...rest}) => {
  return (
      <Route{...rest}
            render={props =>
                !authUser
                    ? <Component {...props} />
                    : <Redirect
                        to={{
                            pathname: '/auth/signin',
                            state: {from: props.location}
                        }}
                    />}
      />
  )
}

class App extends Component {

  

render(){
    return(

        
          
          
          <Switch>
            <Route exact path="/" render={props => "welcome"} />
            <Route path="/auth" render={props => <AuthLayout {...props} />} />
            <Route path="/profile" component={Profile} />

            {/* <ProtectedRoute path="/admin" authUser={this.props.data} component={AdminLayout}/> */}

            {/* <Route path="/admin" render={props => <AdminLayout {...props} />} /> */}
            <Route path="/admin" component={AdminLayout} />
            
    </Switch>
    
    
    
    

    )
}

}

const mapStateToProps = state => ({
  data: state.authUser.user
  
});
export default connect(mapStateToProps)(App);
