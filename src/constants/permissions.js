export const permissions = {
    CREATE_USER_ACCOUNT: 'CREATE_USER_ACCOUNT',
    EDIT_USER_ACCOUNT: 'EDIT_USER_ACCOUNT',
    DELETE_USER_ACCOUNT: 'DELETE_USER_ACCOUNT',

    GET_CLIENT_ADMIN_LIST: 'GET_CLIENT_ADMIN_LIST',
    GET_CLIENT_LIST: 'GET_CLIENT_LIST',

    CREATE_USER_TOPIC: 'CREATE_USER_TOPIC',
    EDIT_USER_TOPIC: 'EDIT_USER_TOPIC',
    DELETE_USER_TOPIC: 'DELETE_USER_TOPIC',

    EDIT_USER_PERMISSIONS: 'EDIT_USER_PERMISSIONS',

    CREATE_USER_HANDLE: 'CREATE_USER_HANDLE',
    DELELTE_USER_HANDLE: 'DELELTE_USER_HANDLE',

    ASSIGN_PRIORITY_TAGS: 'ASSIGN_PRIORITY_TAGS',
    CHANGE_PRIORITY_TAGS: 'CHANGE_PRIORITY_TAGS',

    CHANGE_USER_PASSWORD: 'CHANGE_USER_PASSWORD',
    CHANGE_USER_ROLE: 'CHANGE_USER_ROLE',

    TWITTER: 'TWITTER',
    FACEBOOK: 'FACEBOOK',
    YOUTUBE: 'YOUTUBE',
    MEDIABUZZ: 'MEDIABUZZ'
}

export const permissions2 = {
    USER_ACCOUNT: {
        NAME: 'User Account',
        VIEW: null,
        CREATE: 'CREATE_USER_ACCOUNT',
        EDIT: 'EDIT_USER_ACCOUNT',
        DELETE: 'DELETE_USER_ACCOUNT',
        description: "Allows to create, update and delete user"
    },
    USER_TOPIC: {
        NAME: 'User Topic',
        VIEW: null,
        CREATE: 'CREATE_USER_TOPIC',
        EDIT: 'EDIT_USER_TOPIC',
        DELETE: 'DELETE_USER_TOPIC',
        description: "Allows to add update and delete topics for user"
    },
    USER_ROLE: {
        NAME: 'User Role',
        VIEW: null,
        CREATE: null,
        EDIT: 'CHANGE_USER_ROLE',
        DELETE: null,
        description: "Allows to change role for user"
    },
    USER_PASSWORD:
        {
            NAME: 'User Password',
            VIEW: null,
            CREATE: null,
            EDIT: 'CHANGE_USER_PASSWORD',
            DELETE: null,
            description: "Allows to change user password"
        },
    USER_HANDLE: {
        NAME: 'User Handle',
        CREATE: 'CREATE_USER_HANDLE',
        VIEW: 'GET_USER_HANDLE',
        EDIT: null,
        DELETE: 'DELELTE_USER_HANDLE',
        description: "Allows to add, view and delete Handles"
    },
    USER_PERMISSION: {
        NAME: 'User Permissions',
        CREATE: null,
        EDIT: 'EDIT_USER_PERMISSIONS',
        VIEW: null,
        DELETE: null,
        description: "Allows to view, add, update and remove permissions for a user"
    },
    USER_NEWS_SOURCE: {
        NAME: 'User News Source',
        VIEW: 'GET_USER_NEWS_SOURCE',
        CREATE: 'CREATE_USER_NEWS_SOURCE',
        EDIT: null,
        DELETE: null,
        description: "Allows to add, update news source for user"
    },
    CLIENT_ADMIN_LIST: {
        NAME: 'Client Admin List',
        VIEW: 'GET_CLIENT_ADMIN_LIST',
        CREATE: null,
        EDIT: null,
        DELETE: null,
        description: 'Allows to see list of client admins'
    },
    CLIENT_USER_LIST:{
        NAME: 'Client User list',
        VIEW: 'GET_CLIENT_USER_LIST',
        CREATE: null,
        EDIT: null,
        DELETE: null,
        description: 'Allows to see list of client users'
    },
    CLIENT_LIST: {
        NAME: 'Client List',
        VIEW: 'GET_CLIENT_LIST',
        CREATE: null,
        EDIT: null,
        DELETE: null,
        description: "N/A"
    },
    CLIENT_ADMIN_ACCOUNT:{
        NAME: 'Client Admin Account',
        VIEW: null,
        CREATE: 'CREATE_CLIENT_ADMIN_ACCOUNT',
        EDIT: null,
        DELETE: null,
        description: "Allows to create client Admin account"
    },
    SENTIMENT_YOUTUBE:{
        NAME: 'Youtube Sentiment',
        VIEW: null,
        CREATE: null,
        EDIT: 'EDIT_SENTIMENT_YOUTUBE',
        DELETE: null,
        description: "Allows to edit Youtube sentiment"
    },
    SENTIMENT_TWITTER:{
        NAME: 'Twitter Sentiment',
        VIEW: null,
        CREATE: null,
        EDIT: 'EDIT_SENTIMENT_TWITTER',
        DELETE: null,
        description: "Allows to edit Twitter sentiment"
    },
    TWITTER: {
        NAME: 'Twitter',
        CREATE: null,
        VIEW: 'TWITTER',
        EDIT: null,
        DELETE: null,
        description: "Enable Twitter tab in Topics for user"
    },
    FACEBOOK: {
        NAME: 'Facebook',
        CREATE: null,
        VIEW: 'FACEBOOK',
        EDIT: null,
        DELETE: null,
        description: "Enable Facebook tab in Topics for user"
    },
    YOUTUBE: {
        NAME: 'YOUTUBE',
        CREATE: null,
        VIEW: 'YOUTUBE',
        EDIT: null,
        DELETE: null,
        description: "Enable Youtube tab in Topics for user"
    },
    MEDIABUZZ: {
        NAME: 'MEDIABUZZ',
        CREATE: null,
        VIEW: 'MEDIABUZZ',
        EDIT: null,
        DELETE: null,
        description: "Enable MediaBuzz in Topics for user"
    }
}