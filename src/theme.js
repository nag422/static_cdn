import { createMuiTheme, fade} from '@material-ui/core'
import {deepPurple, amber} from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
        type:'light',
        white: {
            main: "#FFFFFF",
          },
          black: {
            light: "#12263F",
            main: "#000000",
          },
          transparent: {
            main: "transparent",
          },
          gray: {
            100: "#f6f9fc",
            200: "#e9ecef",
            300: "#dee2e6",
            400: "#ced4da",
            500: "#adb5bd",
            600: "#8898aa",
            700: "#525f7f",
            800: "#32325d",
            900: "#212529",
          },
        primary: {
            light: '#1282a2',
            main: '#034078',
            dark: '#0a1128',
            contrastText: '#fff',
          },
          secondary: {
            light: '#598392',
            main: amber[500],
            dark: amber[800],
            contrastText: '#000',
          },
          warning: {
            light: "#ffd600",
            main: "#fb6340",
            snackbar: "#fc7c5f",
            badgeBg: "#fee6e0",
            badgeBgHover: "#f93305",
            badge: "#ff3709",
          },
          error: {
            light: "#f3a4b5",
            main: "#f5365c",
            snackbar: "#f75676",
            badgeBg: "#fdd1da",
            badgeBgHover: "#e30b36",
            badge: "#f80031",
            dialogNotification: "#f56036",
          },
          info: {
            main: "#11cdef",
            snackbar: "#37d5f2",
            badgeBg: "#aaedf9",
            badgeBgHover: "#0c9cb7",
            badge: "#03acca",
          },
          background: {
            default: "#f8f9fe",
          },
          text: {
            primary: "#525f7f",
          },
          dark: {
            tableBorder: "#1f3a68",
            tableHeadColor: "#4d7bca",
            tableHeadBgColor: "#1c345d",
            main: "#172b4d",
            dark: "#0b1526",
            snackbar: "#3c4d69",
            badgeBg: "#4172c6",
            badgeBgHover: "#09111e",
          },
          success: {
            main: "#2dce89",
            snackbar: "#4fd69c",
            badgeBg: "#b0eed3",
            badgeBgHover: "#229c68",
            badge: "#1aae6f",
          },
    },
    typography:{
        fontFamily: "Lato, sans-serif"
    }
});
// Global props styles
theme.props = {
    MuiButton:{
        disableElevation:true
    },
    MuiInputLabel: {
        shrink: true
    },
    MuiInput:{
        disableUnderline:true
    },
    
}

theme.overrides = {
    // MuiButton:{
    //     default: {
    //         borderRadius: 0,
    //         textTransform:'none'
    //     },
    //     containedPrimary:{
    //         "&:hover":{
    //             backgroundColor: amber[500],
    //             color: 'red'
    //         }
    //     }
    // },
    
    MuiInput:{
        root:{
            // border:'1px solid gray',
            top:5,
            
            '&$focused':{
                borderRadius:5,
                boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.1rem`,
                borderColor: theme.palette.primary.main
            }
            
        },
        
    },
    MuiInputLabel:{
        root:{
            // textTransform:'uppercase'
        }
    }
}

export default theme;