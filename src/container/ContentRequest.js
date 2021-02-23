import { Box, Button, Card, FormControl, FormControlLabel, Grid, Paper, Typography } from '@material-ui/core'
import React from 'react'
import CustomizedDate from '../components/ModelDialogue/CustomizedDate'
import CustomizedInputs from '../components/ModelDialogue/CustomizedInputs'
import CustomizedSelect from '../components/ModelDialogue/CustomizedSelect'
const ContentRequest = (props) => {
    const [fields, setFields] = React.useState([{ label:'Cost'} ])
    const [requestfields,setRequestfields] = React.useState([{ label:'Title'},{label:'Description'},{label:'Thumbnail'},{label:'Video File'},{label:'Rights Details'},{label:'Cast and Crew'},{label:'Cost of the project'},{label:'Date of Creation'},{label:'Cost'}])
 
    
    return (
        <div>
            <Grid container spacing={1}>
                <Grid item md={6} sm={12} xs={12}>
                    <Card>
                        <Box p={1}>
                            <Typography>
                                Requirements (producer)
                   </Typography>
                        </Box>
                        <Box p={2}>
                            <form style={{alignItems:'center',justifyContent:"center"}}>
                                
                                <CustomizedInputs fields={fields} />
                                <CustomizedSelect fieldname={'Type'} />
                                <CustomizedDate label= "Deadline Date to Submit" />
                                <Box pl={1} pt={2}>
                                <Button color="primary" variant="contained">Submit</Button>
                                </Box>
                               
                                

                            </form>
                        </Box>
                    </Card>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    <Card>
                        <Box p={1}>
                            <Typography>
                                Requirements (Creator)
                   </Typography>
                        </Box>
                        <Box p={2}>
                            <form style={{alignItems:'center',justifyContent:"center"}}>
                                
                                <CustomizedInputs fields={fields} />
                                <CustomizedSelect fieldname={'Type'} />
                                <CustomizedDate label= "Deadline Date to Submit" />
                                <Box pl={1} pt={2}>
                                <Button color="primary" variant="contained">Submit</Button>
                                </Box>
                               
                                

                            </form>
                        </Box>
                    </Card>
                </Grid>

                <Grid item md={6} sm={12} xs={12}>
                    <Card>
                        <Box p={1}>
                            <Typography>
                                Submit Content (producer)
                   </Typography>
                        </Box>
                        <Box p={2}>
                            <form style={{alignItems:'center',justifyContent:"center"}}>
                                
                                <CustomizedInputs fields={fields} />
                                <CustomizedSelect fieldname={'Type'} />
                                <CustomizedDate label= "Deadline Date to Submit" />
                                <Box pl={1} pt={2}>
                                <Button color="primary" variant="contained">Submit</Button>
                                </Box>
                               
                                

                            </form>
                        </Box>
                    </Card>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    <Card>
                        <Box p={1}>
                            <Typography>
                                Submit Content (Creator)
                   </Typography>
                        </Box>
                        <Box p={2}>
                            <form style={{alignItems:'center',justifyContent:"center"}}>
                                
                                <CustomizedInputs fields={requestfields} />
                                <CustomizedSelect fieldname={'Type'} />
                                <CustomizedDate label= "Deadline Date to Submit" />
                                <Box pl={1} pt={2}>
                                <Button color="primary" variant="contained">Submit</Button>
                                </Box>
                               
                                

                            </form>
                        </Box>
                    </Card>
                </Grid>
                

            </Grid>



                

            

           
            <br></br>

        </div>
    )
}

export default ContentRequest
