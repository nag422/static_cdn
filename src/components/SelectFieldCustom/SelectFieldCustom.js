import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  
  
  formControl: {
    margin: theme.spacing(1,0),
    minWidth: 220,
    backgroundColor:grey[50],
    // border:'1px solid gray',
    '& .MuiInputLabel-shrink':{
        top:5,
        left:10
    }
    
  },
}));



export default function SelectFieldCustom(props) {
  const classes = useStyles();
  

  return (
    <div>
     
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-select">{props.fieldname}</InputLabel>
        <Select defaultValue="user" id="grouped-select" variant="outlined">
          <MenuItem value="">
            <em>Choose Option</em>
          </MenuItem>
          <ListSubheader>{props.header}</ListSubheader>
          {props.itemslist.map((val,index) => {
              return <MenuItem key={index} value={val.value}>{val.label}</MenuItem>
          })}
         
          
        </Select>
      </FormControl>
    </div>
  );
}
