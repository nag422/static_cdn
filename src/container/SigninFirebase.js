import React, { useCallback, useEffect } from "react";
import {
  Button,
  Paper,
  Box,
  Grid,
  Typography,
  TextField,
  LinearProgress,
} from "@material-ui/core";

import { fade, makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import HttpsOutlinedIcon from "@material-ui/icons/HttpsOutlined";
import { Link, Redirect } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikField from "../components/formikcontrol/FormikField";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useSelector, useDispatch } from "react-redux";

import { signinUser } from "../actions";

const useStyles = makeStyles((theme) => ({
  root:{
    position:'relative'
  },
  root2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    height: "100vh",
    padding: 10,
    backgroundColor: "#fff",
    label: {
      textTransform: "capitalize",
    },
    signinform: {},
    "& .FormikField": {
      marginTop: "5%",
    },
    "& .MuiInputBase-input": {
      backgroundColor: grey[100],
      outline: "none",
      borderRadius: 5,
    },
    "& .MuiInputLabel-formControl": {
      color: grey[800],
    },
    "& .Mui-disabled": {
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
      cursor: "no-drop",
    },
  },
  bordertopcolor: {
    borderTop: `8px solid ${theme.palette.primary.main}`,
    borderRadius: 10,
    marginTop: "-10%",
  },
  pageTitle: {
    position: "relative",
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    placeContent: "center",
    paddingTop: "5%",

    // alignItems:'center',
    // left:'44vw',
    // top:"26%",
    // height: "1vh",
    // padding:10
    [theme.breakpoints.down("sm")]: {
      position: "static",
     
      // left:"30%",
      left: 0,
      right: 0,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
}));
const loginschema = Yup.object().shape({
  email: Yup.string()
    .min(2, "Too Short!")
    .required("Username or Email is should not be empty"),
  password: Yup.string()
    .min(8, "Too Short!")
    .required("Password is should not be empty"),
  // .matches(
  //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  //   )
});
const initialValues = {
  email: "",
  password: "",
};
const SigninFirebase = (props) => {
  const [iserror, setIserror] = React.useState(true);
  const [issubmitting, setIssubmitting] = React.useState(false);
  const classes = useStyles();

  const dispatch = useDispatch();
  const response = useSelector((state) => state.authUser);
  
  useEffect(() => {
    
      if (response.isAuthenticated) props.history.push('/admin/dashboard');
      return () => {
          
      }
  }, [props.history])

  const handleSubmit = async (values) => {
    
    console.log(values);
    // setIssubmitting(true);
    setIserror(false)
    const data = {
      email: values.email,
      password: values.password,
    }
    const history = props.history
    
  await dispatch(
    signinUser(
        data,
      history
    )
  );
  // return setIssubmitting(false);
  };

  const onUserLogin = useCallback(() => {
      const data = {
        email: "trisha",
        password: "Google@123",
      }
      const history = props.history
      
    dispatch(
      signinUser(
          data,
        history
      )
    );
    
   
  }, []);

  return (
    <>
      {iserror && (
        <Alert
          severity="error"
          onClose={() => {
            setIserror(false);
          }}
        >
          Login attempt is failed. check credentials !
        </Alert>
      )}

      {response ? response.email : "no waste"}

      
      <Box component="section" className={classes.root}>
         {/* <Box className={classes.pageTitle}>
         
          <Typography component="h4" variant="h4">
            MoviePlex
          </Typography>
      </Box> */}
      <Box className={classes.root2}>
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
                component="h5"
                variant="h5"
                style={{ marginBottom: "5%" }}
              >
                Sign in
              </Typography>
              <HttpsOutlinedIcon style={{ marginBottom: "5%" }} />
            </Box>

            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={loginschema}
            >
              {({ dirty, isValid }) => {
                return (
                  <Form>
                    <FormikField
                      name="email"
                      label="Username"
                      type="text"
                      required                      
                      textvariant="standard"
                    />

                    <FormikField
                      name="password"
                      label="Password"
                      type="password"
                      required                      
                      textvariant="standard"
                    />
                    {/* <TextField id="standard-basic" label="Username" style={{marginBottom:"5%"}} required />
          <TextField id="standard-adornment-password" label="Password" style={{marginBottom:"5%"}} required /> */}

                    <Button
                      type="submit"
                      disabled={!dirty || !isValid}
                      fullWidth
                      color="primary"
                      variant="contained"
                      classes={{
                        label: classes.root.label,
                        disabled: classes.disabledButton,
                      }}
                      style={{ marginTop: "5%" }}
                    >
                      {issubmitting && (
                        <CircularProgress
                          color="secondary"
                          size={20}
                          thickness={4.8}
                        />
                      )}{" "}
                      Sign In
                    </Button>
                  </Form>
                );
              }}
            </Formik>

            <Box
              display="flex"
              alignContent="center"
              justifyContent="space-between"
              mt={3}
            >
              <Typography component="h5" variant="body2">
                Don't have an account ?{" "}
                <Link
                  to="/auth/signup"
                  style={{ textDecorationColor: "none", color: "inherit" }}
                >
                  Sign up
                </Link>
              </Typography>
              <Typography component="h5" variant="body2">
                <Link
                  to="/auth/reset"
                  style={{ textDecorationColor: "none", color: "inherit" }}
                >
                  Forgot Password ?
                </Link>
              </Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" mb={2}>
            <Button color="primary" variant="contained" onClick={(e)=>onUserLogin(e)}>
              google login
            </Button>
          </Box>
        </Grid>
      </Box>
      </Box>
    </>
  );
};

export default SigninFirebase;
