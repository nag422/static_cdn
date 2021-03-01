import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker,
} from '@material-ui/pickers';
// import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const DatePickers = (props) => {
  const classes = useStyles();

  

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Box className={classes.container} pt={2}>
      <KeyboardDatePicker
          disableToolbar
          name={props.label}
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label={props.label}
          value={props.selectedDate}
          onChange={props.handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      
      
    </Box>
   
    
    </MuiPickersUtilsProvider>
   
  );
}
export default DatePickers;