import SigninFirebase from '../container/SigninFirebase'
import SignupFirebase from '../container/SignupFirebase'
import Dashboardadmin from '../container/Dashboardadmin'
import ForgotPassword from '../container/ForgotPassword';
import ContentRequest from '../container/ContentRequest'
import ContentExplore from '../container/ContentExplore'

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
    {
        path: "reset",
        component: ForgotPassword,
        exact: true
    },
    {
        path: "content",
        component: ContentExplore,
        exact: true
    },
    {
        path: "contentrequest",
        component: ContentRequest,
        exact: true
    },
    
];
