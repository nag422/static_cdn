import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
export default function UserEditModel(props) {

    const classes = useStyles();
   
    

    // const handleChange = (e) => {
    //     setUserupdateform({
    //         ...userupdateform,
    //         [e.target.name]:e.target.value
    //     })
    // };


    return (
        <div>
            {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
            <Dialog open={props.usereditmodelopen} onClose={props.handleuserClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        User Details
          </DialogContentText>


                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="role"
                            value={props.userupdateform.role}
                            onChange={props.handleChangeeditForm}
                        >
                            <MenuItem value='user'>User</MenuItem>
                            <MenuItem value='admin'>Admin</MenuItem>
                            <MenuItem value='superuser'>SuperAdmin</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label2">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label2"
                            id="demo-simple-select2"
                            name="category"
                            value={props.userupdateform.category}
                            onChange={props.handleChangeeditForm}
                        >
                            <MenuItem value='creator'>Seller</MenuItem>
                            <MenuItem value='producer'>Buyer</MenuItem>

                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleuserClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={props.handleUpdateSubmit} color="primary">
                        Update
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
