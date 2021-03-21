/**
 * AdminLayout.js Layout Start Here
 */

import React, { Component } from 'react'
import { Route, withRouter, Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types'
import routerService from '../services/routerService'

import AdminHeader from '../components/AdminHeader/AdminHeader'
import CssBaseline from '@material-ui/core/CssBaseline';

import { Container } from '@material-ui/core';
import { connect } from 'react-redux';
class AuthLayout extends Component {
    static propTypes = {

    }

    componentDidMount(){
        if(this.props.data.isAuthenticated){
            return <Redirect to="/admin/dashboard" />
            
        } 
        console.log('ended component')
        // const data ={
        //     user:51,
        //     history:this.props.history
        //   }
        //   console.log('trigging component did mount')
        //   return this.props.getProfileData(data);

    }
    
    render() {
        
        
        
        return (
            <>
            <CssBaseline />
            {/* <AdminHeader /> */}
            
            <Switch>
            {routerService && routerService.map((route,key)=>
					<Route key={key} path={`/auth/${route.path}`} component={route.component} />
				)}
                
                
                <Redirect from="*" to="/auth/signin" />
                 
                </Switch>
            </>
        )
    }
}
const mapStateToProps = state => ({
    data: state.authUser
});
export default connect(mapStateToProps,null)(withRouter(AuthLayout));
