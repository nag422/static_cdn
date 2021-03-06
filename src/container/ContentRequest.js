import { Box, Button, Card, FormControl, FormControlLabel, Grid, Input, Paper, Typography } from '@material-ui/core'
import React from 'react'
import CustomizedDate from '../components/ModelDialogue/CustomizedDate'
import CustomizedInputs from '../components/ModelDialogue/CustomizedInputs'
import CustomizedSelect from '../components/ModelDialogue/CustomizedSelect'
import SelectFieldCustom from '../components/SelectFieldCustom/SelectFieldCustom'
import FileUpload from '../components/button/FileUpload'
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from 'react-redux';
import FormikField from "../components/formikcontrol/FormikField";
import { saveProduct, requestProduct } from '../actions'
import Fileuploadbutton from '../components/button/Fileuploadbutton'
import BackupIcon from '@material-ui/icons/Backup';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const creatorSchema = Yup.object().shape({
    title: Yup.string()
        .required("Title is should not be empty"),
    description: Yup.string()
        .required("Description is should not be empty"),
    rights: Yup.string()
        .required("Rights is should not be empty"),
    castncrew: Yup.string()
        .required("CastnCrew is should not be empty"),
    price: Yup.number()
        .required("Price is should not be empty"),
    // createdat:Yup.date().required("Date Should not be empty"),
    // thumbnail:Yup.mixed()
    // .required("Thumbnail is should not be empty"),
    // video:Yup.mixed()
    // .required("Videofile is should not be empty"),

    // .matches(
    //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    //   )
});

const creatorequestschema = Yup.object().shape({
    title: Yup.string()
        .required("Title is should not be empty")
})

