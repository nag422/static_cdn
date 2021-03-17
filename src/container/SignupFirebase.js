import React from "react";
import {
  Button,
  Paper,
  Box,
  Grid,
  Typography,
  TextField,
  LinearProgress,
} from "@material-ui/core";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { fade, makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import HttpsOutlinedIcon from "@material-ui/icons/HttpsOutlined";
import { Link } from "react-router-dom";
import { signInWithGoogle } from "../firebase.utils";

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import {validatingUsername,RegisterAccount} from './api/authapi'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    // height: "100vh",
    padding: 10,
    backgroundColor: "#fff",
    label: {
      textTransform: "capitalize",
    },
    signinform: {},
    "& .MuiInputBase-input": {
      backgroundColor: grey[100],
      outline: "none",
      borderRadius: 5,
    },
    "& .MuiInputLabel-formControl": {
      color: grey[800],
    },
  },
  bordertopcolor: {
    borderTop: `8px solid ${theme.palette.primary.main}`,
    borderRadius: 10,
  },
  formfieldsalign: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
}));




// const initialValues = {
//   first_name: "",
//   last_name: "",
//   username:"",
//   email:"",
//   password:"",
//   phone:"",
//   category:"",
//   checkedB:""
// };

const SignupFirebase = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('creator');
  const [checked, setChecked] = React.useState(true);

  const [open, setOpen] = React.useState(false)
  const [alertseverity, setAlertseverity] = React.useState('success')
  const [registermessage, setRegistermessage] = React.useState('')



  const [isvalidUsername, setIsvalidUsername] = React.useState(true);
  const [isvalidEmail, setIsvalidEmail] = React.useState(true);
  const [isvalidPassword, setIsvalidPassword] = React.useState('');
  const [isvalidPhone, setIsvalidPhone] = React.useState(true);
  const [helperMessage, setHelperMessage] = React.useState({
    username:'',
    email:'',
    phone:''
  });

  // const [formValues, setFormValues] = React.useState({
  //     first_name: "",
  //     last_name: "",
  //     username:"",
  //     email:"",
  //     password:"",
  //     phone:"",
  //     category:"",
  //     checkedB:""
  //   });
function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
// Radios
  const handleChange = (event) => {
    setValue(event.target.value);
  };

