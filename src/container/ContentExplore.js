import { Box, Grid } from '@material-ui/core'
import React,{useState,useEffect, useCallback} from 'react'
import ContentExplorecard from '../components/explorecard/ContentExplorecard'
import Pagination from '@material-ui/lab/Pagination';

import { useSelector } from 'react-redux';
import * as apirequest from './api/api';


const ContentExplore = () => {    
    
    const response = useSelector((state) => state.productSave);
    const [allproducts,setAllproducts] = useState([])    
    const [pageNumber, setPageNumber] = useState(1)

    useEffect(() => {
        const setprod = async() =>{

            const allprod = await apirequest.getallproducts({'pageNumber':pageNumber})
            
            setAllproducts(allprod)

        }
        setprod()
        

        
    }, [pageNumber])

    // useEffect(() => {
    //     setAllproducts(response.products)
    // }, [])
    
    const handlePagechange = (event,number) => {
            alert(number)
    }


    const addlikes = async(e,id) => {
        const response = await apirequest.addlike(id)
        if (+response.status === 200){
            const updatedproducts = allproducts.filter((val,key) =>{
                return [...allproducts, +val.id == +id ? val.isliked= !val.isliked:null]
            })
            setAllproducts(updatedproducts);
            alert(response.message)

        }else{
            alert('something is went wrong')
        }
        
    }
    const addfavorites = async(e,id) => {
        const response = await apirequest.addinterest(id)

        if (+response.status === 200){
            const updatedproducts = allproducts.filter((val,key) =>{
                return [...allproducts, +val.id == +id ? val.isfavored= !val.isfavored:null]
            })
            setAllproducts(updatedproducts);
            alert(response.message)

        }else{
            alert('something is went wrong')
        }
        
        
    }

    return (
       <>
            <Grid container spacing={2}>
            {allproducts.map((val,index) => {
                return <Grid item md={4} sm={12} xs={12} lg={4} key={index}><ContentExplorecard val={val} likefun = {addlikes} interestfun = {addfavorites} /></Grid>
            })}
            </Grid>
            <Box display="flex" justifyContent="center" alignItems="center" mt={5} mb={5}>
                <Pagination onChange={handlePagechange} count={10} color="primary" />
            </Box>
            
</>
           
        
    )
}

export default ContentExplore
