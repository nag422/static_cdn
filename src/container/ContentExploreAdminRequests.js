import { Box, Grid, Snackbar } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import ContentExplorecard from '../components/explorecard/ContentExplorecardAdminRequests'
import Pagination from '@material-ui/lab/Pagination';
import Productskeleton from '../components/skeletons/Productskeleton'
import * as apirequest from './api/api';
import * as cardapi from './api/cardactionsapi';
import { Alert } from '@material-ui/lab';

// import { useSelector } from 'react-redux';


const ContentExploreAdminRequests = () => {    
    
    // const response = useSelector((state) => state.productSave);
    const [allproducts,setAllproducts] = useState([])    
    const [pageNumber, setPageNumber] = useState(1)
    const [alertseverity, setAlertseverity] = React.useState('success')
    const [productmessage, setProductmessage] = React.useState('')
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [totalrecords,setTotalrecords] = React.useState(0)
    useEffect(() => {
        const setprod = async() =>{
            setLoading(true)
            const allprod = await apirequest.getallbaggedproducts({ 'pageNumber': pageNumber })
            
            setAllproducts(allprod.obs)
            setTotalrecords(allprod.totalrecords)
            setLoading(false)

        }
        setprod()
        

        
    }, [pageNumber])


    // useEffect(() => {
    //     setAllproducts(response.products)
    // }, [])

    const handlePagechange = (event, number) => {
        // alert(number)
        setPageNumber(number)
    }

     // SnackBar

     const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const addfavorites = async (e, id) => {
        const response = await apirequest.addinterest(id)

        if (+response.status === 200) {
            const updatedproducts = allproducts.filter((val, key) => {
                return [...allproducts, +val.id == +id ? val.isfavored = !val.isfavored : null]
            })
            setAllproducts(updatedproducts);
            setProductmessage(response.message)
            setOpen(true);
            setAlertseverity('success')

        } else {
            setProductmessage(response.message)
            setOpen(true);
            setAlertseverity('error')
        }
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
                return <Grid item md={4} sm={12} xs={12} lg={4} key={index}><ContentExplorecard val={val} interestfun={addfavorites} /></Grid>
            })}
            </Grid>
            <Box display="flex" justifyContent="center" alignItems="center" mt={5} mb={5}>
            <Pagination onChange={handlePagechange} count={Math.floor(totalrecords/8)} color="primary" />
            </Box>
            
</>
           
        
    )
}

export default ContentExploreAdminRequests
