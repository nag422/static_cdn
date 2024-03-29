import React from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link,useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, Chip, Typography } from '@material-ui/core';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import MoneyIcon from '@material-ui/icons/Money';
import LinearProgress from '@material-ui/core/LinearProgress';
import { amber, green, red, pink } from '@material-ui/core/colors';
import { Doughnut, Bar } from 'react-chartjs-2';
import Apexchartdemo from './Apexchartdemo'
import TrafficByDevice from './TrafficByDevice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        display: 'flex',
        padding: theme.spacing(2, 3),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '100%'

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
    const [responsedata,setResponsedata] = React.useState({
        sellers:0,
        buyers:0,
        sellerenquiries:0,
        buyerenquiries:0
    })

    const dispatch = useDispatch()
    const response = useSelector(state => state.profileops.profile.user_ptr)
    const profileresponse = useSelector(state => state.profileops.profile)
    const history = useHistory();

    // const url = 'http://127.0.0.1:8000/'
    const url = 'https://app.contentbond.com/'

    const getToken = () => {
        
        try{
            var unparsedtoken = localStorage.getItem('access_token');
            var parsedtoken = JSON.parse(unparsedtoken);
            return parsedtoken.access_token
        }catch{
            return 'sdfsdfsdfsdf'

        }
        
    }

    const config = {
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Token '+ getToken()
        }
    }

    React.useEffect(() => {
        if(!response.is_superuser) {

            if(profileresponse.content == "creator"){
            return history.push('/admin/seller/dashboard')
        }else if(profileresponse.content == "producer"){
            return history.push('/admin/buyer/dashboard')
        }


        }
        
        console.log('user response',profileresponse.content)

        const loadDashboard = async() => {
            await axios
            .get(url + "admin/dashboardview/", config)
            .then(resp => { 

                setResponsedata({
                    ...responsedata,
                    sellers:resp.data.sellers,
                    buyers:resp.data.buyers,
                    sellerenquiries:resp.data.sellerenquiries,
                    buyerenquiries:resp.data.buyerenquiries

                })
                
             })
            .catch(error => {
                alert(error.message)
            });
    
      

        }

        loadDashboard();
        
        
    }, [])

    

   




    return (
        <div className={classes.root}>
            <Grid container spacing={3}>

                <Grid item xs={12} sm={3}>
                    <Paper className={classes.paper}>

                   
                        <Box display="flex" alignItems="flex-start" flexDirection="column">
                        <Link
                            to={{
                                pathname: "/admin/dasboard/users",
                                // search: "?sort=name",
                                // hash: "#the-hash",
                                state: { fromDashboard: true, contentype:'creator' }
                            }}
                        >
                            
                            <Typography component='p' className={classes.headingtext}>
                                SELLERS
                            </Typography>
                            </Link>



                            <Box component='div' className={classes.pricetext}>
                                {responsedata.sellers} 

                                {/* <Box component="p"
                                    className={classes.chipnumber}
                                    style={{
                                        color: green[800],
                                        backgroundColor: green[100],
                                    }}>
                                    +4%
                                </Box> */}

                            </Box>
                        </Box>
                        <Avatar className={classes.avatarcolor}>
                            <PeopleIcon />
                        </Avatar>

                    </Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Paper className={classes.paper}>
                        <Box display="flex" alignItems="flex-start" flexDirection="column">
                        <Link
                            to={{
                                pathname: "/admin/dasboard/users",
                                // search: "?sort=name",
                                // hash: "#the-hash",
                                state: { fromDashboard: true, contentype:'producer' }
                            }}
                        >
                            
                            <Typography component='p' className={classes.headingtext}>
                                BUYERS
                        </Typography>
                        </Link>
                            <Box component='div' className={classes.pricetext}>
                            {responsedata.buyers}    
                            {/* <Box component="p"
                                    className={classes.chipnumber}
                                    style={{
                                        color: red[800],
                                        backgroundColor: red[100],
                                    }}>
                                    +4%
                            </Box> */}
                            </Box>
                        </Box>
                        <Avatar className={classes.avatarcolor}>
                            <PeopleIcon />
                        </Avatar>

                    </Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Paper className={classes.paper}>
                        <Box display="flex" alignItems="flex-start" flexDirection="column">
                        <Link
                            to={{
                                pathname: "/admin/backend/message",
                                // search: "?sort=name",
                                // hash: "#the-hash",
                                state: { fromDashboard: true, contentype:'creator' }
                            }}
                        >
                            <Typography component='p' className={classes.headingtext}>
                               SELLER ENQUIRIES
                        </Typography>
                        </Link>
                            <Box component='div' className={classes.pricetext}>
                            {responsedata.sellerenquiries} 
                                {/* <Box component="div"
                                    className={classes.chipnumber}
                                    style={{
                                        color: pink[800],
                                        backgroundColor: pink[100],
                                    }}>
                                    +4%
                                </Box> */}
                            </Box>
                        </Box>
                        <Avatar className={classes.avatarcolor}>
                            <InsertChartIcon />
                        </Avatar>

                    </Paper>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <Paper className={classes.paper}>
                        <Box display="flex" alignItems="flex-start" flexDirection="column">
                        <Link
                            to={{
                                pathname: "/admin/backend/message",
                                // search: "?sort=name",
                                // hash: "#the-hash",
                                state: { fromDashboard: true, contentype:'producer' }
                            }}
                        >
                            <Typography component='p' className={classes.headingtext}>
                            BUYER ENQUIRIES
                        </Typography>
                        </Link>
                            <Box component='div' className={classes.pricetext}>
                            {responsedata.buyerenquiries} 
                                {/* <Box component="div"
                                    className={classes.chipnumber}
                                    style={{
                                        color: pink[800],
                                        backgroundColor: pink[100],
                                    }}>
                                    +4%
                                </Box> */}
                            </Box>
                        </Box>
                        <Avatar className={classes.avatarcolor}>
                            <MoneyIcon />
                        </Avatar>

                    </Paper>
                </Grid>


            </Grid>

            <Grid container spacing={3}>

                <Grid item xs={12} sm={8}>
                    <Apexchartdemo userdata = {responsedata} />
                </Grid>
                <Grid item xs={12} sm={4}>

                    <TrafficByDevice userdata = {responsedata} />

                </Grid>

            </Grid>
        </div>
    )
}

export default Dashboardadmin
