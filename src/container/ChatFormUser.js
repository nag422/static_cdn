import { Box, Button, Card, CardContent, Grid, TextareaAutosize, TextField } from '@material-ui/core'
import React from 'react'
import {postchatmessages} from '../container/api/message'
const ChatFormUser = () => {
    const [messagetext, setMessagetext] = React.useState('');
    const handleSubmit = async (e) => {
        e.preventDefault()
        alert(messagetext)
  

        const msgresp = await postchatmessages ({category:'creator',msg:messagetext})
        console.log(msgresp.message)
        alert('Message Submitted')
    }
    return (
        <div style={{display:'flex'}}>
        <Grid container>
            <Grid item md={12} lg={12} sm={12}>
            <Card>
<CardContent>
                <form noValidate autoComplete="off" onSubmit={handleSubmit} fullwidth>
                    <Box display="flex">
                    <TextField fullWidth aria-label="minimum height" multiline={true} placeholder="Insert Message" variant="outlined" rows={5} cols={10}
                        onChange={(e) => setMessagetext(e.target.value)} /><br></br>
                        </Box>
                        <Box display="flex" mt={2}>
                    <Button type="submit" color="primary" variant="contained">Submit</Button>
                    </Box>
                </form>
                </CardContent>

            </Card>
            </Grid>
        </Grid>
        </div>
    )
}

export default ChatFormUser
