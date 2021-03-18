import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField, Typography } from '@material-ui/core'

import React, { Component } from 'react'
import { connect } from 'react-redux';
import {getProfileData,ProfileUpdatePrimary,ProfileUpdateSecondary} from '../actions/AuthActions'
import { bindActionCreators } from 'redux';

export class Profile extends Component {

  componentDidMount(){
    const data ={
      user:51,
      history:this.props.history
    }
    this.props.getProfileData(data)
    
  }




  render() {
    return (

      <Grid container spacing={2}>
        <Grid item md={8}>

          <Card>
            <CardHeader title="Profile">

            </CardHeader>
            <CardContent>


              <form noValidate autoComplete="off">
                <Box display="flex" p={2} pl={4} flexDirection="row" justifyContent="space-between" alignItems="center">
                  <TextField style={{ margin: 3 }} id="filled-basic" label="FirstName" variant="outlined" fullWidth />
                  <TextField style={{ margin: 3 }} id="filled-basic" label="LastName" variant="outlined" fullWidth />
                </Box>
                <Box p={2} pl={4} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                  <TextField style={{ margin: 3 }} id="filled-basic" label="Email" variant="outlined" fullWidth />                  
                </Box>
                <Box p={2} pl={4} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                  <Button color="primary" variant="contained" type="submit">Update</Button>
                </Box>
              </form>
              <Box pt={4}>
                <Divider />

              </Box>

              <Box pt={2}>
                <Typography component='h3' variant='body2'>
                  Contact Information
                                </Typography>
              </Box>
              <Box>
                <form noValidate autoComplete="off">
                  <Box p={4} alignItems="center">
                    <TextField id="filled-basic" label="Address" variant="outlined" fullWidth />
                    <TextField id="filled-basic" label="PostalCode" variant="outlined" fullWidth style={{ marginTop: 40 }} />
                    <TextField style={{margin:3,marginTop: 40}} id="filled-basic" label="Phone" variant="outlined" fullWidth />
                  </Box>
                  
                  <Box p={4} pt={1} display="flex" flexDirection="row" justifyContent="space-between" alignItems="flex-start">
                    <TextField style={{ margin: 3 }} id="filled-basic" label="City" variant="outlined" fullWidth />
                    <TextField style={{ margin: 3 }} id="filled-basic" label="Country" variant="outlined" fullWidth />
                  </Box>

                  <Box pl={4}>
                    <Button color="primary" variant="contained">Update</Button>
                  </Box>
                </form>
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
                <Button
                  variant="contained"
                  size="small"
                  color="primary"

                >
                  Message
                    </Button>
              </Box>
            }>

            </CardHeader>
            <CardContent>
              <Box display="flex" justifyContent="center" style={{ position: 'relative' }}>
                <Box component="img" alt="profile" src={require('../assets/img/user-4.jpg').default} style={{ borderRadius: '50%', height: '150px', width: '150px' }} />
              </Box>
              <Box display="flex" flexDirection="row" justifyContent="space-between" p={3}>
                <Typography component='p' variant='body2' >Joined On:  <br></br>{JSON.stringify(Date())}</Typography>
                <Typography component='p' variant='body2' >Category:  Producer</Typography>

              </Box>

            </CardContent>

          </Card>
        </Grid>

      </Grid>


    )
  }
}

const mapStateToProps = state => ({
  data: state.authUser
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({      
      getProfileData,
      primaryprofileupdate:ProfileUpdatePrimary,
      secondaryprofileupdate:ProfileUpdateSecondary
  }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
