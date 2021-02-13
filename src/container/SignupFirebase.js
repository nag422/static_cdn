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
    formfieldsalign:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        
        [theme.breakpoints.down('md')]:{
            display:"flex",
            flexDirection:"column",
        }
    }
    
   
}))

const SignupFirebase = () => {
    

    const classes = useStyles();
    return (
        <Box component="section" className={classes.root}>  
        
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square className={classes.bordertopcolor} >
        {/* <LinearProgress value={40} /> */}
        <Box display="flex" flexDirection="column" p={3}>
            <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">

            <Typography component="h1" variant="h5" style={{marginBottom:"5%"}}>
                        SignUp
                        
          </Typography>
         <HttpsOutlinedIcon style={{marginBottom:"5%"}} />

            </Box>
            <Box className={classes.formfieldsalign}>
                <Box style={{marginBottom:"5%"}}>
                <TextField id="standard-basic" label="Firstname" fullWidth />
                </Box>
                
                <Box style={{marginBottom:"5%"}}>
                <TextField id="standard-basic" label="Lastname" fullWidth />
                </Box>
                </Box> 
          <TextField id="standard-basic" label="Email" style={{marginBottom:"5%"}} />
          <TextField id="standard-adornment-password" label="Password" style={{marginBottom:"5%"}} />
          
          <Button color="primary" variant="contained" classes={{label:classes.root.label}} style={{marginTop:'3%'}}>
            Sign Up
            </Button>

            <Box display="flex" alignContent="center" justifyContent="center" mt={3}>
            Already have an account ? <Link to="/admin/signin" style={{ textDecoration: 'none',color:'inherit' }}>Sign in</Link>
            </Box>
            
</Box>
        
      
      
        </Grid>     
            
            
            
            
        
        </Box>
    )
}

export default SignupFirebase
