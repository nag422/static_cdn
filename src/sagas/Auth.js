/**
 * Auth Sagas
 */
import { all, call, fork, put, takeEvery,takeLatest } from "redux-saga/effects";
import axios from 'axios';
import {
    LOGIN_USER,
    LOGIN_FACEBOOK_USER,
    LOGIN_GOOGLE_USER,
    LOGIN_TWITTER_USER,
    LOGIN_GITHUB_USER,
    LOGOUT_USER,
    SIGNUP_USER,
    SIGNIN_USER,
    CREATE_TWO_STEP_TOKEN_START,
    THEME_MODE_TOGGLE,
    THEME_MODE_TOGGLE_SUCCESS,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAILURE,

    GET_USER_PROFILE_DATA,
    GET_USER_PROFILE_DATA_SUCCESS
    
} from "../actions/types";
import * as apinstance from './api/api'
// import {
//     signinUserSuccess,
//     signinUserFailure,
//     signUpUserInFirebaseSuccess,
//     signUpUserInFirebaseFailure,
//     logoutUserFromFirebaseSuccess,
//     logoutUserFromFirebaseFailure,
//     createTwoStepTokenFinish,

// } from "../actions";

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
const signInUserwithApiRequest = async (email, password) =>{

    let statuscode = ''
    let cancel
    // cancelToken.source()
    const config = {
      headers: {
          'content-type': 'application/json',          
          'X-CSRFToken': getCookie('csrftoken')
      },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }
  
    
    const body= JSON.stringify({username: email, password: password})

    await axios
      .post(url+"auth/signinsave/", body,config)
      .then(resp => {statuscode=resp.data})
      .catch(e => {
      if (axios.isCancel(e)) return
      
        })
    
    return statuscode
}

const signOutUserwithApiRequest = async (email, password) =>{

    let statuscode = ''
    let cancel
    // cancelToken.source()
    const config = {
      headers: {
          'content-type': 'application/json',          
          'X-CSRFToken': getCookie('csrftoken')
      },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }
  
    
    const body= JSON.stringify({username: email, password: password})

    await axios
      .post(url+"auth/signout/", body,config)
      .then(resp => {statuscode=resp.data})
      .catch(e => {
      if (axios.isCancel(e)) return
      
        })
    
    return statuscode
}

function* signInUserwithApi({ payload }) {
    let userData = payload.user;    
    console.log("consoling here: ", payload);
    console.log("consoling here: ", payload.history);
    const signInResponse = yield call(
        signInUserwithApiRequest,
        userData.email,
        userData.password
      );
      if(signInResponse.status == 200){
          yield put({
            type: LOGIN_USER_SUCCESS,
            payload: userData.email
          })
          payload.history.push('/admin/dashboard')
      }else{
        yield put({
            type: LOGIN_USER_FAILURE,
            payload: signInResponse.message
          })
          payload.history.push('/auth/signin')

      }
    //   yield put();
    // console.log(signInResponse)
}

function* signoutUserwithApi() {
    
    const signOutResponse = yield call(
        signOutUserwithApiRequest
        
      );
      if(signOutResponse.status == 200){
          yield put({
            type: LOGOUT_USER_SUCCESS,
            
          })
          window.location.replace('/auth/signin')
      }else{
        yield put({
            type: LOGOUT_USER_FAILURE
          })

      }
    //   yield put();
    // console.log(signOutResponse)
}

function* getUserProfilewithApi({payload}) {
    
    const ProfileResponse = yield call(
        apinstance.getUserProfilewithApiRequest,
        payload
        
      );
      if(ProfileResponse.status == 200){
          yield put({
            type: GET_USER_PROFILE_DATA_SUCCESS,
            payload:"profiles data success"
            
          })
          
      }
    //   yield put();
    // console.log(signOutResponse)
}

/**
 * Create User
*/

export function* signInUser() {
    console.log("sign in saga called..");
    yield takeEvery(SIGNIN_USER, signInUserwithApi);
}

export function* signOutUser() {
    console.log("sign Out saga called..");
    yield takeEvery(LOGOUT_USER, signoutUserwithApi);
}

// Profile Operations

export function* getuserProfile() {
    console.log("GetProfile saga called..");
    yield takeLatest(GET_USER_PROFILE_DATA, getUserProfilewithApi);
}

// End Profile Operations

// Theme props 

function* themetogglehelper(){
    
    yield put({type:THEME_MODE_TOGGLE_SUCCESS});

}
export function* themetoggle() {
    
    yield takeLatest(THEME_MODE_TOGGLE,themetogglehelper);
}

///-------------------------------------------------------------

/**
 * Auth Root Saga
 */
export default function* rootSaga() {
    console.log("ooo");
    yield all([

        fork(signInUser),
        fork(signOutUser),
        fork(themetoggle),
        fork(getuserProfile)
    ]);
}