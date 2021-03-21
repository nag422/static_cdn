/**
 * Auth User Reducers
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


/**
 * initial auth user
 */
const INIT_STATE = {
    // user: localStorage.getItem("user")
    //     ? JSON.parse(localStorage.getItem("user"))
    //     : null,
    access_token: localStorage.getItem("access_token"),
    loading: false,
    user: null,
    isAuthenticated:false,
    thememode:true
};


// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER:
        case SIGNIN_USER:
            return { ...state, loading: true };

        case LOGIN_USER_SUCCESS:
            return { ...state, loading: false, user: action.payload, isAuthenticated:true };

        case LOGIN_USER_FAILURE:
            // NotificationManager.error(action.payload);
            return { ...state, loading: false };        
       
        case LOGOUT_USER:
            return { ...state };

        case LOGOUT_USER_SUCCESS:
            return { ...state, user: null, isAuthenticated:false };

        case LOGOUT_USER_FAILURE:
            return { ...state };

        case SIGNUP_USER:
            return { ...state, loading: true };

        case SIGNUP_USER_SUCCESS:
            // NotificationManager.success("Account Created");
            return { ...state, loading: false, user: action.payload.uid };

        case SIGNUP_USER_FAILURE:
            // NotificationManager.error(action.payload);
            return { ...state, loading: false };

        case CREATE_TWO_STEP_TOKEN_START:
            return { ...state, requestPassword: action.data };

        case CREATE_TWO_STEP_TOKEN_FINISH:
            return { ...state, twoStepTokenResp: action.data };
        case THEME_MODE_TOGGLE_SUCCESS:
            
            return {...state, thememode:!state.thememode}

        default:
            return { ...state };
    }
};