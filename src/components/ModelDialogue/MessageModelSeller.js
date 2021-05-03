import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { max } from 'date-fns';
export default function MessageModelSeller(props) {
  const theme = useTheme();
  const [maxWidth, setMaxWidth] = React.useState('md');
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div style={{width:'100%'}}>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={props.modelopen} onClose={props.handleClose} 
      aria-labelledby="form-dialog-title" fullScreen={fullScreen} maxWidth={maxWidth} fullWidth={true}>
        <DialogTitle id="form-dialog-title">Message</DialogTitle>
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
