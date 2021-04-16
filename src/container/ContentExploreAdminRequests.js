import { Box, Grid } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import ContentExplorecard from '../components/explorecard/ContentExplorecardAdminRequests'
import Pagination from '@material-ui/lab/Pagination';

import * as apirequest from './api/api';
import * as cardapi from './api/cardactionsapi';

// import { useSelector } from 'react-redux';


const ContentExploreAdminRequests = () => {    
    
    // const response = useSelector((state) => state.productSave);
    const [allproducts,setAllproducts] = useState([])    
    const [pageNumber, setPageNumber] = useState(1)
    // const [alertseverity, setAlertseverity] = React.useState('success')
    // const [productmessage, setProductmessage] = React.useState('')
    // const [open, setOpen] = React.useState(false)

    useEffect(() => {
        const setprod = async() =>{

            const allprod = await apirequest.getalllikedproducts({ 'pageNumber': pageNumber })
            
            setAllproducts(allprod)

        }
        setprod()
        

        
    }, [pageNumber])


    // useEffect(() => {
    //     setAllproducts(response.products)
    // }, [])

    const addfavorites = async (e, id) => {
        const response = await apirequest.addinterest(id)

        if (+response.status === 200) {
            const updatedproducts = allproducts.filter((val, key) => {
                return [...allproducts, +val.id == +id ? val.isfavored = !val.isfavored : null]
            })
            setAllproducts(updatedproducts);
            alert(response.message)

        } else {
            alert('something is went wrong')
        }
    }

    return (
       <>
            <Grid container spacing={2}>
            {allproducts.map((val,index) => {
                return <Grid item md={4} sm={12} xs={12} lg={4} key={index}><ContentExplorecard val={val} interestfun={addfavorites} /></Grid>
            })}
            </Grid>
            <Box display="flex" justifyContent="center" alignItems="center" mt={5} mb={5}>
                <Pagination count={10} color="primary" />
            </Box>
            
</>
           
        
    )
}

export default ContentExploreAdminRequests
