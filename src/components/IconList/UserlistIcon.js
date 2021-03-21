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

export default function UserlistIcon(props) {
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
        const labelId = `checkbox-list-secondary-label-${value.username}`;
        return (
          <ListItem key={index} button>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${index + 1}`}
                src={'https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png'}
              ><FaceRounded />
              </Avatar>
            </ListItemAvatar>
            <ListItemText id={value.id} primary={value.username} />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={handleToggle(value.id,value.username)}
                checked={props.chipdata.indexOf(value.username) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
