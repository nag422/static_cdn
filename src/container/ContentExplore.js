import { Box, Grid } from '@material-ui/core'
import React,{useState,useEffect, useCallback} from 'react'
import ContentExplorecard from '../components/explorecard/ContentExplorecard'
import Pagination from '@material-ui/lab/Pagination';

import {getallproducts} from '../actions/'
import { useSelector, useDispatch } from 'react-redux';

const ContentExplore = () => {    
    const dispatch = useDispatch();
    const response = useSelector((state) => state.productSave);
    const [allproducts,setAllproducts] = useState([])    
    const [pageNumber, setPageNumber] = useState(1)

    useEffect(() => {
        dispatch(getallproducts({'pageNumber':pageNumber}))
        console.log('test 1',response.products)
    }, [pageNumber,dispatch])

    useEffect(() => {
        setAllproducts(response.products)
    }, [])
    

    return (
       <>
            <Grid container spacing={2}>
            {allproducts.map((val,index) => {
                return <Grid item md={4} sm={12} xs={12} lg={4} key={index}><ContentExplorecard val={val} /></Grid>
            })}
            </Grid>
            <Box display="flex" justifyContent="center" alignItems="center" mt={5} mb={5}>
                <Pagination count={10} color="primary" />
            </Box>
            
</>
           
        
    )
}

export default ContentExplore
