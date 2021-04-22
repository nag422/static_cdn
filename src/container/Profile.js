import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@material-ui/core'

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ProfileUpdatePrimary, ProfileUpdateSecondary, getProfileData } from '../actions/ProfileActions'
import { bindActionCreators } from 'redux';
import Alert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import { adminProfileState } from 'reducers/selectors/ProfileSelector';
import { adminProfileUpdateState } from 'reducers/selectors/ProfileSelector';
import CircularProgress from '@material-ui/core/CircularProgress';
import { updateSecondaryProfile } from './api/userapi'
export class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      address: "",
      postalcode: "",
      phone: "",
      city: "",
      country: "",
      content: ""
    }
  }

 

  componentDidMount() {
    // console.log('didmount',this.props.data)
    // getProfileData({user:'nagendra',history:this.props.history})
    // alert('stoppedn in component did mount')

    const LoadStatedata = async() => {
      let dataprops = this.props.data


    return await this.setState(() => ({

      first_name: dataprops.user_ptr.first_name,
      last_name: dataprops.user_ptr.last_name,
      email: dataprops.user_ptr.email,
      address: dataprops.address,
      postalcode: dataprops.postalcode,
      phone: dataprops.phone,
      city: dataprops.city,
      country: dataprops.country,
      content: dataprops.content
    })
    )

    }
    
    LoadStatedata()

    // if (this.state.email == ""){
    //   this.props.history.push('/admin/dashboard')
    // }



  }

  // shouldComponentUpdate(nextProps,nextState) {
  //   // Rendering the component only if 
  //   // passed props value is changed

  //   // if (nextProps.profileloading !== this.props.profileloading) {
  //   //   return true;
  //   // } else {
  //   //   return false;
  //   // }
  //   console.log('should update')
  //   return true
  // }

  // componentDidUpdate(){
  //   console.log('did update')
  //   // getProfileData({user:'nagendra',history:this.props.history})




  // }




  handleChange = (e) => {
    this.setState((state, props) => ({
      [e.target.name]: e.target.value
    }));
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    return await this.props.primaryprofileupdate({
      data: this.state,
      payload: this.props.history
    })
  }

  handleSubmit2 = async (event) => {
    event.preventDefault();
    await updateSecondaryProfile(this.state)

  }




  render() {
    return (

      <Grid container spacing={2}>
        {this.props.profileloading === true ? <CircularProgress /> : <>
          <Grid item md={8}>

            <Card>

              {this.props.updateprops.updatestatus &&
                <Alert severity="success">Successfully Updated!</Alert>
              }
              {this.props.updateprops.updaterror &&
                <Alert severity="error">Update is Failed!</Alert>
              }
              <CardHeader title="Profile">

              </CardHeader>
              <CardContent>


                <form noValidate autoComplete="off" method="post" onSubmit={this.handleSubmit}>
                  <Box display="flex" p={2} pl={4} flexDirection="row" justifyContent="space-between" alignItems="center">
                    <TextField onChange={this.handleChange} name="first_name" style={{ margin: 3 }} id="filled-basic" label="FirstName" variant="outlined" fullWidth value={this.state.first_name} />
                    <TextField onChange={this.handleChange} name="last_name" style={{ margin: 3 }} id="filled-basic" label="LastName" variant="outlined" fullWidth value={this.state.last_name} />
                  </Box>
                  <Box p={2} pl={4} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                    <TextField onChange={this.handleChange} style={{ margin: 3 }} name="email" id="filled-basic" label="Email" variant="outlined" fullWidth value={this.state.email} />
                  </Box>
                  <Box p={2} pl={4} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                    <Button color="primary" variant="contained" type="submit">Update</Button>
                  </Box>
                </form>
                <Box pt={4}>
                  <Divider />

                </Box>

                <Box pt={2}>
                  {this.props.updateprops.updatestatus &&
                    <Alert severity="success">Successfully Updated!</Alert>
                  }
                  {this.props.updateprops.updaterror &&
                    <Alert severity="error">Update is Failed!</Alert>
                  }
                  <Typography component='h3' variant='body2'>
                    Contact Information
                </Typography>
                </Box>
                <Box>
                  <form noValidate autoComplete="off" method="post" onSubmit={this.handleSubmit2}>
                    <Box p={4} alignItems="center">
                      <TextField id="filled-basic" onChange={this.handleChange} name="address" label="Address" variant="outlined" fullWidth value={this.state.address} />
                      <TextField id="filled-basic" onChange={this.handleChange} name="postalcode" label="PostalCode" variant="outlined" fullWidth style={{ marginTop: 40 }} value={this.state.postalcode} />
                      <TextField style={{ margin: 3, marginTop: 40 }} onChange={this.handleChange} name="phone" id="filled-basic" label="Phone" variant="outlined" fullWidth value={this.state.phone} />
                    </Box>

                    <Box p={4} pt={1} display="flex" flexDirection="row" justifyContent="space-between" alignItems="flex-start">
                      <TextField style={{ margin: 3 }} onChange={this.handleChange} name="city" id="filled-basic" label="City" variant="outlined" fullWidth value={this.state.city} />
                      <TextField style={{ margin: 3 }} onChange={this.handleChange} name="country" id="filled-basic" label="Country" variant="outlined" fullWidth value={this.state.country} />
                    </Box>

                    <Box pl={4}>
                      <Button type="submit" color="primary" variant="contained">Update</Button>
                    </Box>
                  </form>
                </Box>

              </CardContent>

            </Card>

            <Card>
              <CardHeader title="Collections"></CardHeader>
              <CardContent>
                <Box display="flex" flexDirection="row" justifyContent="space-between">
                  <Link to="/admin/favorite">
                    <ListItem button>
                      <ListItemIcon>
                        <FavoriteIcon />
                      </ListItemIcon>
                      <ListItemText primary="Favorites" />
                    </ListItem>
                  </Link>
                  <Link to="/admin/interested">



                    <ListItem button>
                      <ListItemIcon>
                        <LocalMallIcon />
                      </ListItemIcon>
                      <ListItemText primary="Interests" />
                    </ListItem>
                  </Link>
                  <Link to="/admin/recommended">


                    <ListItem button>
                      <ListItemIcon>
                        <DynamicFeedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Assigned" />
                    </ListItem>

                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4} xs={12} sm={12}>

            <Card>
              <CardHeader subheader={
                <Box display="flex" justifyContent="space-between">
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"

                  >
                    Connect
                    </Button>
                  <Link to="/admin/messages">
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"

                    >
                      Message
                    </Button>
                  </Link>
                </Box>
              }>

              </CardHeader>
              <CardContent>
                <Box display="flex" justifyContent="center" style={{ position: 'relative' }}>
                  <Box component="img" alt="profile" src={require('../assets/img/user-4.jpg').default} style={{ borderRadius: '50%', height: '150px', width: '150px' }} />
                </Box>
                <Box display="flex" flexDirection="row" justifyContent="space-between" p={3}>
                  <Typography component='p' variant='body2' >Joined On:  <br></br>{JSON.stringify(Date())}</Typography>
                  <Typography component='p' variant='body2' >Category:  {this.state.content}</Typography>

                </Box>

              </CardContent>

            </Card>
          </Grid>
        </>
        }

      </Grid>


    )
  }
}

const mapStateToProps = state => ({
  // data: adminProfileState(state),
  data: state.profileops.profile,
  updateprops: adminProfileUpdateState(state.profileops),
  profileloading: state.profileops.profileloading
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getProfileData,
    primaryprofileupdate: ProfileUpdatePrimary,
    secondaryprofileupdate: ProfileUpdateSecondary
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
