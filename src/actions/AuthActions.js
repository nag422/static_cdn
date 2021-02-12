/* eslint-disable no-sequences */
/**
 * Auth Actions
 * Auth Action With Google, Facebook, Twitter and Github
 */

import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER,
    LOGOUT_USER_SUCCESS,
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILURE,
    LOGIN_FACEBOOK_USER,
    LOGIN_GOOGLE_USER,
    LOGIN_TWITTER_USER,
    LOGIN_GITHUB_USER,
    LOGOUT_USER_FAILURE,
    SIGNIN_USER,
    CREATE_TWO_STEP_TOKEN_START,
    CREATE_TWO_STEP_TOKEN_FINISH
  } from "./types";

/**
 * Redux Action To Sigin User With Firebase
 */

export const signinUser = (user, history) => (
    console.log("skfdsdfjndf", user, history),
    {
      type: SIGNIN_USER,
      payload: { user, history }
    }
  );