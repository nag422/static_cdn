import { Box, Grid } from '@material-ui/core'
import React from 'react'
import ContentExplorecard from '../components/explorecard/ContentExplorecard'
import Pagination from '@material-ui/lab/Pagination';
const ContentExplore = () => {


    return (
       <>
            <Grid container spacing={2}>
            {(new Array(20).fill(20)).map((val,index) => {
                return <Grid item md={4} sm={12} xs={12} lg={4} key={index}><ContentExplorecard /></Grid>
            })}
            </Grid>
            <Box display="flex" justifyContent="center" alignItems="center" mt={5} mb={5}>
                <Pagination count={10} color="primary" />
            </Box>
            
</>
           
        
    )
}

export default ContentExplore
