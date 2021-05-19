import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

import EmailIcon from '@material-ui/icons/Email';
import ReplyIcon from '@material-ui/icons/Reply';

import axios from 'axios';
import ConfirmModel from '../ModelDialogue/ConfirmModel'
import MessageModelSeller from '../ModelDialogue/MessageModelSeller'

import UserEditModel from '../ModelDialogue/UserEditModel'

import MailIcon from '@material-ui/icons/Mail';
import * as authapi from '../../container/api/userapi'

import Moment from 'react-moment';
import { useHistory } from 'react-router';
import { Backdrop, Button, CircularProgress, DialogActions, DialogContent, DialogContentText, MenuItem, Snackbar, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
function createData(id, role, category, name, email, created) {
  return { id, role, category, name, email, created };
}
// const url = "http://127.0.0.1:8000/"
const url = 'https://app.contentbond.com/'

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

const getToken = () => {

  try {
    var unparsedtoken = localStorage.getItem('access_token');
    var parsedtoken = JSON.parse(unparsedtoken);
    return parsedtoken.access_token

  } catch {
    return 'sdfsdfonfsdfsd'
  }

}
const config = {
  headers: {
    'content-type': 'multipart/form-data',
    'X-CSRFToken': getCookie('csrftoken'),
    'Authorization': 'Token ' + getToken()
  }
}







// const rows = [
//   createData(1,'Admin', 'Producer',faker.name.findName(),faker.internet.email(), faker.date.future().toLocaleString()),
//   createData(2,'User','Creator',faker.name.findName(),faker.internet.email(),   faker.date.future().toLocaleString()),
//   createData(3,'User','Hybrid',faker.name.findName(),faker.internet.email(),  faker.date.future().toLocaleString()),
//   createData(4,'Admin','Hybrid',faker.name.findName(),faker.internet.email(),   faker.date.future().toLocaleString()),
//   createData(5,'Admin','Hybrid',faker.name.findName(),faker.internet.email(),   faker.date.future().toLocaleString()),
//   createData(6,'Admin','Hybrid',faker.name.findName(),faker.internet.email(),   faker.date.future().toLocaleString()),
//   createData(7,'Admin','Hybrid',faker.name.findName(),faker.internet.email(),   faker.date.future().toLocaleString()),

// ];







function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  // { id: 'sendertype', numeric: false, disablePadding: true, label: 'Sender' },
  // { id: 'receivertype', numeric: false, disablePadding: false, label: 'Receiver' },
  { id: 'msg:', numeric: false, disablePadding: false, label: 'Message' },
  { id: 'created:', numeric: false, disablePadding: false, label: 'Created' },


];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };




  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ fontWeight: 800 }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : 
      (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          {/* Seller Messages */}
        </Typography>
        )
      }

      {numSelected > 0 ? (
        <>


          {/* <Tooltip title="Reply">
            <IconButton aria-label="reply" onClick={props.handleReplyOpen}>
              <ReplyIcon />
            </IconButton>
          </Tooltip> */}

          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={props.deleteUsersclick}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>


        </>
      ) : (
        <Tooltip title="Compose">
          {/* <IconButton aria-label="Compose" onClick={props.handleClickOpen}>
            <EmailIcon />  Compose Message
          </IconButton> */}

          <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<EmailIcon />}
        onClick={props.handleClickOpen}
      >
        Compose
      </Button>
         
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function TableMaterialMessages(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [queryfromodel, setQueryfromodel] = React.useState('');
  const [togroup, setTogroup] = React.useState('creator');
  const [rowlength, setRowlength] = React.useState(0);


  const history = useHistory()

  // backend operations

  const [rows, setRows] = React.useState([])

  const [modelopen, setModelopen] = React.useState(false);
  const [replymodelopen, setReplymodelopen] = React.useState(false);
  const [usereditmodelopen, setUsereditmodelopen] = React.useState(false);

  const [userupdateform, setUserupdateform] = React.useState({
    role: 'user',
    category: 'producer'
  })


  const [open, setOpen] = React.useState(false)
  const [alertseverity, setAlertseverity] = React.useState('success')
  const [productmessage, setProductmessage] = React.useState('')
  const [isbackdrop, setIsbackdrop] = React.useState(false);



  const handleChangeeditForm = (e) => {
    setUserupdateform({
      ...userupdateform,
      [e.target.name]: e.target.value
    })
  };


  const handleClickOpen = () => {
    setModelopen(true);
  };

  const handleReplyOpen = () => {
    setReplymodelopen(true)
  };

  const handleClose = () => {
    setModelopen(false);
  };


  const handleuserClickOpen = (e) => {

    console.log(selected[0]);
    if (selected.length > 1) {
      return alert('select one only')
    }
    var updated = rows.filter((val) => +val.id === +(selected[0]));
    setUsereditmodelopen(true);
    updated.map(val => {
      return setUserupdateform({
        ...userupdateform,
        role: val.is_staff ? val.is_superuser ? 'superuser' : 'admin' : 'user',
        category: val.content ? val.content : 'creator'
      })
    })


  };



  const handleuserClose = () => {
    setUsereditmodelopen(false);
  };

  const getallusers = async () => {
    setIsbackdrop(true)
    axios.get(url + 'admin/getsellermessages/?q='+togroup+'&currentpage='+(+page+1)+'&perpages='+rowsPerPage, config).then(res => {
      if (!res.data.error) {

        setRows(res.data.mesgs)
        setRowlength(res.data.totalrecords)
        setIsbackdrop(false)

      }
    }).catch(err => {

      
      setIsbackdrop(false)
      setProductmessage(err.message.toString())
      setOpen(true);
      setAlertseverity('error')

    })
  }

  React.useEffect(() => {
    getallusers()
  }, [togroup,page,rowsPerPage])

  const handleMessagesubmit = async (e) => {

    setModelopen(false)
    setIsbackdrop(true)
    const form_data = new FormData();
    form_data.append('message', queryfromodel)
    form_data.append('to', 'producer')

    axios.post(url + 'admin/getsellermessages/', form_data, config).then(res => {
      if (res.data.status == 200) {

        // setRows(res.data.GETmethodData)
        
        setIsbackdrop(false)
        setProductmessage("Message has been sent")
        setOpen(true);
        setAlertseverity('success')

      }else{
        setIsbackdrop(false)
        setProductmessage('Something is went wrong')
        setOpen(true);
        setAlertseverity('error')

      }
    }).catch(err => {

      
      setIsbackdrop(false)
      setProductmessage(err.message.toString())
      setOpen(true);
      setAlertseverity('error')

    })


  }


  

  const handleMessageReply = async (e) => {

    

    const form_data = new FormData();
    form_data.append('message', queryfromodel)
    form_data.append('itemlist', selected)

    axios.post(url + 'admin/getadminmesssagesreply/', form_data, config).then(res => {
      if (!res.data.error) {

        // setRows(res.data.GETmethodData)
        alert('Message has been sent')

      }
    }).catch(err => {

      alert(err.message)

    })
    setReplymodelopen(false)

  }

  const handleUpdateSubmit = async (e) => {

    //   setModelopen(false)

    const payload = {
      id: selected[0],
      role: userupdateform.role,
      category: userupdateform.category
    }
    var response = await authapi.userupdate(payload)
    setUsereditmodelopen(false)
    if (response.status == 200) {
      const updatedusers = rows.filter((val, key) => {
        return [...rows, +val.id == +payload.id ? payload.role === "superuser" ? (val.is_superuser = true, val.is_staff = true, val.is_active = true, val.content = payload.category) : payload.role === "admin" ? (val.is_superuser = false, val.is_staff = true, val.is_active = true, val.content = payload.category) : (val.is_superuser = false, val.is_staff = false, val.is_active = true, val.content = payload.category) : null]
      })
      setRows(updatedusers);
      return props.userstatusupdate('success')
    } else {
      return props.userstatusupdate('error')
    }



  }




  const deleteUsers = async () => {

    const form_data = new FormData();
    form_data.append('itemlist', selected)
    form_data.append('q', togroup)
    console.log(selected)
    setIsbackdrop(true)
    axios.post(url + 'admin/deletemessages/', form_data, config).then(res => {
      if (res.data.status == 200) {

       
        setIsbackdrop(false)
        setProductmessage("Successfully Deleted")
        setOpen(true);
        setAlertseverity('success')

        const updatedusers = rows.filter((val, key) => (!selected.includes(+val.id)))
        setRows(updatedusers);

      }
      else{
      setIsbackdrop(false)
      setProductmessage("Something is went wrong")
      setOpen(true);
      setAlertseverity('error')

      }
    }).catch(err => {

      
      setIsbackdrop(false)
      setProductmessage(err.message.toString())
      setOpen(true);
      setAlertseverity('error')

    })

  }
  // const replyTouser = async () => {

  //   const form_data = new FormData();
  //   form_data.append('itemlist', selected)

  //   axios.post(url + 'auth/admin/deletemessages/', form_data, config).then(res => {
  //     if (!res.data.error) {

  //       alert('Successfully Deleted')

  //     }
  //   }).catch(err => {

  //     alert(err.message)

  //   })

  // }





  // backedn operations


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    
  };

  const handletogroupchanger=(event) => {
    setTogroup(event.target.value)
    setPage(0);
  }

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const emptyRows = 0
  const vertical = "top"
  const horizontal = "right"

  return (
    <div className={classes.root}>
      {/* <ConfirmModel setQueryfromodel = {setQueryfromodel} modelopen={modelopen} 
        handleSearchsubmit={handleSearchsubmit} handleClickOpen={handleClickOpen} 
        handleClose={handleClose} 
      />
      <UserEditModel 
        usereditmodelopen={usereditmodelopen} 
        handleuserClose = {handleuserClose}
        userupdateform={userupdateform}
        handleChangeeditForm={handleChangeeditForm}
        handleUpdateSubmit={handleUpdateSubmit}
        
      
      /> */}

<Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={4000} onClose={() =>setOpen(false)}>
                <Alert onClose={() =>setOpen(false)} severity={alertseverity}>
                    {productmessage}
                </Alert>
            </Snackbar>
            <Backdrop className={classes.backdrop} open={isbackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <MessageModelSeller

        modelopen={modelopen}

        handleClickOpen={handleClickOpen}
        

      >

        <DialogContent>

          {/* <DialogContentText>
            To Sellers or Buyers
        </DialogContentText> */}
           

         

          <TextField
            onChange={(e) => setQueryfromodel(e.target.value)}
            autoFocus
            margin="dense"
            id="message"
            label="Message"
            type="text"
            placeholder="Enter Message"
            fullWidth
            multiline={true}
            rows="7"
            
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleMessagesubmit} color="primary">
            Send Message
          </Button>
        </DialogActions>
        {/* <TextField
          onChange={(e)=>setQueryfromodel(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="text"
            placeholder="enter userName"
            fullWidth
          /> */}



      </MessageModelSeller>




      <MessageModelSeller

        modelopen={replymodelopen}

        handleReplyOpen={handleReplyOpen}

      >

        <DialogContent>

          <DialogContentText>
            Reply Message
        </DialogContentText>

         

          <TextField
            onChange={(e) => setQueryfromodel(e.target.value)}
            autoFocus
            margin="dense"
            id="message"
            label="Message"
            type="text"
            placeholder="Enter Message"
            fullWidth
            multiline={true}
            rows="5"
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setReplymodelopen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleMessageReply} color="primary">
            Send Message
          </Button>
        </DialogActions>
        {/* <TextField
          onChange={(e)=>setQueryfromodel(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="text"
            placeholder="enter userName"
            fullWidth
          /> */}



      </MessageModelSeller>



      {/* <Button color="primary" variant="contained">Add Message</Button> */}
      
      <TextField
            
            id="select" name="togroup" label=""
            value={togroup} onChange={handletogroupchanger}
            select variant="standard">
            <MenuItem value="creator">My Messages</MenuItem>
            <MenuItem value="inbox">Sent Items</MenuItem>
            <MenuItem value="requests">Requests</MenuItem>
            <MenuItem value="groupmessages">Group Messages</MenuItem>
            <MenuItem value="all">Platform Messages</MenuItem>
      </TextField>
      <Paper className={classes.paper}>

        <EnhancedTableToolbar
          deleteUsersclick={deleteUsers}
          // replyTouser={replyTouser}
          numSelected={selected.length}
          handleClickOpen={handleClickOpen}
          handleuserClickOpen={handleuserClickOpen}
          replymodelopen={replymodelopen}
          handleReplyOpen ={handleReplyOpen}

        />

        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .slice(0, rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>

                      {/* <TableCell align="left">{row.role}</TableCell> */}

                      {/* <TableCell align="left">{row.sendername}</TableCell>
                      <TableCell align="left">{row.receivername}</TableCell> */}
                      <TableCell align="left">{row.msg ? row.msg : '-------'}</TableCell>
                      <TableCell align="left"><Moment format="YYYY/MM/DD">{row.created}</Moment></TableCell>


                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rowlength}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </div>
  );
}
