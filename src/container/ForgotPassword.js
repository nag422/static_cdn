import React from "react";
import {
  Button,
  Paper,
  Box,
  Grid,
  Typography,
  TextField
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import HttpsOutlinedIcon from "@material-ui/icons/HttpsOutlined";
import { Link } from "react-router-dom";

import { passwordReset } from './api/authapi';
import { Alert, AlertTitle } from "@material-ui/lab";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
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
  pageTitle: {
    position: "absolute",
    left: "44vw",
    top: 80,
    // height:'4vh',
    // padding:10
    [theme.breakpoints.down("md")]: {
      top: 100,
      left: "28vw",
    },
  },
}));

const ForgotPassword = () => {
  const classes = useStyles();
  const [email, setEmail] = React.useState();
  const [issubmitting, setIssubmitting] = React.useState(false);
  const [open, setOpen] = React.useState(false)
  const [usercreatedmessage, setUsercreatedmessage] = React.useState('')
  const [alertseverity, setAlertseverity] = React.useState('success')

  const passwordResetform = async (e) => {
    e.preventDefault();
    setIssubmitting(true);
    const resp = await passwordReset({ email: email, actions: "forgotpassword" })

    if(resp.status == 200){
      setOpen(true)
      setUsercreatedmessage(resp.message)
      setAlertseverity('success')
    }else{
      setOpen(true)
      setUsercreatedmessage('Something is Went Wrong!')
      setAlertseverity('error')
    }
    setIssubmitting(false);

    
  }
  return (
    <>
      {/* <Box className={classes.pageTitle}>
        <Typography component="h4" variant="h4">
          MoviePlex
        </Typography>
      </Box> */}
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
          {open ?
          <Alert severity={alertseverity == "success" ? "success":"error"}>
            <AlertTitle>{alertseverity == "success" ? "Success":"Error"}</AlertTitle>
            {usercreatedmessage} — <strong>{alertseverity == "success" ? "Check your inbox":"Try Again!"}</strong>
          </Alert>
:null}
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
                Reset Your Password
              </Typography>
              <HttpsOutlinedIcon style={{ marginBottom: "5%" }} />
            </Box>
            <form method="post" onSubmit={passwordResetform}>
              <Box display="flex" flexDirection="column">
                <TextField
                  id="standard-basic"
                  label="Email"
                  type="email"
                  vaue={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ marginBottom: "5%" }}
                  required
                />

                <Button
                  color="primary"
                  variant="contained"
                  classes={{ label: classes.root.label }}
                  style={{ marginTop: "3%" }}
                  type="submit"
                >
                   {issubmitting && (
                        <CircularProgress
                          color="secondary"
                          size={20}
                          thickness={4.8}
                        />
                      )}{" "}
                  Reset
            </Button>
              </Box>
            </form>
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
                  to="/auth/signin"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Back
                </Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default ForgotPassword;
