import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import FullscreenOutlinedIcon from '@material-ui/icons/FullscreenOutlined';
import Grow from '@material-ui/core/Grow';
import Hidden from '@material-ui/core/Hidden';
import Switch from '@material-ui/core/Switch';
// Side Drawer
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import SendIcon from '@material-ui/icons/Send';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';
import clsx from 'clsx';
import { Box, Collapse, ListSubheader, Paper } from '@material-ui/core';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Link } from 'react-router-dom';
import SimpleList from '../ListSimple/SimpleList'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import Brightness6Icon from '@material-ui/icons/Brightness6';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import { useDispatch, useSelector } from 'react-redux';
import { signoutUser, themodechanger } from '../../actions/AuthActions'
import { Scrollbars } from 'react-custom-scrollbars';
import PublishIcon from '@material-ui/icons/Publish';
// Side Drawer

const drawerWidth = 250;
const useStyles = makeStyles((theme) => ({
  root: {},
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    // display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      wrap: 'noWrap'
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    }

  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width,padding'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
    '&:focus': {

      paddingRight: theme.spacing(10),
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    zIndex: theme.zIndex.drawer + 1,
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  //   Drawer styles
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  drawerPaper: {
    // backgroundImage: 'url(https://reactify.theironnetwork.org/static/media/sidebar-4.34aa4bc1.jpg)',
    backgroundColor: theme.palette.primary.contrastText

  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  drawerOpen: {
    width: 'auto',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: 0,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    [theme.breakpoints.down('sm')]: {
      width: 0,
    }
  },
  logo: {

    padding: theme.spacing(2, 0),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,

    [theme.breakpoints.down('md')]: {

      padding: theme.spacing(1.6, 0),
    },
  },
  logod: {
    position: 'fixed',
    width: '20%',
    padding: theme.spacing(2, 0),
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,

    [theme.breakpoints.down('md')]: {
      position: 'relative',
      width: '100%',
      padding: theme.spacing(1.6, 0),
    },
  },

  // End Drawer styles
  nested: {
    paddingLeft: theme.spacing(4),
  },
  listItemText: {
    fontSize: '1em',//Insert your required size
  },
  modechanger: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center'
  }


}));

