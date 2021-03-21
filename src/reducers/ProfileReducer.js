/**
 * Profile User Reducers
 */

 import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER,
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILURE,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAILURE,
    CREATE_TWO_STEP_TOKEN_START,
    CREATE_TWO_STEP_TOKEN_FINISH,
    SIGNIN_USER,
    THEME_MODE_TOGGLE_SUCCESS,
    GET_USER_PROFILE_DATA_SUCCESS,
    UPDATE_PROFILE_PRIMARY_SUCCESS,
    UPDATE_PROFILE_PRIMARY_FAILURE
} from "../actions/types";

const INIT_STATE = {
   
    profile:{},
    loading:false,
    updatestatus:false,
    updaterror:false,

};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_PRIMARY_SUCCESS:
            console.log('profile updating reducer')
            return {...state,updatestatus:true,updaterror:false};
        case GET_USER_PROFILE_DATA_SUCCESS:
            return {...state, profile:action.payload}
        case UPDATE_PROFILE_PRIMARY_FAILURE:
            console.log('profile updating reducer fail')
            return {...state,updaterror:true,updatestatus:false};
        default:
            return { ...state };
    }
}