/* eslint-disable no-sequences */
/**
 * Auth Actions
 * Auth Action With Google, Facebook, Twitter and Github
 */

import {
  
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  SIGNIN_USER,
  THEME_MODE_TOGGLE
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

/**
* Redux Action Signin User Success
*/

//log in Action after success
export const signinUserSuccess = user => ({
  type: LOGIN_USER_SUCCESS,
  payload: user
});


/**
* Redux Action Signin User Failure
*/
export const signinUserFailure = error => ({
  type: LOGIN_USER_FAILURE,
  payload: error
});

export const themodechanger = () => (

{
  type:THEME_MODE_TOGGLE
})