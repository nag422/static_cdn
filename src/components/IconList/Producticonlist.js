import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import { FaceRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Producticonlist(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value,chiplable) => () => {
    const currentIndex = props.chipdata.indexOf(chiplable);
    console.log(currentIndex)
    const newChecked = [...props.chipdata];

    if (currentIndex === -1) {        
      newChecked.push(value);
      props.handleAddChip(chiplable)
      
    } else {
      newChecked.splice(currentIndex, 1);
      props.handleDeleteChip(chiplable,currentIndex)
      
    }

    setChecked(newChecked);
    // setChecked((chips) => chips.filter((chip, chipindex) => chipindex !== index));
    
    
  };

  return (
    <List dense className={classes.root}>
      {props.chipuser.map((value,index) => {
        const labelId = `checkbox-list-secondary-label-${value.title}`;
        return (
          <ListItem key={index} button>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${index + 1}`}
                src={'https://cdn2.iconfinder.com/data/icons/product-packaging-color-line/48/product_packaging_pixel_perfect_color_line_icons_2-cardboard-512.png'}
              ><FaceRounded />
              </Avatar>
            </ListItemAvatar>
            <ListItemText id={value.id} primary={value.title} />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={handleToggle(value.id,value.title)}
                checked={props.chipdata.indexOf(value.title) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
