import { Box, Grid } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import UserContentExplorecardFavorite from '../../components/explorecard/UserContentExplorecardFavorite'
import Pagination from '@material-ui/lab/Pagination';
import Productskeleton from '../../components/skeletons/Productskeleton';

import * as apirequest from '../api/api';

// import { useSelector } from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const UserFavorite = (props) => {

    // const response = useSelector((state) => state.productSave);
    const [allproducts, setAllproducts] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [open, setOpen] = React.useState(false)
    const [alertseverity, setAlertseverity] = React.useState('success')
    const [productmessage, setProductmessage] = React.useState('')
    
    const [loading, setLoading] = React.useState(false)
    const [totalrecords,setTotalrecords] = React.useState(0)

    
    

    useEffect(() => {
        const setprod = async () => {
            setLoading(true)
            const allprod = await apirequest.getalllikedproductsadmin({ 'pageNumber': pageNumber,'dynoid':props.match.params.id })

            setAllproducts(allprod.obs)
            setTotalrecords(allprod.totalrecords)
            setLoading(false)

        }
        setprod()



    }, [pageNumber])


    // useEffect(() => {
    //     setAllproducts(response.products)
    // }, [])

    // const addlikes = async (e, id) => {
    //     const response = await apirequest.addlike(id)
    //     if (+response.status === 200) {
    //         const updatedproducts = allproducts.filter((val, key) => {
    //             return [...allproducts, +val.id == +id ? val.isliked = !val.isliked : null]
    //         })
    //         setAllproducts(updatedproducts);
    //         alert(response.message)

    //     } else {
    //         alert('something is went wrong')
    //     }

    // }

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
            <Grid container spacing={2}>
                {(allproducts?allproducts:[]).map((val, index) => {
                    return <Grid item md={4} sm={12} xs={12} lg={4} key={index}><UserContentExplorecardFavorite val={val} /></Grid>
                })}
            </Grid>
            <Box display="flex" justifyContent="center" alignItems="center" mt={5} mb={5}>
            <Pagination onChange={handlePagechange} count={Math.floor(totalrecords/8)} color="primary" />
            </Box>

            {loading && <Productskeleton />}
            <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertseverity}>
                    {productmessage}
                </Alert>
            </Snackbar>
        </>


    )
}

export default UserFavorite
