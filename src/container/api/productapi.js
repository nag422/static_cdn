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
  const getToken = () => {
  
    try{
      var unparsedtoken = localStorage.getItem('access_token');
      var parsedtoken = JSON.parse(unparsedtoken);
      return parsedtoken.access_token
  
    }catch{
      return 'sdfsdfonfsdfsd'
    }
    
  }

export const addProductwithApiRequest = async (productData) => {
    
    let statuscode = ''
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'X-CSRFToken': getCookie('csrftoken'),
        'Authorization': 'Token '+getToken()
      }
    }
  
    const form_data = new FormData();
    form_data.append('title', productData.title)
    form_data.append('castncrew', productData.castncrew)
    form_data.append('category', productData.category)
    form_data.append('description', productData.description)
    form_data.append('price', productData.price)
    form_data.append('rights', productData.rights)
    form_data.append('thumbnail', productData.thumbnail)
    form_data.append('thumbnail1', productData.thumbnail1)
    form_data.append('thumbnail2', productData.thumbnail2)
    form_data.append('thumbnail3', productData.thumbnail3)
    form_data.append('videofile', productData.video)
  
    await axios
      .post(url + "admin/saveproduct/", form_data, config)
      .then(resp => { statuscode = resp.data.status })
      .catch(error => error);
  
    return statuscode
  }

  export const saverequestProductwithApiRequest = async (payload) => {
    let productData = payload;
    let statuscode = ''
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'X-CSRFToken': getCookie('csrftoken'),
        'Authorization': 'Token '+getToken()
      }
    }
  
    const form_data = new FormData();
    form_data.append('title', productData.title)
    form_data.append('category', productData.category)
    form_data.append('authortype', productData.author_type)
    form_data.append('in_stock', true)
    form_data.append('is_active', true)
    form_data.append('action', 'creatorrequest')
  
  
    await axios
      .post(url + "admin/requestsaveproduct/", form_data, config)
      .then(resp => { statuscode = resp.data.status })
      .catch(error => error);
  
    return statuscode
  }

   
 
  export const editProductsave = async (payload) => {
    let productData = payload;
    let statuscode = ''
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'X-CSRFToken': getCookie('csrftoken'),
        'Authorization': 'Token b3ca630db1d487224dad3a90251e186b9c699d40'
      }
    }
  
    const form_data = new FormData();
    form_data.append('id', productData.id)
    form_data.append('title', productData.title)
    form_data.append('castncrew', productData.castncrew)
    form_data.append('category', productData.category)
    form_data.append('description', productData.description)
    form_data.append('price', productData.price)
    form_data.append('rights', productData.rights)
    form_data.append('thumbnail', productData.thumbnail)
    form_data.append('thumbnail1', productData.thumbnail1)
    form_data.append('thumbnail2', productData.thumbnail2)
    form_data.append('thumbnail3', productData.thumbnail3)
    form_data.append('videofile', productData.videofile)
  
  
    await axios
      .post(url + "admin/editproductsave/", form_data, config)
      .then(resp => { statuscode = resp.data.status })
      .catch(error => error);
  
    return statuscode
  }