import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Deleteconfirmdialogue(props) {
  

  return (
    <div>
      
      <Dialog
        open={props.deleteopen}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure to Delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running. */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleDeleteCloseNo} color="primary">
            Disagree
          </Button>
          <Button onClick={props.handleDeleteCloseYes} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
