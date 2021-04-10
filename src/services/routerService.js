import SigninFirebase from '../container/SigninFirebase'
import SignupFirebase from '../container/SignupFirebase'
import Dashboardadmin from '../container/Dashboardadmin'
import ForgotPassword from '../container/ForgotPassword';
import ContentRequest from '../container/ContentRequest'
import ContentExplore from '../container/ContentExplore'
import UsersList from '../container/UsersList'
import ContentExploreAdmin from '../container/ContentExploreAdmin';
import Profile from '../container/Profile';
import UserGroups from '../container/UserGroups';
import ContentExploreFavorite from '../container/ContentExploreFavorite';
import ContentExploreAdminBagged from '../container/ContentExploreAdminBagged';
import Recommended from 'container/Recommended';
import ConfirmPassword from 'container/ConfirmPassword';
import ChatMessenger from 'container/ChatMessenger';

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
        exact: true,
        layout:'admin'
    },
    {
        path: "users",
        component: UsersList,
        exact: true,
        layout:'admin'
    },
    {
        path: "groups",
        component: UserGroups,
        exact: true,
        layout:'admin'
    },
    {
        path: "reset",
        component: ForgotPassword,
        exact: true,
        layout:'admin'
    },
    {
        path: "newpassword",
        component: ConfirmPassword,
        exact: true,
        layout:'admin'
    },

    
    {
        path: "profile",
        component: Profile,
        exact: true,
        layout:'admin'
    },
    {
        path: "content",
        component: ContentExplore,
        exact: true,
        layout:'admin'
    },
    {
        path: "contentadmin",
        component: ContentExploreAdmin,
        exact: true,
        layout:'admin'
    },
    {
        path: "favorite",
        component: ContentExploreFavorite,
        exact: true,
        layout:'admin'
    },
    {
        path: "bagged",
        component: ContentExploreAdminBagged,
        exact: true,
        layout:'admin'
    },{
        path: "recommended",
        component: Recommended,
        exact: true,
        layout:'admin'
    },
    {
        path: "contentrequest",
        component: ContentRequest,
        exact: true,
        layout:'admin'
    },
    {
        path: "messages",
        component: ChatMessenger,
        exact: true,
        layout:'admin'
    }
    
];
