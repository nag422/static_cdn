import { Box, Button, Card, CardContent, CardHeader, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import React from 'react'
import TableMaterialgroup from '../components/TableMaterial/TableMaterialgroup'
import axiosInstance from '../axiosinstance'

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '../components/alertcustom/alertcustom'

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import TableMaterialproducts from 'components/TableMaterial/TableMaterialproducts';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      justifyContent:'space-between',
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  }));
  
  function ScrollableTabsButtonAuto(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
      
    };
    
  
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="Products" {...a11yProps(0)} />
            {/* <Tab label="Messages" {...a11yProps(1)} /> */}
           
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <TableMaterialproducts selectedgroupslist={props.selectedproductslist} />
        </TabPanel>
        {/* <TabPanel value={value} index={1}>
          <TableMaterialgroup />
        </TabPanel> */}
        
      </div>
    );
  }

const UserGroups = () => {

    const [groupname,setGroupname] = React.useState('')
    const [rule,setRule] = React.useState('')

    const [open,setOpen] =  React.useState(false)
    const [usercreatedmessage,setUsercreatedmessage] =  React.useState('')
    const [alertseverity,setAlertseverity] =  React.useState('success')
    const [groupsitemslist,setGroupsitemslist] =  React.useState([])
    const [productitemslist,setProductitemslist] = React.useState([])


    const selectedproductslist = (selectedlist) => {
       
        setProductitemslist(selectedlist)
    }

    const selectedgroupslist = (selectedlist) => {
        
        setGroupsitemslist(selectedlist)
    }

    const productassign= async (e,action)=> {
        e.preventDefault();
        const body = new FormData();
        body.append('productdata',productitemslist)
        body.append('groupdata',groupsitemslist)
        body.append('action',action)

        console.log(productitemslist)
        console.log(groupsitemslist)


        await axiosInstance.post('admin/saveproductsforgroups/',body).then(res=> {
         

            if(res.data.status==200){
              setUsercreatedmessage("Product assigned is successfully")
              setOpen(true)
              setAlertseverity('success')
             
             
          }else{
              setUsercreatedmessage("Product assigned is Failed")
            setOpen(true);
            setAlertseverity('error')
  
          }
        }).catch(err=> {
            console.log(err.message)
            setUsercreatedmessage("Group Creation is Failed")
            setOpen(true);
            setAlertseverity('error')
  
        })
    }

 

    // SnackBar

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const body = new FormData();
      body.append('groupname',groupname)
      
      
      await axiosInstance.post('admin/creategroup/',body).then(res=> {
         

          if(res.data.status==200){
            setUsercreatedmessage("Group created successfully")
            setOpen(true)
            setAlertseverity('success')
           
           
        }else{
            setUsercreatedmessage("Group Creation is Failed")
          setOpen(true);
          setAlertseverity('error')

        }
      }).catch(err=> {
          console.log(err.message)
          setUsercreatedmessage("Group Creation is Failed")
          setOpen(true);
          setAlertseverity('error')

      })
      


    }



    const vertical = "top"
    const horizontal = "right"
    return (
        <div>
            <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertseverity}>
                {usercreatedmessage}
                </Alert>
            </Snackbar>
            <Grid container spacing={2}>
                <Grid item md={12}>
                    <Card>
                        <CardHeader title="Groups">

                        </CardHeader>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item md={12} xs={12} sm={12}>
                                    <TextField
                                        id="group"
                                        label="GroupName"
                                        variant="outlined"
                                        value={groupname}
                                        onChange = {(e) => setGroupname(e.target.value)}                                        

                                    />
                                    
                                </Grid>
                                

                                <Grid item>
                                    <Button variant="contained" color="primary" onClick={handleSubmit}>Create Group</Button>
                                </Grid>

                            </Grid>
                        </CardContent>
                    </Card>

                </Grid>


                <Grid item md={12}>
                    <Card>
                        {/* <CardHeader title="Groups">

                        </CardHeader> */}
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item md={12} xs={12} sm={12}>

                                <TableMaterialgroup selectedgroupslist={selectedgroupslist} />
                                <Box pb={3}>
                                <Button color="primary" variant="contained" onClick={(e) =>productassign(e,'assign')}>Assign Products</Button>
                                &nbsp;&nbsp;<Button color="secondary" variant="contained" onClick={(e) =>productassign(e,'deassign')}>De-assign Products</Button>
                                </Box>
                                <ScrollableTabsButtonAuto selectedproductslist = {selectedproductslist} />


                                    
                                </Grid>

                               

                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>


            </Grid>
            
            
        </div>
    )
}

export default UserGroups