const AdminHeader = (props) => {
  const dispatch = useDispatch()
  const response = useSelector(state => state.profileops.profile.user_ptr)
  const profileresponse = useSelector(state => state.profileops.profile)

  const { anchor, sidebardrawer } = props;
  const classes = useStyles();
  const [isdrawer, setIsdrawer] = React.useState(false)
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [switchstate, setSwitchstate] = React.useState(true);

  const switchhandleChange = (event) => {
    setSwitchstate(!switchstate);
    dispatch(themodechanger())
  };
  const [collapseopen, setCollapseopen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notifyanchorEl, setNotifyanchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const isNotificationOpen = Boolean(notifyanchorEl);


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleNotificationMenuOpen = (event) => {
    setNotifyanchorEl(event.currentTarget);
  };

  const handleNotifyClose = () => {
    setNotifyanchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // Logout auth

  const handleLogout = async (event) => {
    await dispatch(signoutUser())
    await handleMenuClose()
    return;

  }


  const handle = useFullScreenHandle();

  const myref = React.useRef()
  //   Side Drawer

  const toggleDrawer = (anchor, open) => (event) => {
    setIsdrawer(!isdrawer)
    sidebardrawer()
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // End Side Drawer

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      style={{ top: 40 }}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      elevation={1}
    >
      <Link to="/admin/profile" style={{ textDecoration: "none", color: "inherit" }}><MenuItem onClick={handleMenuClose}>Profile</MenuItem></Link>
      {/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const renderMenuSimplelist = (
    <>
      <Menu
        style={{ top: 40 }}
        anchorEl={notifyanchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isNotificationOpen}
        onClose={handleNotifyClose}
        elevation={1}
      >

        {/* <MenuItem onClick={handleMenuClose}><SimpleList /></MenuItem> */}

        {/* <SimpleList ref={myref} /> */}

      </Menu>

    </>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      style={{ top: 40 }}
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      elevation={0}
    >
      {/* <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"

        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>

      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );


  const list = (anchor) => (

    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    // onClick={toggleDrawer(anchor, false)}
    // onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box display="flex" alignItems="center" justifyContent="space-around" className={classes.logod}>
        <Typography className={classes.title} variant="h6" noWrap>
          Contentbond
          </Typography>
        <Hidden smUp>
          <IconButton onClick={() => setIsdrawer(!isdrawer)} size="small">
            <MenuOpenIcon fontSize="small" style={{ color: '#fff' }} /></IconButton>
        </Hidden>

      </Box>
      <List
        style={{ paddingTop: '25%' }}
        component="nav"
        aria-labelledby="available-content"
        // subheader={
        //   <ListSubheader component="div" id="available-content">
        //     Content
        //   </ListSubheader>
        // }
        className={classes.root}


      >
        <Link to="/admin/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        {profileresponse.content == "creator" && !response.is_superuser ?
          <Link to="/admin/upload" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem button>
              <ListItemIcon>
                <PublishIcon />
              </ListItemIcon>
              <ListItemText primary="Upload" />
            </ListItem>
          </Link>
          : null}
        {response.is_superuser ?
          <>

            <Link to="/admin/users" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem button>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItem>
            </Link>
            <Link to="/admin/groups" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem button>
                <ListItemIcon>
                  <GroupWorkIcon />
                </ListItemIcon>
                <ListItemText primary="Groups" />
              </ListItem>
            </Link>
            <Link to="/admin/upload/product" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem button>
              <ListItemIcon>
                <PublishIcon />
              </ListItemIcon>
              <ListItemText primary="UploadProduct" />
            </ListItem>
          </Link>
          </>
          : null}



        {response.is_superuser &&

          <Link to="/admin/contentadmin" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem button>
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Explore (Admin) " />
            </ListItem>
          </Link>
        }

        {!response.is_superuser &&
          <Link to="/admin/content" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem button>
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary={profileresponse.content == "creator" ? "Myuploads" : "Explore"} />
            </ListItem>
          </Link>
        }
        {profileresponse.content == "producer" && !response.is_superuser ?
          <>
            <Link to="/admin/favorite" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem button>
                <ListItemIcon>
                  <FavoriteIcon />
                </ListItemIcon>
                <ListItemText primary="Favorite" />
              </ListItem>
            </Link>

            <Link to="/admin/interested" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem button>
                <ListItemIcon>
                  <LocalMallIcon />
                </ListItemIcon>
                <ListItemText primary="Interested" />
              </ListItem>
            </Link>
          </>



          : null}
        {response.is_superuser &&
          <Link to="/admin/requests" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem button>
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary="Requests" />
            </ListItem>
          </Link>
        }

        {profileresponse.content == "producer" && !response.is_superuser ?

          <Link to="/admin/recommended" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem button>
              <ListItemIcon>
                <DynamicFeedIcon />
              </ListItemIcon>
              <ListItemText primary="Recommended" />
            </ListItem>
          </Link>
          : null}



        {!response.is_superuser ?
          <Link to="/admin/contentrequest" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem button>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="Request" />
            </ListItem>
          </Link>
          : null}
        {/* <ListItem button>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItem> */}

        <ListItem button onClick={() => setCollapseopen(!collapseopen)}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          {collapseopen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={collapseopen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItem>
          </List>
        </Collapse>
      </List>
      <Divider />
      {/* <ListItem button>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItem> */}
      {/* <Box className={classes.modechanger} pt={4}>
      <Switch
        checked={switchstate.checkedB}
        onChange={switchhandleChange}
        color="primary"
        name="checkedB"
        size="small"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      </Box> */}

      <ListItem button onClick={switchhandleChange}>
        <ListItemIcon>
          {switchstate ? <Brightness7Icon /> : <Brightness6Icon />}
        </ListItemIcon>
        <ListItemText primary="Theme Mode" />
      </ListItem>

    </div>

  );

  return (
    <>

      <div className={classes.root}>

        <Drawer
          variant="permanent" 
          // variant="persistent"
          // classes={{ paper:classes.drawerPaper}} 
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: isdrawer,
            [classes.drawerClose]: !isdrawer,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: isdrawer,
              [classes.drawerClose]: !isdrawer,
            }),
          }}
          anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>

          {list(anchor)}

        </Drawer>


        <div className={classes.grow}>
          <AppBar position="fixed" className={clsx(classes.appBar, {
            [classes.appBarShift]: isdrawer,
          })}>

            <Toolbar className='toolbarcolor'>
              {!isdrawer &&

                <Box display="flex" alignItems="center" justifyContent="center" className={classes.logo}>
                  <Typography className={classes.title} variant="h6" noWrap>
                    Contentbond
              </Typography>
                </Box>
              }


              <IconButton
                onClick={toggleDrawer(anchor, true)}
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                style={{ border: '1px solid gray', marginLeft: `${drawerWidth - 195}px` }}

              >
                <MenuIcon fontSize="small" />
              </IconButton>




              {/* 
          <Hidden only={['sm', 'xs']}>
    
    
          <Grow in={true}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          </Grow>
          </Hidden> */}

              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>


                {/* <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">                
                <NotificationsIcon />
              </Badge>
            </IconButton> */}


                {/* 
            <IconButton
              
              aria-label="show 17 new notifications"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleNotificationMenuOpen}
              color="inherit"
            >
              <Badge badgeContent={17} color="secondary">
              <MailIcon />
              </Badge>
              
            </IconButton> */}



                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>



              </div>


              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />

                </IconButton>
              </div>
            </Toolbar>

          </AppBar>
          {renderMobileMenu}
          {renderMenu}

          {renderMenuSimplelist}



        </div>

      </div>

    </>
  );
}
export default AdminHeader;