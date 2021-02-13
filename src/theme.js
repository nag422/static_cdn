import { createMuiTheme, fade} from '@material-ui/core'
import {deepPurple, amber} from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
        type:'light',
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