const initialValues = {
    title: "",
    description: "",
    rights: "",
    castncrew: "",
    price: 0
};
const initialcreatorValues = {
    title: ""

};
const ContentRequest = (props) => {
    // const [fields, setFields] = React.useState([{ label: 'Cost' }])
    // const [selectFields] = React.useState([{ label: 'SuperAdmin', value: 'superuser' }, { label: 'Admin', value: 'Author' }, { label: 'User', value: 'user' }])
    // const selectcategoryFields = [{ label: 'Creator', value: 'creator' }, { label: 'Producer', value: 'Producer' }, { label: 'Hybrid', value: 'hybrid' }, { label: 'None of the above', value: 'none' }]
    // const [requestfields, setRequestfields] = React.useState([{ label: 'Title' }, { label: 'Description' }, { label: 'Thumbnail' }, { label: 'Video File' }, { label: 'Rights Details' }, { label: 'Cast and Crew' }, { label: 'Cost of the project' }, { label: 'Date of Creation' }, { label: 'Cost' }])
    // const [issubmitting, setIssubmitting] = React.useState(false);

    const [open, setOpen] = React.useState(false)
    const [alertseverity, setAlertseverity] = React.useState('success')
    const [productmessage, setProductmessage] = React.useState('')

    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [selectedCategory, setSelectedCategory] = React.useState('');

    const [authortype, setAuthortype] = React.useState('creator')
    const [selectedfile, setSelectedfile] = React.useState({
        thumbnail: '',
        thumbnail1: '',
        thumbnail2: '',
        thumbnail3: '',
        video: ''
    });

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }


    const dispatch = useDispatch();
    const response = useSelector((state) => state.productSave);

    const onCreatorrequestSave = async (values) => {
        const history = props.history

        const finvalues = {
            ...values,
            author_type: 'producer',
            category: selectedCategory

        }

        return await dispatch(
            requestProduct(
                finvalues,
                history
            )
        );

    };

    const onCreatorrequestProducerSave = async (values) => {
        
        const history = props.history

        const finvalues = {
            ...values,
            author_type: 'producer',
            category: selectedCategory

        }

        return dispatch(
            requestProduct(
                finvalues,
                history
            )
        );

    };

    const onProductSave = async (values) => {

        const history = props.history
        console.log(values)
        const finvalues = {
            ...values, video: selectedfile.video,
            thumbnail: selectedfile.thumbnail,
            category: selectedCategory,
            createdat: selectedDate
        }

        return await dispatch(
            saveProduct(
                finvalues,
                history
            )
        );



    };


   

    React.useEffect(() => {
        if (response.isproductsaved) {
            
            setProductmessage("Successfully Changed")
            setOpen(true);
            setAlertseverity('success')
        } else if (response.isproductsaved != null && !response.isproductsaved) {
            
            setProductmessage("Something is went wrong")
            setOpen(true);
            setAlertseverity('success')
        }

        return () => {

        }

    }, [response.isproductsaved])

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
        setSelectedfile({
            ...selectedfile,
            [e.target.id]: e.target.files[0]
        })
        console.log(e.target.files[0])

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
            {authortype == "creator" ?
                <Grid container spacing={1}>

                    <Grid item md={6} sm={12} xs={12}>
                        <Card>
                            <Box p={1}>
                                <Typography>
                                    Requirements (Creator)
                   </Typography>
                            </Box>
                            <Box p={2}>
                                <Formik
                                    initialValues={initialcreatorValues}
                                    onSubmit={onCreatorrequestSave}
                                    validationSchema={creatorequestschema}
                                >
                                    {({ dirty, isValid }) => {
                                        return (
                                            <Form>
                                                <FormikField
                                                    name="title"
                                                    label="title"
                                                    type="text"
                                                    required
                                                    textvariant="outlined"
                                                />
                                                <Box style={{marginLeft:'-1%'}}>
                                                <CustomizedSelect
                                                    fieldname={'Type'}
                                                    label="category"
                                                    handlecategoryChange={handlecategoryChange}
                                                    selectedCategory={selectedCategory}
                                                />
                                                </Box>
                                                <Box pl={1} pt={2}>
                                                    <Button
                                                        disabled={!dirty || !isValid}
                                                        type="submit" color="primary" variant="contained">Submit</Button>
                                                </Box>

                                            </Form>
                                        );
                                    }}
                                </Formik>
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
                                <Formik
                                    initialValues={initialValues}
                                    onSubmit={onProductSave}
                                    validationSchema={creatorSchema}
                                >
                                    {({ dirty, isValid }) => {
                                        return (
                                            
                                            <Form>
                                                <Grid item md={12} sm={12} lg={12} spacing={2}>
                                                <FormikField
                                                    name="title"
                                                    label="title"
                                                    type="text"
                                                    required
                                                    textvariant="outlined"
                                                /><br></br>
                                                <FormikField
                                                    name="description"
                                                    label="description"
                                                    type="text"
                                                    required
                                                    textvariant="outlined"
                                                /><br></br>
                                                <FormikField
                                                    name="rights"
                                                    label="rights"
                                                    type="text"
                                                    required
                                                    textvariant="outlined"
                                                    style={{ backgroundColor: "#fff" }}


                                                /><br></br>
                                                <FormikField
                                                    name="castncrew"
                                                    label="castncrew"
                                                    type="text"
                                                    required
                                                    textvariant="outlined"
                                                /><br></br>
                                                <FormikField
                                                    name="price"
                                                    label="price"
                                                    type="text"
                                                    required
                                                    textvariant="outlined"
                                                /><br></br>
                                                {/* <Input type="file" id="thumbnail" name="thumbnail" onChange={handlefileChange}></Input>
                                                 <Input type="file" id="video" name="video" onChange={handlefileChange}></Input> */}


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
                                                            Upload Thumbnail &nbsp;<BackupIcon />
                                                        </Button>
                                                    </label>
                                                    {JSON.stringify(selectedfile.thumbnail.name)}
                                                </div>

                                                <br></br>
                                                <div>
                                                    <Input
                                                        accept="video/*"
                                                        style={{ display: 'none' }}
                                                        id="video"
                                                        name="video"
                                                        type="file"
                                                        onChange={handlefileChange}
                                                    />
                                                    <label htmlFor="video">
                                                        <Button variant="contained" color="primary" component="span">
                                                            Upload Video &nbsp;<BackupIcon />
                                                        </Button>
                                                    </label>
                                                    {JSON.stringify(selectedfile.video.name)}
                                                </div>
<br></br>
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
                                                            Upload Banner1 &nbsp;<BackupIcon />
                                                        </Button>
                                                    </label>
                                                    {JSON.stringify(selectedfile.thumbnail1.name)}
                                                </div>

                                                <br></br>

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
                                                        Upload Banner2 &nbsp;<BackupIcon />
                                                        </Button>
                                                    </label>
                                                    {JSON.stringify(selectedfile.thumbnail2.name)}
                                                </div>

                                                <br></br>
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
                                                        Upload Banner3 &nbsp;<BackupIcon />
                                                        </Button>
                                                    </label>
                                                    {JSON.stringify(selectedfile.thumbnail3.name)}
                                                </div>

                                                <br></br>
                                                 <Box style={{marginLeft:'-1%'}}>
                                                <CustomizedSelect
                                                    fieldname={'Type'}
                                                    label="category"
                                                    handlecategoryChange={handlecategoryChange}
                                                    selectedCategory={selectedCategory}
                                                />
                                                </Box>

                                                {/* <CustomizedDate
                                                label="createdat"
                                                handleDateChange={handleDateChange}
                                                selectedDate={selectedDate}
                                            /> */}

                                                <Box pl={1} pt={2}>
                                                    <Button type="submit" color="primary" variant="contained"
                                                        disabled={!dirty || !isValid}
                                                    >Submit</Button>
                                                </Box>


                                                </Grid>
                                            </Form>
                                        );
                                    }}
                                </Formik>
                            </Box>
                        </Card>
                    </Grid>


                </Grid>

                :
                <Grid container spacing={1}>

                    <Grid item md={6} sm={12} xs={12}>
                        <Card>
                            <Box p={1}>
                                <Typography>
                                    Requirements (Producer)
                   </Typography>
                            </Box>
                            <Box p={2}>
                                <Formik
                                    initialValues={initialcreatorValues}
                                    onSubmit={onCreatorrequestProducerSave}
                                    validationSchema={creatorequestschema}
                                >
                                    {({ dirty, isValid }) => {
                                        return (
                                            <Form>
                                                <FormikField
                                                    name="title"
                                                    label="title"
                                                    type="text"
                                                    required
                                                    textvariant="outlined"
                                                />
                                                <CustomizedSelect
                                                    fieldname={'Type'}
                                                    label="category"
                                                    handlecategoryChange={handlecategoryChange}
                                                    selectedCategory={selectedCategory}
                                                />
                                                <Box pl={1} pt={2}>
                                                    <Button
                                                        disabled={!dirty || !isValid}
                                                        type="submit" color="primary" variant="contained">Submit</Button>
                                                </Box>

                                            </Form>
                                        );
                                    }}
                                </Formik>
                            </Box>
                        </Card>
                    </Grid>


                </Grid>


            }

            <br></br>

        </div>
    )
}

export default ContentRequest
