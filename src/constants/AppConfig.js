/**
 * App Config File
 */
const AppConfig = {
   appLogo: require('../assets/img/site-logo.png'),          // App Logo
   brandName: 'Brandowler Admin',                                // Brand Name,
   pageTitle:'Brandowler',                                         //Page Tile
   navCollapsed: false,                                      // Sidebar collapse
   darkMode: false,                                          // Dark Mode
   boxLayout: false,                                         // Box Layout
   rtlLayout: false,                                         // RTL Layout
   miniSidebar: false,                                       // Mini Sidebar
   enableSidebarBackgroundImage: false,                      // Enable Sidebar Background Image
   sidebarImage: require('../assets/img/sidebar-4.jpg'),     // Select sidebar image
   isDarkSidenav: false,                                   // Set true to dark sidebar
   enableThemeOptions: true,                              // Enable Theme Options
   locale: {
      languageId: 'english',
      locale: 'en',
      name: 'English',
      icon: 'en',
   },
   enableUserTour: process.env.NODE_ENV === 'production' ? false : false,  // Enable / Disable User Tour
   copyRightText: 'Brandowler © 2019 All Rights Reserved.',      // Copy Right Text
   // light theme colors
   themeColors: {
      'primary': '#5D92F4',
      'secondary': '#677080',
      'success': '#00D014',
      'danger': '#FF3739',
      'warning': '#FFB70F',
      'info': '#00D0BD',
      'dark': '#464D69',
      'default': '#FAFAFA',
      'greyLighten': '#A5A7B2',
      'grey': '#677080',
      'white': '#FFFFFF',
      'purple': '#896BD6',
      'yellow': '#D46B08'
   },
   // dark theme colors
   darkThemeColors: {
      darkBgColor: '#424242'
   },
   apiUrl: 'https://prod.api.brandowler.com/',//'http://13.127.215.155:3003/', ///production
   stageApiUrl : 'https://stage.api.brandowler.com/'  ,            ///stage url,

   roleNames :{
      clientUser : 'Client',
      clientAdmin : 'Client Admin',
      octoAdmin : 'Brandowler Admin'
   }
}

export default AppConfig;
