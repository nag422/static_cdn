import { Box, Grid } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import RecommendExplorecard from '../components/explorecard/RecommendExplorecard'
import Pagination from '@material-ui/lab/Pagination';

import * as apirequest from './api/api';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// import { useSelector } from 'react-redux';


const Recommended = () => {    
    
    // const response = useSelector((state) => state.productSave);
    const [allproducts,setAllproducts] = useState([])    
    const [pageNumber, setPageNumber] = useState(1)
    const [open, setOpen] = React.useState(false)
    const [alertseverity, setAlertseverity] = React.useState('success')
    const [productmessage, setProductmessage] = React.useState('')

    useEffect(() => {
        const setprod = async() =>{

            const allprod = await apirequest.getallrecommendedproducts({'pageNumber':pageNumber})
            
            setAllproducts(allprod)

        }
        setprod()
        

        
    }, [pageNumber])



    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }


    // useEffect(() => {
    //     setAllproducts(response.products)
    // }, [])

    // SnackBar

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const addlikes = async (e, id) => {
        const response = await apirequest.addlike(id)
        if (+response.status === 200) {
            const updatedproducts = allproducts.filter((val, key) => {
                return [...allproducts, +val.id == +id ? val.isliked = !val.isliked : null]
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

       <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={alertseverity}>
                {productmessage}
            </Alert>
        </Snackbar>

            <Grid container spacing={2}>
            {allproducts.map((val,index) => {
                return <Grid item md={4} sm={12} xs={12} lg={4} key={index}><RecommendExplorecard val={val} likefun={addlikes} interestfun={addfavorites} /></Grid>
            })}
            </Grid>
            <Box display="flex" justifyContent="center" alignItems="center" mt={5} mb={5}>
                <Pagination count={10} color="primary" />
            </Box>
            
</>
           
        
    )
}

export default Recommended
