import { Box, Grid } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import ContentExplorecard from '../components/explorecard/ContentExplorecardFavorite'
import Pagination from '@material-ui/lab/Pagination';

import * as apirequest from './api/api';

// import { useSelector } from 'react-redux';
import Productskeleton from '../components/skeletons/Productskeleton'

const ContentExploreFavorite = () => {

    // const response = useSelector((state) => state.productSave);
    const [allproducts, setAllproducts] = useState([])
    const [pageNumber, setPageNumber] = useState(1)

    const [loading, setLoading] = React.useState(false)
    const [totalrecords,setTotalrecords] = React.useState(0)
    
    useEffect(() => {
        const setprod = async () => {
            setLoading(true)
            const allprod = await apirequest.getalllikedproducts({ 'pageNumber': pageNumber })

            setAllproducts(allprod.obs)
            setTotalrecords(allprod.totalrecords)
            setLoading(false)

        }
        setprod()



    }, [pageNumber])


    // useEffect(() => {
    //     setAllproducts(response.products)
    // }, [])

    const addlikes = async (e, id) => {
        const response = await apirequest.addlike(id)
        if (+response.status === 200) {
            const updatedproducts = allproducts.filter((val, key) => {
                return [...allproducts, +val.id == +id ? val.isliked = !val.isliked : null]
            })
            setAllproducts(updatedproducts);
            alert(response.message)

        } else {
            alert('something is went wrong')
        }

    }

    const handlePagechange = (event, number) => {
        // alert(number)
        setPageNumber(number)
    }


    return (
        <>
        {loading && <Productskeleton />}
            <Grid container spacing={2}>
                {allproducts.map((val, index) => {
                    return <Grid item md={4} sm={12} xs={12} lg={4} key={index}><ContentExplorecard val={val} likefun={addlikes} /></Grid>
                })}
            </Grid>
            <Box display="flex" justifyContent="center" alignItems="center" mt={5} mb={5}>
                <Pagination onChange={handlePagechange} count={Math.floor(totalrecords/8)} color="primary" />
            </Box>

        </>


    )
}

export default ContentExploreFavorite
