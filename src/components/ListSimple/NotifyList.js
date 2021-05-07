import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

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
  const [loading,setLoading] = React.useState(false);

  const history = useHistory()
  

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
    
    setLoading(true)

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
        setLoading(false)
      
    
    })
    .catch(error => {
      setLoading(false)
      return error.message
    });

  }, [])
  const detailPagenavigator = async(id,isinterested,islikes) => {
    history.push('/admin/section/'+id+'?interest='+isinterested+'&likes='+islikes)
  }
  

  return (
    <List className={classes.root}>
{loading && (Array.from(new Array(20))).map(() => <Skeleton />)}
{chat.map((val,index) => {
    return <>
    <ListItem key={val.id} style={{cursor:"pointer"}} alignItems="flex-start" onClick={(e)=>detailPagenavigator(val.id,val.isfavored,val.isliked)}>            
            <ListItemText
                primary={`${val.productname}`}          
            />
            <Button color="primary" variant="contained">View <OpenInNewIcon /> </Button>

        </ListItem>

<Divider variant="inset" component="li" />
</>

})}

     

 
            
   
   
    </List>
  );
}
