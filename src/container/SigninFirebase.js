import React from 'react'
import {Button,Paper,Box, Grid, Typography, TextField, LinearProgress} from '@material-ui/core'

import { fade, makeStyles } from '@material-ui/core/styles';
import {grey} from '@material-ui/core/colors'
import HttpsOutlinedIcon from '@material-ui/icons/HttpsOutlined';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root:{
        display:'flex',        
        alignItems:'center',
        justifyContent:'center',
        alignContent:'center',        
        height:'100vh',
        padding:10,
        label: {
            textTransform: 'capitalize',
            
          },
        signinform:{
            
        },
        '& .MuiInputBase-input':{
            backgroundColor:grey[100],
            outline:'none',
            borderRadius:5,

        },
        '& .MuiInputLabel-formControl':{
            color:grey[800],
            
        }
        
       
          
        
    },
    bordertopcolor:{
        borderTop: `8px solid ${theme.palette.primary.main}`,
        borderRadius:10
    },
    pageTitle:{
        position:'absolute',
        left:'44vw',
        top:80,    
        // height:'4vh',
        // padding:10
        [theme.breakpoints.down('md')]: {
            top:100,
            left:'28vw',
        }

    }
    
   
}))

const SigninFirebase = () => {
    

    const classes = useStyles();
    return (
        <>
        <Box className={classes.pageTitle}>
        <Typography component="h4" variant="h4">
            MoviePlex
            </Typography>
            </Box>
        <Box component="section" className={classes.root}>  

       
        
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square className={classes.bordertopcolor} >
        
        {/* <LinearProgress value={40} /> */}
        <Box display="flex" flexDirection="column" p={3}>
            <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">

            <Typography component="h1" variant="h5" style={{marginBottom:"5%"}}>
                        Sign in
                        
          </Typography>
         <HttpsOutlinedIcon style={{marginBottom:"5%"}} />

            </Box>
       
          <TextField id="standard-basic" label="Email" style={{marginBottom:"5%"}} />
          <TextField id="standard-adornment-password" label="Password" style={{marginBottom:"5%"}} />
          
          <Button color="primary" variant="contained" classes={{label:classes.root.label}} style={{marginTop:'3%'}}>
            Sign In
            </Button>
            <Box display="flex" alignContent="center" justifyContent="space-between" mt={3}>
            <Typography component="h5" variant="body2">
            Don't have an account ? <Link to="/admin/signup" style={{ textDecoration: 'none',color:'inherit' }}>Sign up</Link>
            </Typography>
            <Typography component="h5" variant="body2">
             <Link to="/admin/signup" style={{ textDecoration: 'none',color:'inherit' }}>Forgot Password ?</Link>
            </Typography>
            
            </Box> 
</Box>


      
        </Grid>     
            
            
         
            
        
        </Box>
        </>
    )
}

export default SigninFirebase
