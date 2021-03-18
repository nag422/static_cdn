/* eslint-disable no-sequences */
/**
 * Auth Actions
 * Auth Action With Google, Facebook, Twitter and Github
 */

import {
  
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  SIGNIN_USER,
  THEME_MODE_TOGGLE,
  LOGOUT_USER,
  GET_USER_PROFILE_DATA,
  UPDATE_PROFILE_PRIMARY,
  UPDATE_PROFILE_SECONDARY
} from "./types";

/**
 * Redux Action To Sigin User With Firebase
 */

export const signinUser = (user,history) => (
  console.log("skfdsdfjndf", user),
  {
    type: SIGNIN_USER,
    payload: { user,history }
  }
);

// SignOut

export const signoutUser = () => (
 
  {
    type: LOGOUT_USER
  }
);

/**
* Redux Action Signin User Success
*/

//log in Action after success
// export const signinUserSuccess = user => ({
//   type: LOGIN_USER_SUCCESS,
//   payload: user
// });

 
/**
* Redux Action Signin User Failure
*/
// export const signinUserFailure = error => ({
//   type: LOGIN_USER_FAILURE,
//   payload: error
// });


// Profile Operations
export const getProfileData = (data) => (
 
  {
    type: GET_USER_PROFILE_DATA,
    payload:data
  }
);
export const ProfileUpdatePrimary = () => (
 
  {
    type: UPDATE_PROFILE_PRIMARY
  }
);
export const ProfileUpdateSecondary = () => (
 
  {
    type: UPDATE_PROFILE_SECONDARY
  }
);

// End Profile Operations
export const themodechanger = () => (

{
  type:THEME_MODE_TOGGLE
})