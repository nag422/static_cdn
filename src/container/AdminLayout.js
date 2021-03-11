/**
 * AdminLayout.js Layout Start Here
 */

import React, { Component } from 'react'
import { Route, withRouter, Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types'
import routerService from '../services/routerService'

import AdminHeader from '../components/AdminHeader/AdminHeader'
import CssBaseline from '@material-ui/core/CssBaseline';

import { Grid, Box, Container, Typography } from '@material-ui/core';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { amber } from '@material-ui/core/colors';





const styles = {
    root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent:'space-between',
      marginBottom:10

    },
    color:{
        color:'gray'
    }
  };


  const theme = createMuiTheme({
    palette: {
        type:'light',
        primary: {
            light: '#1282a2',
            main: '#034078',
            dark: '#0a1128',
            contrastText: '#fff',
          },
          secondary: {
            light: '#598392',
            main: amber[500],
            dark: amber[800],
            contrastText: '#000',
          },
      
    },
    typography:{
        fontFamily: "Lato, sans-serif"
    }
  });


  const darktheme = createMuiTheme({
    palette: {
        type:'dark',
        primary: {
            light: '#1282a2',
            main: '#303030;',
            dark: '#0a1128',
            contrastText: '#fff',
          },
          secondary: {
            light: '#598392',
            main: amber[500],
            dark: amber[800],
            contrastText: '#000',
          },
      
    },
    typography:{
        fontFamily: "Lato, sans-serif"
    }
  });

class AdminLayout extends Component {
    static propTypes = {

    }
    constructor(props) {
        super(props);
        this.state={
            issidebar:false
        }
    

    }
    


    
   

    
    
    sidebardrawer =()=>{
        this.setState({issidebar: !this.state.issidebar});
    }
    
    render() {
        const {match, location} = this.props;
       
        
        const width = this.state.issidebar?`calc(100% - 80%)`:`calc(100% - 93%)`;
        const { classes } = this.props;
    
        
        return (
            <>
            <ThemeProvider theme={this.props.data?theme:darktheme}>
            <CssBaseline />
            <AdminHeader sidebardrawer={this.sidebardrawer} />
            <Box style={{marginLeft:width,marginRight:15,overflow:'hidden',marginTop:100,flexGrow:1}}>
                <Box className={classes.root}>
                <Typography className={classes.color}>
                    
                    {(location.pathname.split('/'))[2].slice(0).charAt(0).toUpperCase() +(location.pathname.split('/'))[2].slice(1)}
                </Typography>
                </Box>
            <Switch>
            {routerService && routerService.map((route,key)=>
					<Route key={key} path={`/admin/${route.path}`} component={route.component} />
				)}
                
                
                <Redirect from="*" to="/admin/signin" />
                
                </Switch>

                </Box>
                </ThemeProvider>
            </>
        )
    }
}
const mapStateToProps = state => ({
    data: state.authUser.thememode
});
export default connect(mapStateToProps)(withRouter((withStyles(styles)(AdminLayout))));
