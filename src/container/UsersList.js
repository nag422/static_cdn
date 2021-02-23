import { Box, Button, Card, Grid, Typography } from '@material-ui/core'
import React from 'react'
import CustomizedInputs from '../components/ModelDialogue/CustomizedInputs'
import SelectFieldCustom from '../components/SelectFieldCustom/SelectFieldCustom'
import ModelDialogue from '../components/ModelDialogue/ModelDialogue'
import { Formik, Form } from "formik";
import * as Yup from "yup";

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
            <Grid container>
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
                                                <SelectFieldCustom fieldname={'Type'} header={'Users'} itemslist={selectFields} />

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
                    grid2
                </Grid>

            </Grid>
        </div>
    )
}

export default UsersList
