import { Button, Card, CardContent, CardHeader, Grid, TextField, Typography } from '@material-ui/core'
import React from 'react'
import TableMaterialgroup from '../components/TableMaterial/TableMaterialgroup'
import axiosInstance from '../axiosinstance'

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '../components/alertcustom/alertcustom'
const UserGroups = () => {

    const [groupname,setGroupname] = React.useState('')
    const [rule,setRule] = React.useState('')

    const [open,setOpen] =  React.useState(false)
    const [usercreatedmessage,setUsercreatedmessage] =  React.useState('')
    const [alertseverity,setAlertseverity] =  React.useState('success')


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
      body.append('rule',rule)
      
      await axiosInstance.post('admin/creategroup/',body).then(res=> {
         

          if(res.data.status==200){
            setUsercreatedmessage("Group created successfully")
            setOpen(true)
            setAlertseverity('success')
           
           
        }else{
            setUsercreatedmessage("Group Creation is Failed")
          setOpen(false);
          setAlertseverity('error')

        }
      }).catch(err=> {
          console.log(err.message)
          setUsercreatedmessage("Group Creation is Failed")
          setOpen(false);
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
                                <Grid item md={12} xs={12} sm={12}>
                                <TextField
                                        id="rule"
                                        label="Rule"
                                        variant="outlined"
                                        value={rule}
                                        onChange = {(e) => setRule(e.target.value)}                                        

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
                        <CardHeader title="Groups">

                        </CardHeader>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item md={12} xs={12} sm={12}>

                                <TableMaterialgroup />


                                    
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
