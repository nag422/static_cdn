import { Box, Button, Card, FormControl, Grid, InputLabel, MenuItem, TextField, Typography } from '@material-ui/core'
import React from 'react'
import CustomizedInputs from '../components/ModelDialogue/CustomizedInputs'
import SelectFieldCustom from '../components/SelectFieldCustom/SelectFieldCustom'
import ModelDialogue from '../components/ModelDialogue/ModelDialogue'

import TableMaterialuser from '../components/TableMaterial/TableMaterialuser'
import { fade, makeStyles } from "@material-ui/core/styles";

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import axios from 'axios';


import Select from '@material-ui/core/Select';
import { grey } from '@material-ui/core/colors'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
const useStyles = makeStyles((theme) => ({
    root: {
      
      "& .MuiInputBase-input": {
        backgroundColor: grey[100],
        outline: "none",
        borderRadius: 5,
        border:`1px solid ${grey[500]}`,
      },
      "& .MuiInputLabel-formControl": {
        color: grey[800],
        
      },
      "& .Mui-disabled": {
        backgroundColor: theme.palette.primary.main,
        color: "#fff",
        cursor: "no-drop",
      },
    },
   
    
  }));

const UsersList = () => {
    
    const calsses = useStyles();
    const [usercategory,setUsercategory] =  React.useState('')
    const [usertype,setUsertype] =  React.useState('')
    const [productlistvalue,setProductlistvalue] =  React.useState('')
    const [userlist,setUserlist] =  React.useState('')
    const [open,setOpen] =  React.useState(false)
    const [usercreatedmessage,setUsercreatedmessage] =  React.useState('')
    const [alertseverity,setAlertseverity] =  React.useState('success')
    const [userslistdata,setUserslistdata] =  React.useState([])
    const [productlistdata,setProductlistdata] =  React.useState([])
    
    
    
    
    const [uservalues,setUservalues] = React.useState({
        username:'',
        password:'',
        
    })

    // 
        // SnackBar

        const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
              return;
            }
        
            setOpen(false);
          };
    // 


    const url = "http://127.0.0.1:8000/"


     // Users

     const getalluserss = async() => {
        const config = {
            headers: {
                'content-type': 'application/json',          
                'X-CSRFToken': getCookie('csrftoken')
            }
          }
        axios.get(url+'auth/admin/saveuser/',config).then(res=>{
          if(!res.data.error){
              
            setUserslistdata(res.data.GETmethodData.splice(5,30))            
            
            
          }
      }).catch(err=>{
          
          alert(err.message)
          
      })
      }


      const getproductlist = async() => {
        const config = {
            headers: {
                'content-type': 'application/json',          
                'X-CSRFToken': getCookie('csrftoken')
            }
          }
        axios.get(url+'admin/getProductsall/',config).then(res=>{
            
          if(res.data.status == 200){
              
            setProductlistdata(res.data.obs)            
            
            
          }
      }).catch(err=>{
          
          alert(err.message)
          
      })
      }
  
      React.useEffect(() => {
        getalluserss()
        
        return () => {

        }
      }, [])
      React.useEffect(() => {
        
        getproductlist()
        return () => {

        }
      }, [])

   
// Users

    

    const handleSubmit = async () => {

        const config = {
            headers: {
                'content-type': 'multipart/form-data',          
                'X-CSRFToken': getCookie('csrftoken')
            }
          }

        let form_data = new FormData()
        form_data.append('username',uservalues.username)
        form_data.append('password',uservalues.password)
        form_data.append('usertype',usertype)
        form_data.append('usercategory',usercategory)
        await axios.post(url+'auth/admin/saveuser/',form_data,config).then(res=>{
            if(!res.data.error){
                setUsercreatedmessage("User Created Successfully")
                setOpen(true)
                setAlertseverity('success')
               
               
            }
        }).catch(err=>{
            
            setUsercreatedmessage("User Creation is Failed")
            setOpen(false);
            setAlertseverity('error')
            
        })

    }
    const onhandleChangeusertype = (e) => {
        setUsertype(e.target.value)

    }
    const onhandleChangecategory = (e) => {
        setUsercategory(e.target.value)
    }

    const onhandleChange = (e) => {
        setUservalues({
            ...uservalues,
            [e.target.id]:e.target.value
        })
    }

   



