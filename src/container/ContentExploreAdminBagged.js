import { Box, Grid } from '@material-ui/core'
import React,{useState,useEffect, useCallback} from 'react'
import ContentExplorecard from '../components/explorecard/ContentExplorecard'
import Pagination from '@material-ui/lab/Pagination';

import * as apirequest from './api/api';

// import { useSelector } from 'react-redux';


const ContentExploreAdminBagged = () => {    
    
    // const response = useSelector((state) => state.productSave);
    const [allproducts,setAllproducts] = useState([])    
    const [pageNumber, setPageNumber] = useState(1)

    useEffect(() => {
        const setprod = async() =>{

            const allprod = await apirequest.getallbaggedproducts({'pageNumber':pageNumber})
            
            setAllproducts(allprod)

        }
        setprod()
        

        
    }, [pageNumber])


    // useEffect(() => {
    //     setAllproducts(response.products)
    // }, [])
    

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

export default ContentExploreAdminBagged