// CheckBox
  const handleChecked = (event) => {
    setChecked(event.target.checked);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const form_data = new FormData(event.target)
    // console.log(form_data.get('category'))
    //  for (let [key, value] of form_data.entries()) {
    //         console.log(key, value);
    //     }



    const formValues = {
      
      first_name: form_data.get('first_name'),
      last_name: form_data.get('last_name'),
      username:form_data.get('username'),
      email:form_data.get('email'),
      password:form_data.get('password'),
      phone:form_data.get('phone'),
      category:form_data.get('category'),
      checkedB:checked
    }

    // if(FormValues.username== "" || (FormValues.username).length < 8){
    //   return alert('username is should be fill');
    // }
    const isVerify = (formValues.password).match(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/      
    )
  // if(isVerify){
  //       return setIsvalidPassword('')
  //     }else{
  //       return setIsvalidPassword("Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character")
  //     }
    var submitresponse = await RegisterAccount(formValues);

    
    if(submitresponse.status == 200){

       setRegistermessage("Successfully Changed")
    setOpen(true);
    setAlertseverity('success')
    

    }else{
      setRegistermessage("Something is went wrong")
    setOpen(true);
    setAlertseverity('error')
    }
   
    

  };

  const onChangeValidation = async (e) => {
    
    const data = {
      action:e.target.name,
      value:e.target.value
    }
    var respdata = await validatingUsername(data);
    if (!respdata.message){
      setHelperMessage({
        ...helperMessage,
        [e.target.name]: '" '+ e.target.value + '" is available'
      })
      if(data.action == "username"){
        setIsvalidUsername(true)
      }else if (data.action == "email"){
          setIsvalidEmail(true)
      }
      
    }else{
      setHelperMessage({
        ...helperMessage,
        [e.target.name]: '" '+ e.target.value + '" is not available'
      })
       if(data.action == "username"){
        setIsvalidUsername(false)
      }else if (data.action == "email"){
          setIsvalidEmail(false)
      }

    }
    
  }

  // SnackBar

     const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

  const vertical = "top"
  const horizontal = "right"

  return (
    <>
    <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertseverity}>
                    {registermessage}
                </Alert>
            </Snackbar>
     <form onSubmit={onSubmit} autoComplete="off">
    <Box component="section" className={classes.root}>
      <Grid
        item
        xs={12}
        sm={8}
        md={4}
        component={Paper}
        elevation={6}
        square
        className={classes.bordertopcolor}
      >
        {/* <LinearProgress value={40} /> */}
        <Box display="flex" flexDirection="column" p={3}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              component="h1"
              variant="h5"
              style={{ marginBottom: "5%" }}
            >
              SignUp
            </Typography>
            <HttpsOutlinedIcon style={{ marginBottom: "5%" }} />
          </Box>
          
          <Box className={classes.formfieldsalign}>
          
            <Box style={{ marginBottom: "5%" }}>
              <TextField
                type="text"
                name="first_name"
                id="standard-basic"
                label="Firstname (optional)"
                fullWidth
              />
            </Box>

            <Box style={{ marginBottom: "5%" }}>
              <TextField
                type="text"
                name="last_name"
                id="standard-basic"
                label="Lastname (optional)"
                fullWidth
              />
            </Box>
          </Box>
          <TextField
            
            error = {!isvalidUsername}
            name="username"
            id="standard-basic"
            label="Username"
            type="text"
            style={{ marginBottom: "5%" }}
            onChange = {onChangeValidation}
            helperText={helperMessage.username}
            autoComplete="nope"
            required
            
          />

          <TextField
            error = {!isvalidEmail}
            name="email"
            type="email"
            id="standard-basic"
            label="Email"
            style={{ marginBottom: "5%" }}
            onChange = {onChangeValidation}
            helperText={helperMessage.email}
            autoComplete="nope"
            required
            
          />
          <TextField
            error = {isvalidPassword != ""}
            name="password"
            type="password"
            id="standard-adornment-password"
            label="Password"
            style={{ marginBottom: "5%" }}
            helperText={isvalidPassword}
            required
          />
          <TextField
            name="phone"
            type="text"
            id="standard-adornment-phone"
            label="Phone"
            style={{ marginBottom: "5%" }}
            autoComplete="nope"
            required
          />

<FormControl component="fieldset">
      <FormLabel classes={{ label: classes.root.label }} component="legend">Category</FormLabel>
      <RadioGroup row aria-label="category" name="category" value={value} onChange={handleChange}>
        <FormControlLabel value="creator" control={<Radio />} label="Creator" />
        <FormControlLabel value="producer" control={<Radio />} label="Producer" />
        
      </RadioGroup>


    </FormControl>

          <Button
            color="primary"
            variant="contained"
            classes={{ label: classes.root.label }}
            style={{ marginTop: "3%" }}
            disabled = {!checked}
            type="submit"
          >
            Sign Up
          </Button>
          

          <FormControlLabel
          
        control={
          <Checkbox
            checked={checked}
            onChange={handleChecked}
            name="checkedB"
            color="primary"
            size="small"
          />
        }
        label={
          <Typography variant="caption" display="block" gutterBottom>
          By creating an account, you agree to the <a href="#">Terms of Services</a>
          </Typography>
          }
      />

          <Box
            display="flex"
            alignContent="center"
            justifyContent="center"
            mt={3}
          >
            Already have an account ?{" "}
            <Link
              to="/auth/signin"
              style={{ textDecorationColor: "none", color: "inherit" }}
            >
              Sign in
            </Link>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" mb={2}>
          <Button
            color="primary"
            variant="contained"
            onClick={signInWithGoogle}
          >
            google login
          </Button>
        </Box>
      </Grid>
    </Box>
    </form>
     </>
  );
 
};

export default SignupFirebase;
