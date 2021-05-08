import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Box, Button, Card, CardContent, Chip, Grid, Snackbar, Typography } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { getProductById } from 'sagas/api/api';
import ReactPlayer from 'react-player/lazy'
import LocalMallIcon from '@material-ui/icons/LocalMall';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
// import * as apirequest from '../../../api/api';
import * as apirequest from '../../container/api/api';
import { useSelector } from 'react-redux';
// import { Alert } from '@material-ui/lab';
import MuiAlert from '@material-ui/lab/Alert';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  imgcls: {
    width: '100%',
    height: 'auto'
  }
}));



const tileData = [
  {
    img: 'https://material-ui.com/static/images/grid-list/star.jpg',
    title: 'Image Title',
    author: 'Nagendra',
  },
  {
    img: 'https://material-ui.com/static/images/grid-list/bike.jpg',
    title: 'Image Title',
    author: 'Nagendra',
  },
  {
    img: 'https://material-ui.com/static/images/grid-list/olive.jpg',
    title: 'Image Title',
    author: 'Nagendra',
  }

];

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Detailcard = (props) => {
  const classes = useStyles();
  
  // const response = useSelector(state => state.profileops.profile.user_ptr)
  const profileresponse = useSelector(state => state.profileops.profile)

  const [post, setPost] = React.useState([]);
  const gethist = new URLSearchParams(props.location.search)
  const isinterest = gethist.get('interest')
  const islikesd = gethist.get('likes')
  const [favorite, setFavorite] = React.useState(null);
  const [like, setLike] = React.useState(null);

  const [open, setOpen] = React.useState(false)
  const [alertseverity, setAlertseverity] = React.useState('success')
  const [productmessage, setProductmessage] = React.useState('')


  React.useEffect(() => {

    const getsingleproduct = async () => {
      const data = await getProductById(props.match.params.id)

      setFavorite(isinterest)
      setLike(islikesd)

      if (data.obs.length > 0) {
        setPost(data.obs[0])
      }

    }

    getsingleproduct()




  }, [islikesd, isinterest, props.match.params.id])


  const addlikes = async (e, id) => {
    const response = await apirequest.addlike(id)
    if (+response.status === 200) {

      if (response.message == "liked") {
        
        setLike('false')
        
      }
      if (response.message == "unliked") {
        setLike('true')
      }
      
      setProductmessage(response.message)
      setOpen(true);
      setAlertseverity('success')

    } else {

      setProductmessage(response.message)
      setOpen(true);
      setAlertseverity('error')
    }

  }

  // SnackBar

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpen(false);
};

  const addfavorites = async (e, id) => {
    const response = await apirequest.addinterest(id)

    if (+response.status === 200) {

      if (response.message == "removedbuy") {
        setFavorite('false')
      }
      if (response.message == "addedbuy") {
        setFavorite('true')
      }
      
      setProductmessage(response.message)
      setOpen(true);
      setAlertseverity('success')

    } else {

      setProductmessage(response.message)
      setOpen(true);
      setAlertseverity('error')
    }


  }

  const vertical = "top"
  const horizontal = "right"

  return (
    <div className={classes.root}>

<Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertseverity}>
                    {productmessage}
                </Alert>
            </Snackbar>
      
      <Grid container spacing={2}>


        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Card style={{ padding: "2%",paddingLeft:"4%" }}>
            <Typography variant="h5" component="h3">Title: {post.title}</Typography><br></br>
            <Typography component="p" variant="subtitle1"><Chip size="small" color="primary" label="Description : "></Chip><br></br> {post.description}</Typography>
            <br></br>
            <Typography component="p" variant="subtitle1"><Chip size="small" color="primary" label={"Language : "}></Chip>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {post.language}</Typography>
            <br></br>
            <Typography component="p" variant="subtitle1"><Chip size="small" color="primary" label="Country : "></Chip>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {post.country}</Typography>
            <br></br>
            <Typography component="p" variant="subtitle1"><Chip size="small" color="primary" label="Rights : "></Chip>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {post.rights}</Typography>
            <br></br>
            <Typography component="p" variant="subtitle1"><Chip size="small" color="primary" label="Category : "></Chip>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {post.category}</Typography>
            <br></br>
            <Typography component="p" variant="subtitle1"><Chip size="small" color="primary" label="Genere : "></Chip>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {post.genre}</Typography>
            <br></br>
            <Typography component="p" variant="subtitle1"><Chip size="small" color="primary" label="Keywords : "></Chip>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {post.keywords}</Typography>
            <br></br>
            <Typography component="p" variant="subtitle1"><Chip size="small" color="primary" label="Region : "></Chip>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {post.rightsregion}</Typography>
            <br></br>
            <Typography component="p" variant="subtitle1"><Chip size="small" color="primary" label="Runtime(minuts) : "></Chip>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {post.runtime}</Typography>
            <br></br>
            <Typography component="p" variant="subtitle1"><Chip size="small" color="primary" label="No.of Videos : "></Chip>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {post.numbofvideos}</Typography>
            <br></br>
            <Typography component="p" variant="subtitle1"><Chip size="small" color="primary" label="Terms & Conditions : "></Chip>&nbsp;{post.termsconditions}</Typography>
            {profileresponse.content != "producer"?<>
            <br></br><Typography component="p" variant="subtitle1"><Chip size="small" color="primary" label="Cost : "></Chip>&nbsp;{post.price} Rs</Typography>
            </>:null}

            {/* <IconButton aria-label="share" color={favorite == "true" ? 'primary' : 'secondary'} onClick={(e) => addfavorites(e, post.id)}>
              <LocalMallIcon />
            </IconButton> */}


  {!profileresponse.user_ptr.is_superuser &&           
<Box mt={2} display="flex" flexDirection="row" justifyContent="space-between">

            <Button
              onClick={(e) => addfavorites(e, post.id)}
              variant="contained"
              color={favorite == "true" ? 'primary' : 'secondary'}
              className={classes.button}
              startIcon={<LocalMallIcon />}
            >
              {favorite == "true" ? "Added to list" : "Add to list"}
            </Button>
            


            {/* <IconButton aria-label="share" color={like == "true" ? 'primary' : 'secondary'} onClick={(e) => addlikes(e, post.id)}>
              <LocalMallIcon />
            </IconButton>
            {like == "true" ? "Added to favorites" : "Add to favorites"} */}




            <Button
              onClick={(e) => addlikes(e, post.id)}
              variant="contained"
              color={like == "true" ? 'primary' : 'secondary'}
              className={classes.button}
              startIcon={<FavoriteIcon />}
            >
              {like == "true" ? "Added to favorites" : "Add to favorites"}
            </Button>

            </Box>

          }
            
            <br></br>
            


            {/* <Button variant="outlined" color="primary" size="small" onClick={() => props.history.goBack()}>Back</Button> */}
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <div>
            <ReactPlayer className='reactplayer' 
                light = {`https://app.contentbond.com/media/${post.thumbnail}`}
                playIcon = {<PlayCircleOutlineIcon style={{color:"white",marginLeft:"-16%"}} fontSize="large" />}
                playing={false} controls={true} url={`https://app.contentbond.com/media/uploads/58339943_276469819969410_211101138701778944_n_XhFjQT5.mp4`} 
            />
          </div>
          <br></br>
          {/* <Chip color="secondary" size="small" label="Thumbnail:" />
          <div>
            <br></br>

            <img className={classes.imgcls} src={`https://app.contentbond.com/media/${post.thumbnail}`} alt="thumbnail" />
          </div> */}

        </Grid>


      </Grid>

      <Grid container spacing={2} style={{marginTop:"2%"}}>


        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Card>
            <CardContent>
              <Chip color="secondary" size="small" label="Banner1:" style={{marginBottom:"3%"}} />
              <img src={`https://app.contentbond.com/media/${post.thumbnail1}`} alt="thumbnail" style={{ width: '100%', height: 'auto' }} />
            </CardContent>
          </Card>
        </Grid>


        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Card>
            <CardContent>
              <Chip color="secondary" size="small" label="Banner2:" style={{marginBottom:"3%"}} />
              <img src={`https://app.contentbond.com/media/${post.thumbnail2}`} alt="thumbnail" style={{ width: '100%', height: 'auto' }} />
            </CardContent>
          </Card>
        
          {/* <Card>
            <CardContent>
              <Chip color="secondary" size="small" label="Banner3:" />
              <img src={`https://app.contentbond.com/media/${post.thumbnail3}`} alt="thumbnail" style={{ width: '100%', height: 'auto' }} />
            </CardContent>
          </Card> */}


        </Grid>
      </Grid>
      
      <Grid container spacing={2} style={{marginTop:"2%"}}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Card>
              <CardContent>
                <Chip color="secondary" size="small" label="Banner3:" style={{marginBottom:"2%"}} />
                <img src={`https://app.contentbond.com/media/${post.thumbnail3}`} alt="thumbnail3" style={{ width: '100%', height: 'auto' }} />
              </CardContent>
            </Card>
          </Grid>

      </Grid>

      {/* <GridList className={classes.gridList} cols={2.5}>


        <GridListTile>
          <img src={`https://app.contentbond.com/media/${post.thumbnail1}`} alt={post.title} />
          <GridListTileBar
            title={post.title}
            classes={{
              root: classes.titleBar,
              title: classes.title,
            }}
            actionIcon={
              <IconButton aria-label={`star ${post.title}`}>
                <StarBorderIcon className={classes.title} />
              </IconButton>
            }
          />
        </GridListTile>


        <GridListTile>
          <img src={`https://app.contentbond.com/media/${post.thumbnail2}`} alt={post.title} />
          <GridListTileBar
            title={post.title}
            classes={{
              root: classes.titleBar,
              title: classes.title,
            }}
            actionIcon={
              <IconButton aria-label={`star ${post.title}`}>
                <StarBorderIcon className={classes.title} />
              </IconButton>
            }
          />
        </GridListTile>

        <GridListTile>
          <img src={`https://app.contentbond.com/media/${post.thumbnail3}`} alt={post.title} />
          <GridListTileBar
            title={post.title}
            classes={{
              root: classes.titleBar,
              title: classes.title,
            }}
            actionIcon={
              <IconButton aria-label={`star ${post.title}`}>
                <StarBorderIcon className={classes.title} />
              </IconButton>
            }
          />
        </GridListTile>


      </GridList> */}
    </div>
  );
}

export default Detailcard
