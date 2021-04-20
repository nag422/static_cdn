import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { getProductById } from 'sagas/api/api';
import ReactPlayer from 'react-player/lazy'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
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

const Detailcard = (props) => {
  const classes = useStyles();
  const [post, setPost] = React.useState([]);


  React.useEffect(() => {

    const getsingleproduct = async () => {
      const data = await getProductById(props.match.params.id)

      if (data.obs.length > 0) {
        setPost(data.obs[0])
      }

    }
    getsingleproduct()




  }, [])

  return (
    <div className={classes.root}>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <img src={`https://app.contentbond.com/media/${post.thumbnail}`} alt="thumbnail" style={{ width: '100%', height: 320 }} />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Typography variant="h5" component="h3">{post.title}</Typography>
          <Typography component="p" variant="body2">{post.description}</Typography>
          <Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center">
            <AttachMoneyIcon fontSize="small" /><Typography component="h6" variant="h6"> {post.price}</Typography>
          </Box>
          <Button variant="outlined" color="primary" size="small" onClick={() => props.history.goBack()}>Back</Button>

        </Grid>

      </Grid>

    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <div>
          <ReactPlayer className='reactplayer' playIcon playing={false} controls={true} url={`https://app.contentbond.com/media/uploads/58339943_276469819969410_211101138701778944_n_XhFjQT5.mp4`} />
          </div>
      </Grid>
    </Grid>

      <GridList className={classes.gridList} cols={2.5}>


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


      </GridList>
    </div>
  );
}

export default Detailcard
