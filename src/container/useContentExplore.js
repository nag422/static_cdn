import React,{ useEffect, useState } from 'react'
import axios from 'axios';
import {getallproducts} from '../actions/'
import { useSelector, useDispatch } from 'react-redux';

export default function useContentExplore(pageNumber) {
    
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [articles, setArticles] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const dispatch = useDispatch();
    
   
    // const dispfun = React.useCallback(
    //     () => {
    //         dispatch(getallproducts({'pageNumber':pageNumber}))
    //         setArticles(response.obs)
    //     },
    //     [pageNumber],
    // )
    

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        

        // setLoading(true)
        // setError(false)

        dispatch(getallproducts({'pageNumber':pageNumber}))
        
        
     
    }, [])

    return { loading, error, articles, hasMore }
}