const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  const vertical = "top"
  const horizontal = "right"
    return (
        <div>
            {/* <ModelDialogue /> */}

            <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertseverity}>
                {usercreatedmessage}
                </Alert>
            </Snackbar>
            <Grid container style={{ marginBottom: '2%' }} spacing={2}>
                <Grid item md={6} xs={12} sm={12}>

                    <Card>
                        <Box p={1}>
                            <Typography>
                                Create User
                            </Typography>
                        </Box>

                        <Box p={2} className={calsses.root}>
                            

                                <TextField id="username" label="Username" variant="outlined" 
                                InputLabelProps={{
                                    shrink:uservalues.username?true:false
                                }}
                                
                                value={uservalues.username}
                                onChange={onhandleChange}
                                fullWidth
                                />


                                <br></br>
                                <TextField id="password" label="Password" variant="outlined" 
                                InputLabelProps={{
                                    shrink:uservalues.password?true:false
                                }}
                                
                                value={uservalues.password}
                                onChange={onhandleChange}
                                fullWidth
                                style={{marginTop:'30px'}}
                                />


                                <br></br>


                                <FormControl fullWidth>
                                <InputLabel  value={usertype}  id="usertype">Type</InputLabel>

                                <Select
                                    labelId="usertype"
                                    id="usertype"
                                    variant="outlined"
                                    name="usertype"
                                    value={usertype}                                    
                                    style={{marginTop:'30px'}}
                                    onChange={onhandleChangeusertype}
                                    

                                >
                                    <MenuItem value={""}>Choose Type of User</MenuItem>
                                    <MenuItem value={"user"}>User</MenuItem>
                                    <MenuItem value={"admin"}>Admin</MenuItem>
                                    <MenuItem value={"superuser"}>SuperUser</MenuItem>
                                </Select>
                                </FormControl>


                                <br></br>
                                <FormControl fullWidth>
                                <InputLabel id="category">Category</InputLabel>
                                <Select
                                    labelId="category"
                                    id="category"
                                    variant="outlined"
                                    name="category"
                                    style={{marginTop:'30px'}}
                                    value={usercategory}
                                    onChange={onhandleChangecategory}
                                    
                                    

                                >
                                    <MenuItem value={""}>Choose Category of User</MenuItem>
                                    <MenuItem value={"producer"}>Producer</MenuItem>
                                    <MenuItem value={"creator"}>Creator</MenuItem>
                                    
                                </Select>
                                </FormControl>
                                <br></br>


                                <Box pl={1} pt={2}>
                                    <Button

                                        type="button" onClick={handleSubmit} color="primary" variant="contained">Create</Button>
                                </Box>
                            







                        </Box>
                    </Card>
                </Grid>

                <Grid item md={6} xs={12} sm={12}>
                    <Card style={{ height: '100%' }}>
                        <Box p={1}>
                            <Typography>
                                Create Notification
                            </Typography>
                        </Box>
                        <Box p={1}>
                        <FormControl fullWidth>
                                <InputLabel id="userlist">Category</InputLabel>
                                <Select
                                    labelId="userlist"
                                    id="userlist"
                                    variant="outlined"
                                    name="userlist"
                                    style={{marginTop:'30px'}}
                                    value={userlist}
                                    onChange={onhandleChangecategory}
                                    
                                    

                                >
                                    <MenuItem value={""}>Choose User</MenuItem>
                                    {userslistdata.map((val,index) => {
                                        return <MenuItem key={val.id} value={val.id}>{val.username}</MenuItem>
                                    })}
                                    
                                    
                                    
                                    
                                </Select>
                                </FormControl>
                                <br></br>
                                <FormControl fullWidth>
                                <InputLabel id="productlist">Products</InputLabel>
                                <Select
                                    labelId="productlist"
                                    id="productlist"
                                    variant="outlined"
                                    name="productlist"
                                    style={{marginTop:'30px'}}
                                    value={productlistvalue}
                                    onChange={(e) => setProductlistvalue(e.target.value)}
                                 
                                >
                                    <MenuItem value={""}>Choose Product</MenuItem>
                                    {productlistdata.map((val,index) => {
                                         return <MenuItem key={val.id} value={val.id}>{val.title}</MenuItem>
                                    })}
                                   
                                    
                                    
                                    
                                    
                                </Select>
                                </FormControl>
                                <br></br>
                                <Button style={{top:'20px'}} color="primary" variant="contained">Assign</Button>
                        </Box>
                    </Card>


                </Grid>

            </Grid>
            <Grid container>
                <Grid item md={12} xs={12} sm={12}>
                    <TableMaterialuser />
                </Grid>
            </Grid>
        </div>
    )
}

export default UsersList
