import axios from 'axios';

const url = 'http://127.0.0.1:8000/'
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
      .post(url+"admin/productstatus/", form_data,config)
      .then(resp => {statuscode=resp.data})
      .catch(error => error);
        
      return statuscode
      }

      export const instock = async (payload) =>{
         
        let statuscode = ''
        const config = {
          headers: {
              'content-type': 'multipart/form-data',          
              'X-CSRFToken': getCookie('csrftoken')
          }
        }
      
        const form_data = new FormData();
        form_data.append('id', payload)
        form_data.append('action', 'instock')
        
     
        await axios
          .post(url+"admin/productstatus/", form_data,config)
          .then(resp => {statuscode=resp.data})
          .catch(error => error);
    
          return statuscode
          }


  export const getProductChips = async (payload) =>{

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
      .post(url+"admin/getproductchip/", form_data,config)
      .then(resp => {statuscode=resp.data})
      .catch(e => {
      if (axios.isCancel(e)) return
      
        })
        
      return statuscode
      }