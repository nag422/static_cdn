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
        <Select defaultValue="" id="grouped-select" value={props.selectedCategory} variant="outlined" name={props.label} onChange={props.handlecategoryChange}>
          <MenuItem value="">
            <em>Choose Option</em>
          </MenuItem>
          <ListSubheader>OTT Platform</ListSubheader>
          <MenuItem value={1}>YouTube</MenuItem>
          <MenuItem value={2}>Web Series</MenuItem>
          <MenuItem value={3}>OTT Content</MenuItem>
          <MenuItem value={4}>Short Form</MenuItem>
          <MenuItem value={5}>Long Form</MenuItem>
          <MenuItem value={6}>Movie</MenuItem>
          <MenuItem value={7}>Long Form</MenuItem>      
          <ListSubheader>Independent</ListSubheader>
          <MenuItem value={8}>Music</MenuItem>
          <MenuItem value={9}>Original Songs</MenuItem>
          <MenuItem value={10}>Content Transalation Theme</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
