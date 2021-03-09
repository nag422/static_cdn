import axios from 'axios';
const baseURL = "http://127.0.0.1:8000/";

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
        'content-type': 'multipart/form-data',          
        'X-CSRFToken': getCookie('csrftoken')
    }
  }


const axiosInstance = axios.create({
    baseURL:baseURL,
    // timeout: 5000,
    headers: {
        'content-type': 'multipart/form-data',          
        'X-CSRFToken': getCookie('csrftoken')
    }
    // cancelToken: new axios.CancelToken(c => cancel = c)
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    })

export default axiosInstance;