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

export const RegisterAccount = async (payload) =>{
         
    let statuscode = ''
    const config = {
      headers: {
          'content-type': 'multipart/form-data',          
          'X-CSRFToken': getCookie('csrftoken')
      }
    }
  
    const form_data = new FormData();

    Object.entries(payload).forEach(([key, value]) =>  form_data.append(key, value));

    form_data.append('action', 'isactive')
    
    
 
    await axios
      .post(url+"auth/registeruser/", form_data,config)
      .then(resp => {statuscode=resp.data})
      .catch(error => error);
        
      return statuscode
      }

export const validatingUsername = async (payload) =>{
         
    let statuscode = ''
    let cancel
    // cancelToken.source()
    const config = {
      headers: {
          'content-type': 'multipart/form-data',          
          'X-CSRFToken': getCookie('csrftoken')
      },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }
  
    const form_data = new FormData();

    Object.entries(payload).forEach(([key, value]) =>  form_data.append(key, value));

    
    
    
 
    await axios
      .post(url+"auth/registervalidation/", form_data,config)
      .then(resp => {statuscode=resp.data})
      .catch(e => {
      if (axios.isCancel(e)) return
      
        })
        
      return statuscode
      }

export const getUsernameChips = async (payload) =>{
    
  let statuscode = ''
  let cancel
  // cancelToken.source()
  const config = {
    headers: {
        'content-type': 'multipart/form-data',          
        'X-CSRFToken': getCookie('csrftoken')
    },
    cancelToken: new axios.CancelToken(c => cancel = c)
  }

  const form_data = new FormData();

  Object.entries(payload).forEach(([key, value]) =>  form_data.append(key, value));

  
  
  

  await axios
    .post(url+"auth/getuserchip/", form_data,config)
    .then(resp => {statuscode=resp.data})
    .catch(e => {
    if (axios.isCancel(e)) return
    
      })
      
    return statuscode
    }

export const passwordReset =async (payload) => {
  let statuscode = ''
  let cancel
  // cancelToken.source()
  console.log(payload)
  const config = {
    headers: {
        'content-type': 'application/json',          
        'X-CSRFToken': getCookie('csrftoken')
    },
    cancelToken: new axios.CancelToken(c => cancel = c)
  }

  const form_data = new FormData();

  Object.entries(payload).forEach(([key, value]) =>  form_data.append(key, value));

  
  
  

  await axios
    .post(url+"auth/password_reset/", form_data,config)
    .then(resp => {statuscode=resp.data})
    .catch(e => {
    if (axios.isCancel(e)) return
    
      })
      
    return statuscode
    }

