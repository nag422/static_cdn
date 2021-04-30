import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MenuItem } from '@material-ui/core';

export default function ConfirmModel(props) {
  

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={props.modelopen} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Filter</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Enter UserName to Retrieve the User
          </DialogContentText>

          <TextField
            onChange={(e)=>props.setQueryfromodel(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="text"
            placeholder="enter userName"
            fullWidth
          />

          <TextField id="select" name="querycategory" label="Permission Category" value={props.querycategory} onChange={(e)=> props.setQuerycategory(e.target.value)} select variant="standard" fullWidth>
              <MenuItem value="admin">Author</MenuItem>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="superuser">Super User</MenuItem>
              <MenuItem value="all">All</MenuItem>
          </TextField>

          <TextField id="select" name="querycontent" label="Profile Category" value={props.querycontent} onChange={(e)=> props.setQuerycontent(e.target.value)} select variant="standard" fullWidth>
              <MenuItem value="creator">Seller</MenuItem>
              <MenuItem value="producer">Buyer</MenuItem>
              <MenuItem value="all">All</MenuItem>
          </TextField>

        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={props.handleSearchsubmit} color="primary">
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
