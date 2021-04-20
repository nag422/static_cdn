import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {getchatmessages}  from '../../container/api/message'
import axios from 'axios';


const SimpleList = React.forwardRef((props,ref) => {
const [chat,setChat] = React.useState([]);
const [pagenumber,setPagenumber] = React.useState(1);


  React.useEffect(() => {
    const config = {
      headers: {
          'content-type': 'application/json',
          'Authorization':'Token 22cab19ad1b1ed66a1d69bcb849ceb9af0f6ac54'          
          // 'X-CSRFToken': getCookie('csrftoken')
      }
    }
    


    const url = 'https://app.contentbond.com/'
    const params = {
      currentpage:pagenumber
    }

    axios
    .get(url+"admin/chat/savemessage/",{params},config)
    .then(resp => {  
      setChat(resp.data.mesgs)
    
    })
    .catch(error => error);

  }, [])
 

  return (
    <div>
{chat.map((val,index) => {


return <List key={index} style={{width: '100%',
    maxWidth: '36ch'}}>
      <ListItem alignItems="flex-start">
        {/* <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar> */}
        <ListItemText
          primary={val.msg}
          // secondary={
          //   <React.Fragment>
          //     {/* <Typography
          //       component="span"
          //       variant="body2"
          //       style={{display:'inline'}}
          //       color="textPrimary"
          //     >
          //       Nagendra
          //     </Typography> */}
          //     {val.msg}
          //   </React.Fragment>
          // }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    
    </List>



})}
    
    </div>
  );
})
export default SimpleList;