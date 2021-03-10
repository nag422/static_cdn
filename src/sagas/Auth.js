/**
 * Auth Sagas
 */
import { all, call, fork, put, takeEvery,takeLatest } from "redux-saga/effects";

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
    THEME_MODE_TOGGLE_SUCCESS
    
} from "../actions/types";

import {
    signinUserSuccess,
    signinUserFailure,
    signUpUserInFirebaseSuccess,
    signUpUserInFirebaseFailure,
    logoutUserFromFirebaseSuccess,
    logoutUserFromFirebaseFailure,
    createTwoStepTokenFinish,

} from "../actions";

// const signInUserwithApiRequest = async (email, password) =>{
    
//     return {status:200}
// }

function* signInUserwithApi({ payload }) {
    let userData = payload.user;    
    console.log("consoling here: ", payload);
    console.log("consoling here: ", payload.history);
    // const signInResponse = yield call(
    //     signInUserwithApiRequest,
    //     userData.email,
    //     userData.password
    //   );
      yield put(signinUserSuccess(userData));
}

/**
 * Create User
*/

export function* signInUser() {
    console.log("sign in saga called..");
    yield takeEvery(SIGNIN_USER, signInUserwithApi);
}

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
        fork(themetoggle),
    ]);
}