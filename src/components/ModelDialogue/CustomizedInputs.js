import React from 'react';
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { green } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Box } from '@material-ui/core';
import { ErrorMessage, Field } from "formik";
import FormikField from '../formikcontrol/FormikField';
// const CssTextField = withStyles({
//   root: {
//     '& label.Mui-focused': {
//       color: 'green',
//     },
//     '& .MuiInput-underline:after': {
//       borderBottomColor: 'green',
//     },
//     '& .MuiOutlinedInput-root': {
//       '& fieldset': {
//         borderColor: 'red',
//       },
//       '&:hover fieldset': {
//         borderColor: 'yellow',
//       },
//       '&.Mui-focused fieldset': {
//         borderColor: 'green',
//       },
//     },
//   },
// })(TextField);

// const BootstrapInput = withStyles((theme) => ({
//   root: {
//     'label + &': {
//       marginTop: theme.spacing(3),
//     },
//   },
//   input: {
//     borderRadius: 4,
//     position: 'relative',
//     backgroundColor: theme.palette.common.white,
//     border: '1px solid #ced4da',
//     fontSize: 16,
//     width: 'auto',
//     padding: '10px 12px',
//     transition: theme.transitions.create(['border-color', 'box-shadow']),
//     // Use the system font instead of the default Roboto font.
//     fontFamily: [
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(','),
//     '&:focus': {
//       boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
//       borderColor: theme.palette.primary.main,
//     },
//   },
// }))(InputBase);

const useStylesReddit = makeStyles((theme) => ({
  root: {
    flex:1,
    position:'relative',    
    border: '1px solid #e2e2e1',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#fcfcfb',
    marginBottom:"2%",
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      backgroundColor: '#fff',
    },
    '&$focused': {
      backgroundColor: '#fff',
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
  focused: {},
}));

function RedditTextField(props) {
  const classes = useStylesReddit();
  // const { name:"formik", label:"formiklable", type : "text", required : false, textvariant:false} = props
  console.log(props)

  return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent:'center',
    alignContent:'center',
    flexWrap: 'wrap',
    
    
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

// const ValidationTextField = withStyles({
//   root: {
//     '& input:valid + fieldset': {
//       borderColor: 'green',
//       borderWidth: 2,
//     },
//     '& input:invalid + fieldset': {
//       borderColor: 'red',
//       borderWidth: 2,
//     },
//     '& input:valid:focus + fieldset': {
//       borderLeftWidth: 6,
//       padding: '4px !important', // override inline-style
//     },
//   },
// })(TextField);

// const theme = createMuiTheme({
//   palette: {
//     primary: green,
//   },
// });

export default function CustomizedInputs(props) {
  const classes = useStyles();

  return (
    <Box className={classes.root} noValidate style={{marginTop:"1%"}}>
     
     {props.fields.map((val,index)=>(
       
   
    <RedditTextField
      variant='filled'
      required={true}
      autoComplete="off"
      label={val.label}
      name={'redditname'}
      fullWidth
      type={'text'}
      id={`${val.label}-input`}
      key={index}
      helperText={<ErrorMessage name={'name'} style={{color:'red'}} />}
 /> 


    
 
    

     ))} 

    
        
     
        
      

      
    </Box>
  );
}
