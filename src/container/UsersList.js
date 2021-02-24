import { Box, Button, Card, Grid, Typography } from '@material-ui/core'
import React from 'react'
import CustomizedInputs from '../components/ModelDialogue/CustomizedInputs'
import SelectFieldCustom from '../components/SelectFieldCustom/SelectFieldCustom'
import ModelDialogue from '../components/ModelDialogue/ModelDialogue'
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TableMaterialuser from '../components/TableMaterial/TableMaterialuser'

const loginschema = Yup.object().shape({
    email: Yup.string()
        .min(2, "Too Short!")
        .required("Username or Email is should not be empty"),
    password: Yup.string()
        .min(8, "Too Short!")
        .required("Password is should not be empty"),
    // .matches(
    //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    //   )
});
const initialValues = {
    email: "",
    password: "",
};
const UsersList = () => {
    const [fields] = React.useState([{ label: 'Username' }, { label: 'Email' }])
    const [selectFields] = React.useState([{ label: 'SuperAdmin', value: 'superuser' }, { label: 'Admin', value: 'Author' }, { label: 'User', value: 'user' }])    
    const selectcategoryFields = [{ label: 'Creator', value: 'creator' }, { label: 'Producer', value: 'Producer' },{ label: 'Hybrid', value: 'hybrid' },{ label: 'None of the above', value: 'none' }]
    const [issubmitting, setIssubmitting] = React.useState(false);
    
    const handleSubmit = async (values) => {
        console.log(values);
        setIssubmitting(true);
        await setTimeout(() => {
            setIssubmitting(false);
        }, 2000);
    };

    return (
        <div>
            {/* <ModelDialogue /> */}
            <Grid container style={{marginBottom:'2%'}} spacing={2}>
                <Grid item md={6} xs={12} sm={12}>

                    <Card>
                        <Box p={1}>
                            <Typography>
                                Create User
                            </Typography>
                        </Box>

                        <Box p={2}>
                            

                                <Formik
                                    initialValues={initialValues}
                                    onSubmit={handleSubmit}
                                    validationSchema={loginschema}
                                >
                                    {({ dirty, isValid }) => {
                                        return (
                                            <Form>

                                                <CustomizedInputs fields={fields} />
                                                <SelectFieldCustom fieldname={'Type'} defaultval ="user" header={'Users'} itemslist={selectFields} />
                                                <SelectFieldCustom fieldname={'Category'} defaultval ="none" header={'Prod/Creator'} itemslist={selectcategoryFields} />

                                                <Box pl={1} pt={2}>
                                                    <Button color="primary" variant="contained">Create</Button>
                                                </Box>
                                                 
                                            </Form>
                                        );
                                    }}
                                </Formik>


                           
                        </Box>
                    </Card>
                </Grid>

                <Grid item md={6} xs={12} sm={12}>
                <Card  style={{height:'100%'}}>
                        <Box p={1}>
                            <Typography>
                                Create Notification
                            </Typography>
                        </Box>
                        </Card>

                
                </Grid>

            </Grid>
            <Grid container>
            <Grid item md={12} xs={12} sm={12}>
                <TableMaterialuser />
            </Grid>
            </Grid>
        </div>
    )
}

export default UsersList
