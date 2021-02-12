/**
 * Auth Sagas
 */
import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
    LOGIN_USER,
    LOGIN_FACEBOOK_USER,
    LOGIN_GOOGLE_USER,
    LOGIN_TWITTER_USER,
    LOGIN_GITHUB_USER,
    LOGOUT_USER,
    SIGNUP_USER,
    SIGNIN_USER,
    CREATE_TWO_STEP_TOKEN_START
} from "../actions/types";

import {
    signinUserSuccess,
    signinUserFailure,
    signUpUserInFirebaseSuccess,
    signUpUserInFirebaseFailure,
    logoutUserFromFirebaseSuccess,
    logoutUserFromFirebaseFailure,
    createTwoStepTokenFinish
} from "../actions";


function* signInUserwithApi({ payload }) {
    let userData = payload.user;
    let history = payload.history;
    console.log("consoling here: ", payload);
}

/**
 * Create User
*/

export function* signInUser() {
    console.log("inside saga..");
    yield takeEvery(SIGNIN_USER, signInUserwithApi);
}

///-------------------------------------------------------------

/**
 * Auth Root Saga
 */
export default function* rootSaga() {
    console.log("ooo");
    yield all([

        fork(signInUser),
    ]);
}