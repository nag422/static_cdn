import SigninFirebase from '../container/SigninFirebase'
import SignupFirebase from '../container/SignupFirebase'
import Dashboardadmin from '../container/Dashboardadmin'
import Dashboardseller from '../container/Dashboardseller'
import Dashboardbuyer from '../container/Dashboardbuyer'
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
import Relevanted from 'container/Relevanted';
import ConfirmPassword from 'container/ConfirmPassword';
import Detailcard from '../components/Detailcard/Detailcard'
import ContentEdit from '../container/ContentEdit'
import ContentExploreAdminRequests from '../container/ContentExploreAdminRequests'
import Profiledynamic from '../container/Profiledynamic'

import UserFavorite from '../container/admincopy/UserFavorite'
import UserBagged from '../container/admincopy/UserBagged'
import UserRecommended from '../container/admincopy/UserRecommended'
import Loginredirector from '../container/Loginredirector'
import UserUploads from '../container/admincopy/UserUploads'
import UploadProduct from '../container/admincopy/container/UploadProduct'
import MessageAdmin from '../container/admincopy/container/MessageAdmin'
import MessageSeller from '../container/MessageSeller'
import MessageBuyer from '../container/MessageBuyer'
import NotifyExpore from '../container/NotifyExpore'
import UsersListDashboard from '../container/UsersListDashboard'
import ContentExploreSeller from '../container/ContentExploreSeller'
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
        path: "seller/dashboard",
        component: Dashboardseller,
        exact: true,
        layout:'admin'
    },
    {
        path: "buyer/dashboard",
        component: Dashboardbuyer,
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
        path: "dasboard/users",
        component: UsersListDashboard,
        exact: true,
        layout:'admin'
    },
    {
        path: "dasboard/messages",
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
        path: "password_reset",
        component: ForgotPassword,
        exact: true,
        layout:'auth'
    },
    {
        path: "newpassword",
        component: ConfirmPassword,
        exact: true,
        layout:'admin'
    },

    {
        path: "login/success",
        component: Loginredirector,
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
        path: "profile/:id",
        component: Profiledynamic,
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
        path: "seller/content",
        component: ContentExploreSeller,
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
        path: "interested",
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
        path: "relevant",
        component: Relevanted,
        exact: true,
        layout:'admin'
    },

    
    // Admin

    {
        path: "favorite/:id",
        component: UserFavorite,
        exact: true,
        layout:'admin'
    },
    {
        path: "interested/:id",
        component: UserBagged,
        exact: true,
        layout:'admin'
    },{
        path: "recommended/:id",
        component: UserRecommended,
        exact: true,
        layout:'admin'
    },
    {
        path: "uploads/:id",
        component: UserUploads,
        exact: true,
        layout:'admin'
    },

    // Admin
    {
        path: "upload",
        component: ContentRequest,
        exact: true,
        layout:'admin'
    },
    {
        path: "upload/product",
        component: UploadProduct,
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
        path: "contentedit/:id",
        component: ContentEdit,
        exact: true,
        layout:'admin'
    },
    {
        path: "requests",
        component: ContentExploreAdminRequests,
        exact: true,
        layout:'admin'
    },
    {
        path: "backend/message",
        component: MessageAdmin,
        exact: true,
        layout:'admin'
    },
    {
        path: "seller/message",
        component: MessageSeller,
        exact: true,
        layout:'admin'
    },
    {
        path: "buyer/message",
        component: MessageBuyer,
        exact: true,
        layout:'admin'
    },
    // Notification
    {
        path: "backend/notification",
        component: NotifyExpore,
        exact: true,
        layout:'admin'
    },
    
    // {
    //     path: "seller/notification",
    //     component: NotifyExpore,
    //     exact: true,
    //     layout:'admin'
    // },
    {
        path: "buyer/notification",
        component: NotifyExpore,
        exact: true,
        layout:'admin'
    },
    // Notification
    {
        path: "section/:id",
        component: Detailcard,
        exact: true,
        layout:'admin'
    }
    
];
