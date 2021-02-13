import React from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, Chip, Typography } from '@material-ui/core';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import MoneyIcon from '@material-ui/icons/Money';
import LinearProgress from '@material-ui/core/LinearProgress';
import { amber, green, red, pink } from '@material-ui/core/colors';
import { Doughnut,Bar } from 'react-chartjs-2';
import Apexchartdemo from './Apexchartdemo'
import TrafficByDevice from './TrafficByDevice';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        display: 'flex',
        padding: theme.spacing(5,3),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height:'100%'
       
    },
    avatarcolor: {
        backgroundColor: theme.palette.primary.main
    },
    headingtext: {
        fontSize: '12px',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    pricetext: {
        color: "#000",
        fontSize: '18px',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    chipnumber: {
        borderRadius: 5,
        padding: theme.spacing(0.8, 0.5),
        fontSize: '12px'

    }
}));
const data = {
    datasets: [{
        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,
        data: [10, 20, 30, 40, 50, 60, 70]
    }]
};


const Dashboardadmin = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>

                <Grid item xs={12} sm={3}>
                    <Paper className={classes.paper}>
                        <Box display="flex" alignItems="flex-start" flexDirection="column">
                            <Typography component='p' className={classes.headingtext}>
                                TODAYS MONEY
                        </Typography>
                            <Typography component='p' className={classes.pricetext}>
                                $24,000   <Box component="span"
                                    className={classes.chipnumber}
                                    style={{
                                        color: green[800],
                                        backgroundColor: green[100],
                                    }}>
                                    +4%
                                      </Box>
                            </Typography>
                        </Box>
                        <Avatar className={classes.avatarcolor}>
                            <AttachMoneyOutlinedIcon />
                        </Avatar>

                    </Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Paper className={classes.paper}>
                        <Box display="flex" alignItems="flex-start" flexDirection="column">
                            <Typography component='p' className={classes.headingtext}>
                            TOTAL CUSTOMERS
                        </Typography>
                            <Typography component='p' className={classes.pricetext}>
                                1,600   <Box component="span"
                                    className={classes.chipnumber}
                                    style={{
                                        color: red[800],
                                        backgroundColor: red[100],
                                    }}>
                                    +4%
                                      </Box>
                            </Typography>
                        </Box>
                        <Avatar className={classes.avatarcolor}>
                            <PeopleIcon />
                        </Avatar>

                    </Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                
                    <Paper className={classes.paper}>
                    
                        <Box display="flex" alignItems="flex-start" flexDirection="column">
                            <Typography component='p' className={classes.headingtext}>
                            TASKS PROGRESS 
                            <LinearProgress variant="determinate" value={30.5}  />
                            <Typography variant="body2" color="textSecondary"
                            style={{
                                color: red[800],
                                
                            }}
                            >30.5% </Typography>
                             
                        </Typography>
                        
                            
                                
                                
                            
                        </Box>
                        
                        <Avatar className={classes.avatarcolor}>
                            <InsertChartIcon />
                            
                        </Avatar>

                    </Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Paper className={classes.paper}>
                        <Box display="flex" alignItems="flex-start" flexDirection="column">
                            <Typography component='p' className={classes.headingtext}>
                            BUDGET
                        </Typography>
                            <Typography component='p' className={classes.pricetext}>
                                $23,200  <Box component="span"
                                    className={classes.chipnumber}
                                    style={{
                                        color: pink[800],
                                        backgroundColor: pink[100],
                                    }}>
                                    +4%
                                      </Box>
                            </Typography>
                        </Box>
                        <Avatar className={classes.avatarcolor}>
                            <MoneyIcon />
                        </Avatar>

                    </Paper>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                    
                    <Grid item xs={12} sm={8}>
                    <Apexchartdemo />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    
                        <TrafficByDevice />

                    </Grid>
                    
      </Grid>
        </div>
    )
}

export default Dashboardadmin
