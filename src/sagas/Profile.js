/**
 * Auth Sagas
 */
import { all, call, fork, put, takeEvery, takeLatest, takeLeading } from "redux-saga/effects";

import axios from 'axios';
import {

    UPDATE_PROFILE_PRIMARY,
    UPDATE_PROFILE_PRIMARY_SUCCESS,
    UPDATE_PROFILE_PRIMARY_FAILURE

} from "../actions/types";
import {updateUserProfilewithApiRequest} from './api/api'


function* updateUserProfilewithApi({ payload }) {
    // debugger;
    try {
        const ProfileResponse = yield call(
            updateUserProfilewithApiRequest,
            payload

        );

        if (ProfileResponse.status == 200) {
            yield put({
                type: UPDATE_PROFILE_PRIMARY_SUCCESS,
                payload: ProfileResponse.response

            })

        }else{
            yield put({
                type: UPDATE_PROFILE_PRIMARY_FAILURE,
                payload: ProfileResponse.response

            })
        }
        
    }
    catch (error) {
        yield put({
            type: UPDATE_PROFILE_PRIMARY_FAILURE


        })

    }
    console.log("UpdateProfile 2nd  gen step saga called..");
    //   yield put();
    // console.log(signOutResponse)
}



export function* profileUpdateSage() {
    console.log("UpdateProfile saga called..");
    
    yield takeLeading(UPDATE_PROFILE_PRIMARY, updateUserProfilewithApi);
}





/**
 * Profile Root Saga
 */
export default function* rootSaga() {
    console.log("Profile Saga Completed");
    yield all([

        fork(profileUpdateSage)
    ]);
}