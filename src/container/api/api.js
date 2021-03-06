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


 export const addlike = async (payload) =>{
         
    let statuscode = ''
    const config = {
      headers: {
          'content-type': 'multipart/form-data',          
          'X-CSRFToken': getCookie('csrftoken')
      }
    }
  
    const form_data = new FormData();
    form_data.append('id', payload)
    
 
    await axios
      .post(url+"admin/addliketoproduct/", form_data,config)
      .then(resp => {statuscode=resp.data})
      .catch(error => error);

      return statuscode
      }


export const addinterest = async (payload) =>{
    let statuscode = ''
    const config = {
      headers: {
          'content-type': 'multipart/form-data',          
          'X-CSRFToken': getCookie('csrftoken')
      }
    }
  
    const form_data = new FormData();
    form_data.append('id', payload)
    
 
    await axios
      .post(url+"admin/addboughtproduct/", form_data,config)
      .then(resp => {statuscode=resp.data})
      .catch(error => error);

      return statuscode
    }

    
export const getallproducts = async (payload) =>{
  
        let statuscode = ''
        const config = {
          headers: {
              'content-type': 'multipart/form-data',          
              'X-CSRFToken': getCookie('csrftoken')
          }
        }
      
        
        console.log('pagenumber',payload.pageNumber)
        return await axios
          .get(`${url}admin/getProductsall/?page=${payload.pageNumber}`,config)
          .then(resp => resp.data.obs)
          .catch(error => error);
      
          
          }


export const getalllikedproducts = async (payload) =>{

        let statuscode = ''
        const config = {
            headers: {
                'content-type': 'application/json',          
                'X-CSRFToken': getCookie('csrftoken')
            }
        }


        console.log('pagenumber',payload.pageNumber)
        return await axios
            .get(`${url}admin/getproductsallliked/?page=${payload.pageNumber}`,config)
            .then(resp => resp.data.obs)
            .catch(error => error);

    
    }


    export const getallbaggedproducts = async (payload) =>{

        let statuscode = ''
        const config = {
            headers: {
                'content-type': 'application/json',          
                'X-CSRFToken': getCookie('csrftoken')
            }
        }


        console.log('pagenumber',payload.pageNumber)
        return await axios
            .get(`${url}admin/getproductsallbagged/?page=${payload.pageNumber}`,config)
            .then(resp => resp.data.obs)
            .catch(error => error);

    
    }