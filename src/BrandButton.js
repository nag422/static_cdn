import React from 'react'
import PropTypes from 'prop-types'
import { Button, withStyles } from '@material-ui/core'
import { amber, deepPurple } from '@material-ui/core/colors'
import clsx from 'clsx'

const styles = () => ({
    default: {
        borderRadius: 0,
        textTransform:'none'
    },
    primary:{
        "&:hover":{
            backgroundColor: amber[500],
            color: deepPurple[900]
        }
    }
});

const BrandButton = ({color,children,classes}) => {
    return (
        <Button
        variant="contained"
        color={color}
        // className={classes.default}
        // className={clsx(classes.default,classes.primary)}
        classes = {{root:classes.default,containedPrimary:classes.primary}}
        
        // disableElevation
        >
            {children}
        </Button>
    )
}


BrandButton.propTypes = {
    color:PropTypes.string
}
export default withStyles(styles)(BrandButton)
