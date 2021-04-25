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
import { Box, Chip, Menu, MenuItem } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import Moment from 'react-moment';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 'auto',
    minHeight: '520px'
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
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  }
}));

export default function ContentExplorecardAdmin(props) {
  const classes = useStyles();
  const history = useHistory();



  const options = [
    'in_stock',
    'is_active',


  ];


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleIsactive = async (e, id, action) => {
    setAnchorEl(null);
    await props.handleIsactivemain(id, action)

  };

  const detailPagenavigator = async(id,isinterested) => {
    history.push('/admin/section/'+id+'?interest='+isinterested)
  }

  // const handleInstock = (e,id) => {
  //   setAnchorEl(null);
  //   const response = cardapi.instock(id)
  //   if(response.status===200){
  //     alert('Success')
  //   }else{
  //     alert('Fail')
  //   }
  // };

  return (
    <Card className={classes.root}>
      <CardHeader
        // avatar={
        //   <Avatar aria-label="recipe" className={classes.avatar} src={`https://app.contentbond.com/media/${props.val.thumbnail}`}>
        //     R
        //   </Avatar>
        // }
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
              {options.map((val, index) => {
                return (
                  <MenuItem key={index} onClick={(e) => handleIsactive(e, props.val.id, val)}>
                    {val == "is_active" ? props.val[val] ? 'Deactivate' : 'Activate' : props.val.in_stock ? 'Private' : 'Public'}
                  </MenuItem>
                  // <MenuItem key={index+1} onClick={(e) => handleInstock(e,props.val.id,'stock')}>
                  //     {props.val.in_stock?'Private':'Public'}
                  // </MenuItem>


                )
              })



              }

            </Menu>
          </>
        }
        title={props.val.title.substring(0,48)}
        subheader={<Moment format="YYYY/MM/DD HH:MM:SS">{props.val.created.toLocaleString()}</Moment>}
        onClick={(e)=>detailPagenavigator(props.val.id,props.val.isfavored)}
      />
      <CardMedia
        className={classes.media}
        image={`https://app.contentbond.com/media/${props.val.thumbnail}`}
        title={props.val.title}
        onClick={(e)=>detailPagenavigator(props.val.id,props.val.isfavored)}
      />
      <CardContent>
      
            Author: <Link to={`/admin/profile/${props.val.author_id}`}> <Chip color="primary" label={props.val.customauthor} /> </Link>
            <br></br>
          
         
        

          {props.val.title}

      
<br></br>
          Requested By: <Link to={`/admin/profile/${props.val.likedby}`}><Chip color="primary" label= {props.val.likedbyname} /> </Link>



        
      </CardContent>

      {/* <CardActions disableSpacing>
        <IconButton color={props.val.isliked ? 'primary' : 'secondary'} aria-label="add to favorites" onClick={(e) => props.likefun(e, props.val.id)}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share" color={props.val.isfavored ? 'primary' : 'secondary'} onClick={(e) => props.interestfun(e, props.val.id)}>
          <LocalMallIcon />
        </IconButton>

      </CardActions> */}

    </Card>
  );
}
