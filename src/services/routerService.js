import SigninFirebase from '../container/SigninFirebase'
import SignupFirebase from '../container/SignupFirebase'
import Dashboardadmin from '../container/Dashboardadmin'

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    //Auth url
    {
        path: "signin",
        component: SigninFirebase,
        exact: true
    },
    {
        path: "signup",
        component: SignupFirebase,
        exact: true
    },
    {
        path: "dashboard",
        component: Dashboardadmin,
        exact: true
    },
    
];
