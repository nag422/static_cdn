import {    
    GET_USER_PROFILE_DATA,
    UPDATE_PROFILE_PRIMARY,
    UPDATE_PROFILE_SECONDARY
} from "./types";


export const ProfileUpdatePrimary = (data) => (
    console.log('update Profile action called'),
    {
        type: UPDATE_PROFILE_PRIMARY,
        payload: data
    }
);

export const ProfileUpdateSecondary = () => (

    {
        type: UPDATE_PROFILE_SECONDARY
    }
);

// Profile Operations
export const getProfileData = (data) => (
 
    {
      type: GET_USER_PROFILE_DATA,
      payload:data
    }
  );