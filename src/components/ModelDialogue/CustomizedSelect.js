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
    margin: theme.spacing(1),
    minWidth: 220,
    // backgroundColor:grey[50],
    // border:'1px solid gray',
    '& .MuiInputLabel-shrink':{
        top:5,
        left:10
    }
    
  },
}));



export default function CustomizedSelect(props) {
  const classes = useStyles();
  

  return (
    <div>
     
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-select">{props.fieldname}</InputLabel>
        <Select defaultValue={props.value?+props.value:''} id="grouped-select" value={props.selectedCategory} variant="outlined" name={props.label} onChange={props.handlecategoryChange}>
          <MenuItem value="">
            <em>Choose Option</em>
          </MenuItem>
          <ListSubheader>Content Type</ListSubheader>
          <MenuItem value={1}>General Video Content</MenuItem>
          <MenuItem value={2}>Youtube Content</MenuItem>
          <MenuItem value={3}>Web series content</MenuItem>
          <MenuItem value={4}>Ott content</MenuItem>
          <MenuItem value={5}>Movie content</MenuItem>
          <MenuItem value={6}>Shortform video content</MenuItem>
          <MenuItem value={7}>Longform video content</MenuItem>    
          <MenuItem value={8}>Music Content</MenuItem>
          <MenuItem value={9}>Others</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
