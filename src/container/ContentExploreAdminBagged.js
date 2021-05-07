import { Box, Grid } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import ContentExplorecard from '../components/explorecard/ContentExplorecardBagged'
import Pagination from '@material-ui/lab/Pagination';

import * as apirequest from './api/api';
import * as cardapi from './api/cardactionsapi';
import Productskeleton from '../components/skeletons/Productskeleton';

// import { useSelector } from 'react-redux';


const ContentExploreAdminBagged = () => {    
    
    // const response = useSelector((state) => state.productSave);
    const [allproducts,setAllproducts] = useState([])    
    const [pageNumber, setPageNumber] = useState(1)
    // const [alertseverity, setAlertseverity] = React.useState('success')
    // const [productmessage, setProductmessage] = React.useState('')
    // const [open, setOpen] = React.useState(false)

    const [loading, setLoading] = React.useState(false)
    const [totalrecords,setTotalrecords] = React.useState(0)

    useEffect(() => {
        const setprod = async() =>{
            setLoading(true)
            const allprod = await apirequest.getallbaggedproducts({'pageNumber':pageNumber})
            
            setAllproducts(allprod.obs)
            setTotalrecords(allprod.totalrecords)
            setLoading(false)

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

    const handlePagechange = (event, number) => {
        // alert(number)
        setPageNumber(number)
    }

    return (
       <>
       {loading && <Productskeleton />}
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

export default ContentExploreAdminBagged
