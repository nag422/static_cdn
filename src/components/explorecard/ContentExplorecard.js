import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { Menu, MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 'auto',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ContentExplorecard(props) {
  const classes = useStyles();

 


  const options = [
    'None',
    'Open',
    'Deactive',
    'Active',
    'Assign',

  ];


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} src={`http://localhost:8000/media/${props.val.thumbnail}`}>
            R
          </Avatar>
        }
        action={
          <>
            <IconButton aria-label="settings" onClick={handleClick} >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: 48 * 4.5,
                  width: '20ch',
                },
              }}
            >
              {options.map((option) => (
                <MenuItem key={option} selected={option === 'Active'} onClick={handleClose}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </>
        }
        title={props.val.title}
        subheader={props.val.created.toLocaleString()}
      />
      <CardMedia
        className={classes.media}
        image={`http://localhost:8000/media/${props.val.thumbnail}`}
        title={props.val.title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.val.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton color={props.val.isliked?'primary':'secondary'} aria-label="add to favorites" onClick={(e) => props.likefun(e,props.val.id)}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share" color={props.val.isfavored?'primary':'secondary'} onClick={(e) => props.interestfun(e,props.val.id)}>
          <LocalMallIcon />
        </IconButton>

      </CardActions>

    </Card>
  );
}
