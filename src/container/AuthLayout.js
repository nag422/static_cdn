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
class AuthLayout extends Component {
    static propTypes = {

    }

    render() {
        const {match, location} = this.props;
        
        
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

export default withRouter(AuthLayout);
