import SigninFirebase from '../container/SigninFirebase'
import SignupFirebase from '../container/SignupFirebase'
import Dashboardadmin from '../container/Dashboardadmin'
import ForgotPassword from '../container/ForgotPassword';
import ContentRequest from '../container/ContentRequest'
import ContentExplore from '../container/ContentExplore'
import UsersList from '../container/UsersList'
import ContentExploreAdmin from '../container/ContentExploreAdmin';

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    //Auth url
    {
        path: "signin",
        component: SigninFirebase,
        exact: true,
        layout:'auth'
    },
    {
        path: "signup",
        component: SignupFirebase,
        exact: true,
        layout:'auth'
    },
    {
        path: "dashboard",
        component: Dashboardadmin,
        exact: true
    },
    {
        path: "users",
        component: UsersList,
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
        path: "contentadmin",
        component: ContentExploreAdmin,
        exact: true
    },
    {
        path: "contentrequest",
        component: ContentRequest,
        exact: true
    },
    
];
