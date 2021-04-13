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

  export const isactive = async (payload) =>{
         
    let statuscode = ''
    const config = {
      headers: {
          'content-type': 'multipart/form-data',          
          'X-CSRFToken': getCookie('csrftoken')
      }
    }
  
    const form_data = new FormData();
    form_data.append('id', payload)
    form_data.append('action', 'isactive')
    
 
    await axios
      .post(url+"auth/admin/userupdate/", form_data,config)
      .then(resp => {statuscode=resp.data})
      .catch(error => error);
        
      return statuscode
      }

    export const userupdate = async (payload) =>{
        
    let statuscode = ''
    const config = {
        headers: {
            'content-type': 'multipart/form-data',          
            'X-CSRFToken': getCookie('csrftoken')
        }
    }
    
    const form_data = new FormData();
    form_data.append('id', payload.id)
    form_data.append('role', payload.role)
    form_data.append('category', payload.category)
    form_data.append('action', 'userupdate')
    
    await axios
        .post(url+"auth/admin/userupdate/", form_data,config)
        .then(resp => {statuscode=resp.data})
        .catch(error => error);
        
        return statuscode
        }


export const updateSecondaryProfile = async (payload) =>{

    let statuscode = ''
    const config = {
        headers: {
            'content-type': 'application/json',          
            'X-CSRFToken': getCookie('csrftoken')
        }
    }
    
 
    const body = JSON.stringify({ user: payload, action: 'profileupdate' })
    
    await axios
        .post(url+"auth/aboutme/", body,config)
        .then(resp => {statuscode=resp.data})
        .catch(error => error);
        
        return statuscode
      }