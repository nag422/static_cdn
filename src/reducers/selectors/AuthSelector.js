/* eslint-disable default-case */
import {createSelector} from "reselect";

export const authisAuthenticated = (state) => state.isAuthenticated;

export const authUserState = createSelector(
    [authisAuthenticated],
    (isAuthenticated) => {
        debugger;
        return isAuthenticated;
    }
)