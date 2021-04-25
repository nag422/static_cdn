import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function MessageModel(props) {
  

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={props.modelopen} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        {/* <DialogTitle id="form-dialog-title">Bulk Message</DialogTitle> */}
        {props.children}
        {/* <DialogContent>

          <DialogContentText>
           To Sellers or Buyers
          </DialogContentText>
        
          
        </DialogContent>

        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={props.handleSearchsubmit} color="primary">
            Search
          </Button>
        </DialogActions> */}

      </Dialog>
    </div>
  );
}
