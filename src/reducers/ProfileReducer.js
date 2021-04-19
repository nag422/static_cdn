/**
 * Profile User Reducers
 */

 import {
   
    GET_USER_PROFILE_DATA_SUCCESS,
    UPDATE_PROFILE_PRIMARY_SUCCESS,
    UPDATE_PROFILE_PRIMARY_FAILURE,
    GET_USER_PROFILE_DATA,
    GET_USER_PROFILE_DATA_FAIL
} from "../actions/types";

const INIT_STATE = {
   
    profile:{
        user_ptr:{

            id:"",
            last_login:"",
            is_superuser:null,
            username:"",
            first_name:"",
            last_name:"",
            email:"",
            is_staff:null,
            is_active:null,
            date_joined:"2021-04-08T16:07:59Z",
            groups:[],
            user_permissions:[],
        },

        
        address: "",
        postalcode: "",
        phone: "",
        city: "",
        country: "",
        content: ""
      },
    profileloading:null,
    updatestatus:null,
    updaterror:null,

};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_USER_PROFILE_DATA:
            console.log('profile called loading from profile reducer');
            return {...state,profileloading:true}
        case UPDATE_PROFILE_PRIMARY_SUCCESS:
            console.log('profile updating reducer')
            return {...state,updatestatus:true,updaterror:false,profileloading:false};            
        case GET_USER_PROFILE_DATA_SUCCESS:            
            return {...state, profile:action.payload,profileloading:false}
        case GET_USER_PROFILE_DATA_FAIL:            
            return {...state,profileloading:false}
        case UPDATE_PROFILE_PRIMARY_FAILURE:
            console.log('profile updating reducer fail')
            return {...state,updaterror:true,updatestatus:false,profileloading:false};
        default:
            return { ...state };
    }
}