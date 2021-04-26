import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function NotifyList() {
  const classes = useStyles();
  const [pagenumber,setPagenumber] = React.useState(1);
  const [chat,setChat] = React.useState([]);

  const getToken = () => {
  
  try{
    var unparsedtoken = localStorage.getItem('access_token');
    var parsedtoken = JSON.parse(unparsedtoken);
    return parsedtoken.access_token

  }catch{
    return 'sdfsdfonfsdfsd'
  }
  
}

  React.useEffect(() => {

    

    const config = {
      headers: {
          'content-type': 'application/json',
          'Authorization': 'Token '+getToken()   
          // 'X-CSRFToken': getCookie('csrftoken')
      }
    }
    


    const url = 'https://app.contentbond.com/'
    const params = {
      currentpage:pagenumber
    }

    axios
    .get(url+"admin/getnotifications/",{params},config)
    .then(resp => {  
        setChat(resp.data.notificationdata)
        // if ((resp.data.notificationdata).length > 0 ){
        //     setChat(resp.data.notificationdata)
        // }
      
    
    })
    .catch(error => error);

  }, [])

  return (
    <List className={classes.root}>

{chat.map((val,index) => {
    return <>
    <ListItem alignItems="flex-start">            
            <ListItemText
                primary={val.productname}          
            />

        </ListItem>

<Divider variant="inset" component="li" />
</>

})}

     

 
            
   
   
    </List>
  );
}
