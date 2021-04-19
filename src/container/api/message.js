import axios from 'axios';

// const url = 'http://127.0.0.1:8000/'
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

  const config = {
    headers: {
        'content-type': 'application/json',
        'Authorization':'Token 22cab19ad1b1ed66a1d69bcb849ceb9af0f6ac54'          
        // 'X-CSRFToken': getCookie('csrftoken')
    }
  }

  export const getchatusers = async (payload) =>{
         
    let statuscode = ''
    
  
    // const form_data = new FormData();
    // form_data.append('id', payload)
    // form_data.append('action', 'getusers')
    
 
    await axios
      .get(url+"admin/chat/users/",config)
      .then(resp => {statuscode=resp.data})
      .catch(error => error);
        
      return statuscode
      }

export const getchatmessages = async (payload) =>{
    
  let statuscode = ''
  

  // const form_data = new FormData();
  // form_data.append('id', payload)
  // form_data.append('action', 'getusers')
  

  await axios
    .get(url+"admin/chat/savemessage/",config)
    .then(resp => {statuscode=resp.data})
    .catch(error => error);
      
    return statuscode
    }
    

export const postchatmessages = async (payload) =>{

  let statuscode = ''
  

  // const form_data = new FormData();
  // form_data.append('id', payload)
  // form_data.append('action', 'getusers')
  

  await axios
    .post(url+"admin/chat/savemessage/",config)
    .then(resp => {statuscode=resp.data})
    .catch(error => error);
      
    return statuscode
    }