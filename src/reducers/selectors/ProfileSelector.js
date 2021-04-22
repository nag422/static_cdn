/* eslint-disable default-case */
import {createSelector} from "reselect";

export const adminProfile = (state) => state.profile;
export const adminLoading = (state) => state.profileloading;

export const adminProfileupdatestatus = (state) => state.updatestatus;
export const adminProfileupdaterror = (state) => state.updaterror;

export const adminProfileState = createSelector(
    [adminProfile,adminLoading],
    (profile,profileloading) => {
        debugger;
        switch(profileloading){
            case true:
                return profile;
            case false:
                return {...profile, first_name:''};
            default:
                return profile
        }
    }
)

export const adminProfileUpdateState = createSelector(
    [adminProfileupdatestatus,adminProfileupdaterror],
    (updatestatus,updaterror) => {
        debugger;
        console.log({updatestatus:updatestatus,updaterror:updaterror})
        switch(updatestatus){
            case true:
                return {updatestatus:true,updaterror:false};
            case false:
                return {updatestatus:false,updaterror:true};
            default:
                return {updatestatus:updatestatus,updaterror:updaterror}
        }
    }
)