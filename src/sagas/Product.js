/**
 * Auth Sagas
 */
import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from 'axios';
import {
    SAVE_PRODUCT,
    SAVE_PRODUCT_SUCCESS,
    SAVE_PRODUCT_FAIL,
    UPDATE_PRODUCT,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    CREATOR_SAVE_PRODUCT,
    GET_REQUEST_DATA,
    GET_PRODUCT_FAIL,
    GET_PRODUCT_SUCCESS

} from '../actions/types'

import {
    saveProductSuccess,
    saveProductFail
} from '../actions'
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

  const addProductwithApiRequest = async (payload) =>{
    let productData = payload.values;    
    let statuscode = ''
    const config = {
      headers: {
          'content-type': 'multipart/form-data',          
          'X-CSRFToken': getCookie('csrftoken')
      }
    }
  
    const form_data = new FormData();
    form_data.append('title', productData.title)
    form_data.append('castncrew', productData.castncrew)
    form_data.append('category', productData.category)
    form_data.append('description', productData.description)
    form_data.append('price', productData.price)
    form_data.append('rights', 'productData.right')
    form_data.append('thumbnail', productData.thumbnail)
    form_data.append('videofile', productData.video)

    await axios
      .post(url+"admin/saveproduct/", form_data,config)
      .then(resp => {statuscode=resp.data.status})
      .catch(error => error);

      return statuscode
      }
  

      const saverequestProductwithApiRequest = async (payload) =>{
        let productData = payload.values;    
        let statuscode = ''
        const config = {
          headers: {
              'content-type': 'multipart/form-data',          
              'X-CSRFToken': getCookie('csrftoken')
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
          .post(url+"admin/requestsaveproduct/", form_data,config)
          .then(resp => {statuscode=resp.data.status})
          .catch(error => error);
    
          return statuscode
          }

function* addProductwithApi({ payload }) {
    
    
    
    console.log("consoling here in saga: ", payload.history);
    const saveProductResponse = yield call(
      addProductwithApiRequest,
        payload
      );
     
      if (saveProductResponse === 200){
      yield put(saveProductSuccess(payload.values));
    }else{
      yield put(saveProductFail(payload.values));
    }
}


function* saverequestProductwithApi({ payload }) {
    
    
    
  console.log("consoling creator request: ", payload.history);
  const saveProductResponse = yield call(
    saverequestProductwithApiRequest,
      payload
    );
   
    if (saveProductResponse === 200){
    // yield put(saveProductSuccess(payload.values));
    yield put ({type:SAVE_PRODUCT_SUCCESS})
  }else{
    // yield put(saveProductFail(payload.values));
    yield put ({type:SAVE_PRODUCT_FAIL})
  }
}


/**
 * Create Product
*/

export function* add_Product() {
    console.log("product saga called..");
    yield takeLatest(SAVE_PRODUCT, addProductwithApi);
}

export function* request_creator(){
  console.log("request saga called..");
  yield takeLatest(CREATOR_SAVE_PRODUCT, saverequestProductwithApi);
  
}

// Retrieve Products

const getProductswithApiRequest = async (payload) =>{
  
  let statuscode = ''
  const config = {
    headers: {
        'content-type': 'multipart/form-data',          
        'X-CSRFToken': getCookie('csrftoken')
    }
  }

  
  console.log('i got second payload',payload.pageNumber)
  return await axios
    .get(`${url}admin/getProductsall/?page=${payload.pageNumber}`,config)
    .then(resp => resp)
    .catch(error => error);

    
    }

function* getProductswithApi({payload}) {
    
  console.log('igot payload',payload)
  const saveProductResponse = yield call(
    getProductswithApiRequest,
    payload.pageNumber
    );
   
    if (saveProductResponse.data.status === 200){
    // yield put(saveProductSuccess(payload.values));
    yield put ({type:GET_PRODUCT_SUCCESS,payload:saveProductResponse.data.obs})
  }else{
    // yield put(saveProductFail(payload.values));
    yield put ({type:GET_PRODUCT_FAIL})
  }
}

export function* get_all_Products() {
  console.log("Get product saga called..");
  yield takeLatest(GET_REQUEST_DATA, getProductswithApi);
}


/**
 * Product Root Saga
 */
export default function* rootSaga() {
    console.log("productooo");
    yield all([

        fork(add_Product),
        fork(request_creator),
        fork(get_all_Products)
    ]);
}

