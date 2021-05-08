import { Box, Grid, Snackbar } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import UserRecommendexplorecard from '../../components/explorecard/UserRecommendexplorecard'
import Pagination from '@material-ui/lab/Pagination';

import * as apirequest from '../api/api';
import Productskeleton from '../../components/skeletons/Productskeleton';
import MuiAlert from '@material-ui/lab/Alert';
// import { useSelector } from 'react-redux';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const UserRecommended = (props) => {    
    
    // const response = useSelector((state) => state.productSave);
    const [allproducts,setAllproducts] = useState([])    
    const [pageNumber, setPageNumber] = useState(1)
    const [open, setOpen] = React.useState(false)
    const [alertseverity, setAlertseverity] = React.useState('success')
    const [productmessage, setProductmessage] = React.useState('')

    const [loading, setLoading] = React.useState(false)
    const [totalrecords,setTotalrecords] = React.useState(0)
    useEffect(() => {
        const setprod = async() =>{
            setLoading(true)
            const allprod = await apirequest.getallrecommendedproductsadmin({'pageNumber':pageNumber,'dynoid':props.match.params.id})
            
            setAllproducts(allprod.obs)
            setTotalrecords(allprod.totalrecords)
            setLoading(false)

        }
        setprod()
        

        
    }, [pageNumber])


    // useEffect(() => {
    //     setAllproducts(response.products)
    // }, [])
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const handlePagechange = (event, number) => {
        // alert(number)
        setPageNumber(number)
    }
    
    const vertical = "top"
    const horizontal = "right"
    return (
       <>
       {loading && <Productskeleton />}
            <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertseverity}>
                    {productmessage}
                </Alert>
            </Snackbar>
            <Grid container spacing={2}>
            {(allproducts?allproducts:[]).map((val,index) => {
                return <Grid item md={4} sm={12} xs={12} lg={4} key={index}><UserRecommendexplorecard val={val} /></Grid>
            })}
            </Grid>
            <Box display="flex" justifyContent="center" alignItems="center" mt={5} mb={5}>
                <Pagination onChange={handlePagechange} count={Math.floor(totalrecords/8)} color="primary" />
            </Box>
            
</>
           
        
    )
}

export default UserRecommended
