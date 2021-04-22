import React from 'react'
import { connect, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

const Loginredirector = (props) => {
    const history = useHistory()   
  
    const profileresponse = useSelector(state => state.profileops.profileloading)
    
 
    React.useEffect(() => {
        setTimeout(() => {
            if(profileresponse == false){
                return history.push('/admin/profile')
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
