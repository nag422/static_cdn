import { Box, Button, Card, CircularProgress, FormControl, FormControlLabel, Grid, Input, makeStyles, MenuItem, Paper, TextField, Typography } from '@material-ui/core'
import React from 'react'
import CustomizedDate from '../components/ModelDialogue/CustomizedDate'
import CustomizedInputs from '../components/ModelDialogue/CustomizedInputs'
import CustomizedSelect from '../components/ModelDialogue/CustomizedSelect'
import SelectFieldCustom from '../components/SelectFieldCustom/SelectFieldCustom'
import FileUpload from '../components/button/FileUpload'
import * as Yup from "yup";
import { useSelector, useDispatch } from 'react-redux';
import FormikField from "../components/formikcontrol/FormikField";
import Fileuploadbutton from '../components/button/Fileuploadbutton'
import BackupIcon from '@material-ui/icons/Backup';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import { AlertTitle } from '@material-ui/lab';
import { addProductwithApiRequest, saverequestProductwithApiRequest,editProductsave } from './api/productapi.js';
import { getProductById } from 'sagas/api/api';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));
const ContentEdit = (props) => {
    // const [fields, setFields] = React.useState([{ label: 'Cost' }])
    // const [selectFields] = React.useState([{ label: 'SuperAdmin', value: 'superuser' }, { label: 'Admin', value: 'Author' }, { label: 'User', value: 'user' }])
    // const selectcategoryFields = [{ label: 'Creator', value: 'creator' }, { label: 'Producer', value: 'Producer' }, { label: 'Hybrid', value: 'hybrid' }, { label: 'None of the above', value: 'none' }]
    // const [requestfields, setRequestfields] = React.useState([{ label: 'Title' }, { label: 'Description' }, { label: 'Thumbnail' }, { label: 'Video File' }, { label: 'Rights Details' }, { label: 'Cast and Crew' }, { label: 'Cost of the project' }, { label: 'Date of Creation' }, { label: 'Cost' }])
    // const [issubmitting, setIssubmitting] = React.useState(false);
    const classes = useStyles();    
    const [open, setOpen] = React.useState(false)
    const [alertseverity, setAlertseverity] = React.useState('success')
    const [productmessage, setProductmessage] = React.useState('')

    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [selectedCategory, setSelectedCategory] = React.useState('');

    const [authortype, setAuthortype] = React.useState('creator')
    const [isbackdrop, setIsbackdrop] = React.useState(false);
    const [post, setPost] = React.useState({
        author_id: 0,
        castncrew: "",
        created: "",
        customauthor: "",
        description: "",
        id: 0,
        in_stock: true,
        is_active: true,
        isfavored: false,
        isliked: false,
        price: 0,
        rights: "",
        slug: "",
        thumbnail: "",
        thumbnail1: "",
        thumbnail2: "",
        thumbnail3: "",
        title: "",
        videofile: "",
        runtime: 0,
        numbofvideos: 0,
        language: '',
        genre: '',
        keywords: '',
        country: '',
        rightsregion: '',
        termsconditions: '',
    })

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }



    const dispatch = useDispatch();
    const response = useSelector((state) => state.productSave);
    const userresponse = useSelector((state) => state.profileops.profile);



 

    React.useEffect(() => {
        const getsingleproduct = async () => {
            const data = await getProductById(props.match.params.id)
        
            if(data.obs.length > 0){
                setPost({

                    ...post,
                    id: data.obs[0].id,
                    thumbnail: data.obs[0].thumbnail,
                    thumbnail1: data.obs[0].thumbnail1,
                    thumbnail2:data.obs[0].thumbnail2,
                    thumbnail3: data.obs[0].thumbnail3,
                    title: data.obs[0].title,
                    description:data.obs[0].description,
                    videofile: data.obs[0].videofile,
                    rights:data.obs[0].rights,
                    category:data.obs[0].category,
                    castncrew:data.obs[0].castncrew,
                    price:data.obs[0].price,
                    runtime:data.obs[0].runtime,
                    numbofvideos: data.obs[0].numbofvideos,
                    language: data.obs[0].language,
                    genre: data.obs[0].genre,
                    keywords: data.obs[0].keywords,
                    country: data.obs[0].country,
                    rightsregion: data.obs[0].rightsregion,
                    termsconditions: data.obs[0].termsconditions,

                    

                })
            }

        }
        getsingleproduct()
        console.log(post)

        
    }, [])

    

    





    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log(date)
    };

    // SnackBar

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handlecategoryChange = (e) => {
        setSelectedCategory(e.target.value)

    }


    const handlefileChange = (e) => {
        setPost({
            ...post,
            [e.target.id]: e.target.files[0]
        })
       

    }

 
    const handleChnage = (e) => {
        setPost({
            ...post,
            [e.target.name]:e.target.value})

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(post)
        const resp =  await editProductsave(post)
        setIsbackdrop(true)
        if(resp == 200){
            setIsbackdrop(false)
            setProductmessage("Successfully Updated")
            setOpen(true);
            setAlertseverity('success')
        }else{
            setIsbackdrop(false)
            setProductmessage("Something is went wrong")
            setOpen(true);
            setAlertseverity('error')
            
        }
        
        
        
        
    }



    const vertical = "top"
    const horizontal = "right"

    return (
        <div>
            <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertseverity}>
                    {productmessage}
                </Alert>
            </Snackbar>
            <Backdrop className={classes.backdrop} open={isbackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>

            {userresponse.content == "creator" && !userresponse.user_ptr.is_superuser ?
                <Grid container spacing={1}>

                    


                    <Grid item md={8} sm={12} xs={12}>
                        <Card>
                            {/* <Box p={1}>
                                <Typography>
                                    Submit Content (Seller)
                   </Typography>
                            </Box> */}
                            <Box p={2}>
                                
                                            <form onSubmit={handleSubmit}>
                                                <Grid item md={12} sm={12} lg={12}>
                                                    <TextField
                                                        value= {post.title}
                                                        name="title"
                                                        onChange={handleChnage}
                                                        label="Title"
                                                        type="text"
                                                        required
                                                        variant="outlined"
                                                        fullWidth
                                                        style={{marginBottom:15}}
                                                        InputLabelProps = {{shrink:true}}
                                                    /><br></br>
                                                    <TextField
                                                        value= {post.description}
                                                        name="description"
                                                        onChange={handleChnage}
                                                        label="Description"
                                                        type="text"
                                                        required
                                                        variant="outlined"
                                                        fullWidth
                                                        style={{marginBottom:15}}
                                                        InputLabelProps = {{shrink:true}}
                                                        multiline={true}
                                                        rows="5"
                                                    /><br></br>
                                                    {/* <TextField
                                                        value= {post.rights}
                                                        name="rights"
                                                        onChange={handleChnage}
                                                        label="rights"
                                                        type="text"
                                                        required
                                                        variant="outlined"
                                                        style={{marginBottom:15}}
                                                        InputLabelProps = {{shrink:true}}
                                                        fullWidth

                                                    /> */}
                                                    <br></br>
                                                    {/* <TextField
                                                        value= {post.castncrew}
                                                        name="castncrew"
                                                        onChange={handleChnage}
                                                        label="castncrew"
                                                        type="text"
                                                        required
                                                        variant="outlined"
                                                        style={{marginBottom:15}}
                                                        InputLabelProps = {{shrink:true}}
                                                        fullWidth
                                                    /><br></br> */}
                                                    <TextField
                                                        value= {post.price}
                                                        name="price"
                                                        onChange={handleChnage}
                                                        label="Cost"
                                                        type="text"
                                                        required
                                                        variant="outlined"
                                                        style={{marginBottom:15}}
                                                        InputLabelProps = {{shrink:true}}
                                                        fullWidth
                                                    /><br></br>
                                                    <TextField
                                                        value= {post.runtime}
                                                        onChange={handleChnage}
                                                        name="runtime"
                                                        label="Runtime in (minuts)"
                                                        type="text"
                                                        variant="outlined"
                                                        fullWidth
                                                        style={{marginBottom:15}}
                                                        InputLabelProps = {{shrink:true}}
                                                    /><br></br>
                                                    <TextField
                                                        value= {post.numbofvideos}
                                                        onChange={handleChnage}
                                                        name="numbofvideos"
                                                        label="Number of Videos"
                                                        type="text"
                                                        variant="outlined"
                                                        fullWidth
                                                        style={{marginBottom:15}}
                                                        InputLabelProps = {{shrink:true}}
                                                    /><br></br>
                                                    <TextField
                                                        value= {post.language}
                                                        onChange={handleChnage}
                                                        name="language"
                                                        label="Language"
                                                        type="text"
                                                        variant="outlined"
                                                        fullWidth
                                                        style={{marginBottom:15}}
                                                        InputLabelProps = {{shrink:true}}
                                                    /><br></br>
                                                    <TextField
                                                        value= {post.genre}
                                                        onChange={handleChnage}
                                                        name="genre"
                                                        label="Genre"
                                                        type="text"
                                                        variant="outlined"
                                                        fullWidth
                                                        style={{marginBottom:15}}
                                                        InputLabelProps = {{shrink:true}}
                                                    /><br></br>
                                                    <TextField
                                                        value= {post.keywords}
                                                        onChange={handleChnage}
                                                        name="keywords"
                                                        label="Keywords"
                                                        type="text"
                                                        variant="outlined"
                                                        fullWidth
                                                        style={{marginBottom:15}}
                                                        InputLabelProps = {{shrink:true}}
                                                    /><br></br>
                                                    <TextField
                                                        value= {post.country}
                                                        onChange={handleChnage}
                                                        name="country"
                                                        label="Country"
                                                        type="text"
                                                        variant="outlined"
                                                        fullWidth
                                                        style={{marginBottom:15}}
                                                        InputLabelProps = {{shrink:true}}
                                                    /><br></br>
                                                    <TextField
                                                        value= {post.rightsregion}
                                                        onChange={handleChnage}
                                                        name="rightsregion"
                                                        label="Rights Region"
                                                        type="text"
                                                        variant="outlined"
                                                        fullWidth
                                                        style={{marginBottom:15}}
                                                        InputLabelProps = {{shrink:true}}
                                                    /><br></br>
                                                    <TextField
                                                        value= {post.termsconditions}
                                                        onChange={handleChnage}
                                                        name="termsconditions"
                                                        label="Terms and Conditions"
                                                        type="text"
                                                        variant="outlined"
                                                        fullWidth
                                                        multiline={true}
                                                        rows={6}
                                                        style={{marginBottom:15}}
                                                        InputLabelProps = {{shrink:true}}

                                                    /><br></br>
                                                    {/* <Input type="file" id="thumbnail" name="thumbnail" onChange={handlefileChange}></Input>
                                                 <Input type="file" id="video" name="video" onChange={handlefileChange}></Input> */}

                                                    <img src={`https://app.contentbond.com/media/${post.thumbnail}`} 
                                                    alt="tumbnail title"
                                                    width="320"
                                                    height="160"                                                    
                                                    />
                                                    <div>
                                                        <input
                                                            accept="image/*"
                                                            style={{ display: 'none' }}
                                                            id="thumbnail"
                                                            name="thumbnail"
                                                            type="file"
                                                            onChange={handlefileChange}
                                                        />
                                                        <label htmlFor="thumbnail">
                                                            <Button variant="contained" color="primary" component="span">
                                                                Change Thumbnail &nbsp;<BackupIcon />
                                                            </Button>
                                                        </label>
                                                        {JSON.stringify(post.thumbnail.name)}
                                                    </div>

                                                    <br></br>
                                                    {/* <img src={`https://app.contentbond.com/media/${post.videofile}`} 
                                                    alt="tumbnail title"
                                                    width="320"
                                                    height="160"                                                    
                                                    />
                                                    <div>
                                                        <Input
                                                            accept="video/*"
                                                            style={{ display: 'none' }}
                                                            id="videofile"
                                                            name="videofile"
                                                            type="file"
                                                            onChange={handlefileChange}
                                                        />
                                                        <label htmlFor="videofile">
                                                            <Button variant="contained" color="primary" component="span">
                                                                Change Video &nbsp;<BackupIcon />
                                                            </Button>
                                                        </label>
                                                        {JSON.stringify(post.videofile.name)}
                                                    </div>
                                                    <br></br> */}
                                                    <img src={`https://app.contentbond.com/media/${post.thumbnail1}`} 
                                                    alt="tumbnail title"
                                                    width="320"
                                                    height="160"                                                    
                                                    />
                                                    <div>
                                                        <input
                                                            accept="image/*"
                                                            style={{ display: 'none' }}
                                                            id="thumbnail1"
                                                            name="thumbnail1"
                                                            type="file"
                                                            onChange={handlefileChange}
                                                        />
                                                        <label htmlFor="thumbnail1">
                                                            <Button variant="contained" color="primary" component="span">
                                                                Change Banner1 &nbsp;<BackupIcon />
                                                            </Button>
                                                        </label>
                                                        {JSON.stringify(post.thumbnail1.name)}
                                                    </div>

                                                    <br></br>

                                                    <img src={`https://app.contentbond.com/media/${post.thumbnail2}`} 
                                                    alt="tumbnail title"
                                                    width="320"
                                                    height="160"                                                    
                                                    />

                                                    <div>
                                                        <input
                                                            accept="image/*"
                                                            style={{ display: 'none' }}
                                                            id="thumbnail2"
                                                            name="thumbnail2"
                                                            type="file"
                                                            onChange={handlefileChange}
                                                        />
                                                        <label htmlFor="thumbnail2">
                                                            <Button variant="contained" color="primary" component="span">
                                                                Change Banner2 &nbsp;<BackupIcon />
                                                            </Button>
                                                        </label>
                                                        {JSON.stringify(post.thumbnail2.name)}
                                                    </div>

                                                    <br></br>
                                                    <img src={`https://app.contentbond.com/media/${post.thumbnail3}`} 
                                                    alt="tumbnail title"
                                                    width="320"
                                                    height="160"                                                    
                                                    />
                                                    <div>
                                                        <input
                                                            accept="image/*"
                                                            style={{ display: 'none' }}
                                                            id="thumbnail3"
                                                            name="thumbnail3"
                                                            type="file"                                                            
                                                            onChange={handlefileChange}
                                                        />
                                                        <label htmlFor="thumbnail3">
                                                            <Button variant="contained" color="primary" component="span">
                                                                Change Banner3 &nbsp;<BackupIcon />
                                                            </Button>
                                                        </label>
                                                        {JSON.stringify(post.thumbnail3.name)}
                                                    </div>

                                                    <br></br>
                                                    <Box style={{ marginLeft: '-1%' }}>
                                                        <CustomizedSelect
                                                            value={post.category}
                                                            fieldname={'Type'}
                                                            label="category"
                                                            handlecategoryChange={handlecategoryChange}
                                                            selectedCategory={post.category}
                                                        />
                                                    </Box>

                                                    {/* <CustomizedDate
                                                label="createdat"
                                                handleDateChange={handleDateChange}
                                                selectedDate={selectedDate}
                                            /> */}

                                                <Box style={{ maTextFieldrginTop: '30px' }}>



                                                <TextField id="select" name="rights" label="Rights" value={post.rights} onChange={handleChnage} select variant="outlined">
                                                    <MenuItem value="exclusive">Exclusive</MenuItem>
                                                    <MenuItem value="nonexclusive">Non-Exclusive</MenuItem>
                                                </TextField>

                                                </Box>

                                                    <Box pl={1} pt={2}>
                                                        <Button type="submit" color="primary" variant="contained"
                                                            
                                                        >Submit</Button>
                                                    </Box>


                                                </Grid>
                                            </form>
                                       
                            </Box>
                        </Card>
                    </Grid>


                </Grid>

                : null}

            <br></br>

        </div>
    )
}

export default ContentEdit
