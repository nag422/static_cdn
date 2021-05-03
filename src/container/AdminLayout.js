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

import {getProfileData} from '../actions/ProfileActions'
import { bindActionCreators } from 'redux';
import { ProfileUpdatePrimary } from 'actions';
import { ProfileUpdateSecondary } from 'actions';
import { authUserState } from 'reducers/selectors/AuthSelector';
import { authisAuthenticated } from 'reducers/selectors/AuthSelector';



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
    },
    // backtitle:{
    //   '&:hover':{
    //     cursor:"pointer"
    //   }
    // }
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


   

    componentDidMount(){
        // alert('stoppedn in component did mount Admin layout')
        if(!this.props.isAuthenticated){
            return this.props.history.push('/auth/signin')
        } 

        // alert('checking auth',this.props.isAuthenticated)
        
        // console.log('started component')
        const data ={
            user:51,
            history:this.props.history
          }
          console.log('trigging component did mount')
          if(this.props.isProfile == ''){
            return this.props.getProfileData(data);
          }
          

    }
    


    
   getPageTitle = (location) => {
    var pagetitle = (location.pathname.split('/'))[2].slice(0).charAt(0).toUpperCase() +(location.pathname.split('/'))[2].slice(1)
    if(pagetitle == "Contentadmin"){
      pagetitle = "Explore";
    }
    if(pagetitle == "Upload"){
      pagetitle = "Upload Content";
    }
    if(pagetitle == "Contentrequest"){
      pagetitle = "Content Request";
    }
    if(pagetitle == "Requests"){
      pagetitle = "Buyer Requests";
    }

    
    if(pagetitle == "Section"){
      pagetitle = <span style={{cursor:"pointer"}} onClick={() => this.props.history.goBack()}>{"Back"}</span>;
    }
    if(pagetitle == "Backend"){
      pagetitle = "Messages (Admin)";
    }

    if(location.pathname == "/admin/buyer/message"){
      pagetitle = "Messages";
    }
    if(location.pathname == "/admin/buyer/notification"){
      pagetitle = "Buyer Notification";
    }
    
    if(location.pathname == "/admin/seller/message"){
      pagetitle = "Messages";
    }
    if(location.pathname == "/admin/buyer/dashboard"){
      pagetitle = "Buyer Dashboard";
    }
    if(location.pathname == "/admin/seller/dashboard"){
      pagetitle = "Seller Dashboard";
    }
    if(location.pathname == "/admin/content"){
      pagetitle = "Explore Contnet";
    }
    // onClick={() => props.history.goBack()}>Back</Button>

    return pagetitle
   }

    
    
    sidebardrawer =()=>{
        this.setState({issidebar: !this.state.issidebar});
    }
    
    render() {
        const {location, classes} = this.props;
       
        
        const width = this.state.issidebar? +window.innerWidth >= 1366?`calc(100% - 80%)`:`calc(100% - 74%)`:`calc(100% - 93%)`;
        
        
    
        
        return (
            <>
            <ThemeProvider theme={this.props.thememode?theme:darktheme}>
            <CssBaseline />
            <AdminHeader sidebardrawer={this.sidebardrawer} />
            <Box style={{marginLeft:width,marginRight:15,overflow:'hidden',marginTop:100,flexGrow:1}}>
                <Box className={classes.root}>
                <Typography className={classes.color}>
                    
                    {this.getPageTitle(location)}

                </Typography>
                </Box>
            <Switch>
            {routerService && routerService.map((route,key)=>
					route.layout === "admin" && <Route key={key} exact path={`/admin/${route.path}`} component={route.component} />
                    
				)}
                
                
                <Redirect from="*" to="/admin/profile" />
                
                </Switch>

                </Box>
                </ThemeProvider>
            </>
        )
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.authUser.isAuthenticated,
    thememode: state.authUser.thememode,
    isProfile:state.profileops.profile.user_ptr.first_name
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({      
        getProfileData
        
    }, dispatch);
  }

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({      
        
//         primaryprofileupdate:ProfileUpdatePrimary,
//         secondaryprofileupdate:ProfileUpdateSecondary
//     }, dispatch);
//   }
// export default connect(mapStateToProps,mapDispatchToProps)(withRouter((withStyles(styles)(AdminLayout))));
export default withStyles(styles)(connect(mapStateToProps,mapDispatchToProps)(withRouter(AdminLayout)));
