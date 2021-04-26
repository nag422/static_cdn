import React from 'react'
import { connect, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

const Loginredirector = (props) => {
    const history = useHistory()   
  
    const profileresponse = useSelector(state => state.profileops.profileloading)
    const profiler = useSelector(state => state.profileops)
    
 
    React.useEffect(() => {
        setTimeout(() => {
            if(profileresponse == false){
                
                if(profiler.content == "creator"){
                    return history.push('/admin/seller/dashboard')
                }
                else if(profiler.content == "producer"){
                    return history.push('/admin/buyer/dashboard')
                }else{
                    return history.push('/admin/dashboard')
                }
                
            }
            
        }, 3000);
        
    }, [history,profileresponse])

    return (
        <div>
            <h2>You are securely Loggingin...</h2>
        </div>
    )
}

export default Loginredirector
