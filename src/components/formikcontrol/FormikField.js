import React from 'react'
import { ErrorMessage, Field } from "formik";
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types';

const FormikField = ({ name="somename", label="somelable", type = "text", required = false, textvariant=false, ...props}) => {
    return (
        <div className="FormikField">
            <Field
                variant={textvariant ? textvariant:null}
                required={required}
                autoComplete="off"
                as={TextField}
                label={label}
                name={name}
                fullWidth
                type={type}
                helperText={<ErrorMessage name={name} style={{color:'red'}} />}
                {...props}
            />         
        </div>
    )
}

// FormikField.propTypes =  {
//     name: PropTypes.string,
//     label: PropTypes.string,
//     type: PropTypes.string,
//     required: PropTypes.bool,
//   }
export default FormikField;
