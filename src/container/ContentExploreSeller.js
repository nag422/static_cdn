import { Box, Grid } from '@material-ui/core'
import React, { useState, useEffect, useCallback } from 'react'
import ContentExplorecard from '../components/explorecard/ContentExplorecard'
import Pagination from '@material-ui/lab/Pagination';

import { useSelector } from 'react-redux';
import * as apirequest from './api/api';
import * as cardapi from './api/cardactionsapi';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const ContentExploreSeller = (props) => {

    const response = useSelector((state) => state.productSave);
    const profileresponse = useSelector(state => state.profileops.profile)
    const [allproducts, setAllproducts] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [open, setOpen] = React.useState(false)
    const [alertseverity, setAlertseverity] = React.useState('success')
    const [productmessage, setProductmessage] = React.useState('')

    

    useEffect(() => {
        const setprod = async () => {

            const allprod = await apirequest.getsellerproducts({ 'pageNumber': pageNumber })
            console.log('allprod',allprod)
            setAllproducts(allprod)

        }
        setprod()

        console.log('triggered')

    }, [pageNumber])

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }


    const handleIsactivemain = async (id, action) => {

        let response = ""
        if (action == "is_active") {
            response = await cardapi.isactive(id)
            const updatedproductsactive = allproducts.filter((val, key) => {
                return [...allproducts, +val.id == +id ? val.is_active = !val.is_active : null]
            })
            setAllproducts(updatedproductsactive);
        } else if (action == "in_stock") {
            response = await cardapi.instock(id)
            const updatedproductstock = allproducts.filter((val, key) => {
                return [...allproducts, +val.id == +id ? val.in_stock = !val.in_stock : null]
            })
            setAllproducts(updatedproductstock);
        }

        if (+response.status === 200) {

            setProductmessage("Successfully Changed")
            setOpen(true);
            setAlertseverity('success')
        } else if (+response.status === 400) {
            setProductmessage("Successfully Changed")
            setOpen(true);
            setAlertseverity('error')
        }
        else {

            setProductmessage("Something is went wrong")
            setOpen(true);
            setAlertseverity('error')
        }

    };

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


    const deleteProduct = async(id) => {

        const response = await apirequest.deleteproduct(id)

        if (+response.status === 200) {
            const updatedproducts = allproducts.filter((val, key) => {
                return [...allproducts, +val.id != +id]
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

    const editProduct = async (id) => {
        // const response = await apirequest.editCreatorproduct(id);
        props.history.push('/admin/contentedit/'+id)
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
                {allproducts.map((val, index) => {
                    return <Grid item md={4} sm={12} xs={12} lg={4} key={index}><ContentExplorecard editProduct={editProduct} deleteProduct={deleteProduct} val={val} likefun={addlikes} interestfun={addfavorites}
                       profilerestrict={profileresponse}
                    /></Grid>
                })}
            </Grid>
            <Box display="flex" justifyContent="center" alignItems="center" mt={5} mb={5}>
                <Pagination onChange={handlePagechange} count={10} color="primary" />
            </Box>

        </>


    )
}

export default ContentExploreSeller
