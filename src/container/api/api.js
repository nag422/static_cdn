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

 export const addlike = async (payload) =>{
         
    let statuscode = ''
    const config = {
      headers: {
          'content-type': 'multipart/form-data',          
          'X-CSRFToken': getCookie('csrftoken'),
          'Authorization': 'Token '+ getToken()
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
          'X-CSRFToken': getCookie('csrftoken'),
          'Authorization': 'Token '+ getToken()
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
    
    export const deleteproduct = async (payload) =>{
      let statuscode = ''
      const config = {
        headers: {
            'content-type': 'multipart/form-data',          
            'X-CSRFToken': getCookie('csrftoken'),
            'Authorization': 'Token '+ getToken()
        }
      }
    
      const form_data = new FormData();
      form_data.append('id', payload)
      
   
      await axios
        .post(url+"admin/deleteproduct/", form_data,config)
        .then(resp => {statuscode=resp.data})
        .catch(error => error);
  
        return statuscode
      }
    
export const getallproducts = async (payload) =>{
  
        let statuscode = ''
        const config = {
          headers: {
              'content-type': 'multipart/form-data',          
              'X-CSRFToken': getCookie('csrftoken'),
              'Authorization': 'Token '+getToken()
          }
        }
      
        
        console.log('pagenumber',payload.pageNumber)
        return await axios
          .get(`${url}admin/getProductsall/?page=${payload.pageNumber}`,config)
          .then(resp => resp.data)
          .catch(error => error);
      
          
          }

export const getsellerproducts = async (payload) =>{

  let statuscode = ''
  const config = {
    headers: {
        'content-type': 'application/json',          
        'X-CSRFToken': getCookie('csrftoken'),
        'Authorization': 'Token '+getToken()
    }
  }

  
  console.log('pagenumber',payload.pageNumber)
  return await axios
    .get(`${url}admin/getproductsofcreator/?page=${payload.pageNumber}`,config)
    .then(resp => resp.data)
    .catch(error => []);

    
    }


export const getalllikedproducts = async (payload) =>{

        let statuscode = ''
        const config = {
            headers: {
                'content-type': 'application/json',          
                'X-CSRFToken': getCookie('csrftoken'),
                'Authorization': 'Token '+getToken()
            }
        }


        console.log('pagenumber',payload.pageNumber)
        return await axios
            .get(`${url}admin/getproductsallliked/?page=${payload.pageNumber}`,config)
            .then(resp => resp.data)
            .catch(error => error);

    
    }


    export const getallbaggedproducts = async (payload) =>{

        let statuscode = ''
        const config = {
            headers: {
                'content-type': 'application/json',          
                'X-CSRFToken': getCookie('csrftoken'),
                'Authorization': 'Token '+getToken()
            }
        }


        console.log('pagenumber',payload.pageNumber)
        return await axios
            .get(`${url}admin/getproductsallbagged/?page=${payload.pageNumber}`,config)
            .then(resp => resp.data)
            .catch(error => error);

    
    }

    export const getallrecommendedproducts = async (payload) =>{

      let statuscode = ''
      const config = {
          headers: {
              'content-type': 'application/json',          
              'X-CSRFToken': getCookie('csrftoken'),
              'Authorization': 'Token '+getToken()
          }
      }


      console.log('pagenumber',payload.pageNumber)
      return await axios
          .get(`${url}admin/getproductsallbyusers/?page=${payload.pageNumber}`,config)
          .then(resp => resp.data)
          .catch(error => error);

  
  }


// Admin Dyno DataFetching

export const getalllikedproductsadmin = async (payload) =>{

  let statuscode = ''
  const config = {
      headers: {
          'content-type': 'application/json',          
          'X-CSRFToken': getCookie('csrftoken')
      }
  }


 
  return await axios
      .get(`${url}admin/getproductsalllikedbyid/?page=${payload.pageNumber}&id=${payload.dynoid}`,config)
      .then(resp => resp.data.obs)
      .catch(error => error);


}


export const getallbaggedproductsadmin = async (payload) =>{

  let statuscode = ''
  const config = {
      headers: {
          'content-type': 'application/json',          
          'X-CSRFToken': getCookie('csrftoken')
      }
  }


  return await axios
      .get(`${url}admin/getproductsallbaggedbyid/?page=${payload.pageNumber}&id=${payload.dynoid}`,config)
      .then(resp => resp.data.obs)
      .catch(error => error);


}


export const getallrecommendedproductsadmin = async (payload) =>{

  let statuscode = ''
  const config = {
      headers: {
          'content-type': 'application/json',          
          'X-CSRFToken': getCookie('csrftoken')
      }
  }


  console.log('pagenumber',payload.pageNumber)
  return await axios
      .get(`${url}admin/getproductsallbyusersbyid/?page=${payload.pageNumber}&id=${payload.dynoid}`,config)
      .then(resp => resp.data.obs)
      .catch(error => error);


}




export const getalluploadedproductsadmin = async (payload) =>{

  let statuscode = ''
  const config = {
      headers: {
          'content-type': 'application/json',          
          'X-CSRFToken': getCookie('csrftoken')
      }
  }


  console.log('pagenumber',payload.pageNumber)
  return await axios
      .get(`${url}admin/getuploadsallbyusersbyid/?page=${payload.pageNumber}&id=${payload.dynoid}`,config)
      .then(resp => resp.data.obs)
      .catch(error => error);


}