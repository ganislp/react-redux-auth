import React from 'react';
import { Field,reduxForm } from 'redux-form';
import {TextField,Button,Grid} from '@material-ui/core';


class EmployeeForm extends React.Component {

//  validate = values => {
//     const errors = {}
//     const requiredFields = [
//       'heading',
//       'subHeading',
//       'body'
//     ]
//     requiredFields.forEach(field => {
//       if (!values[field]) {
//         errors[field] = 'Required'
//       }
//     })
  
//     return errors
//   }
  

  renderTextField({ label, input, meta: { touched, invalid, error }, ...custom }) {
    return (
      <TextField 
      label={label}
      placeholder={label}
      error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
      />
    )

  }

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
   
    return (
      <form    
      onSubmit={this.props.handleSubmit(this.onSubmit)} 
      style={{marginLeft:"5em",marginRight:"5em"}} >
      <Grid container >
        <Grid item container xs={12}>
        <Field
          name="heading"
          component={this.renderTextField}
          label="Header"
          fullWidth
        />
        </Grid>
        <Grid item container>
          <Field
          name="subHeading"
          component={this.renderTextField}
          label="SubHeader"
          fullWidth
        />
        </Grid>
        <Grid item container>
        <Field
          name="body"
          component={this.renderTextField}
          label="Body"
          multiline
          rowsMax="10"
          margin="normal"
          fullWidth
        />
        </Grid>
        <Grid item container justify="center">
        <Button variant="contained" color="primary"  type="submit">Submit</Button>
</Grid>
        </Grid>
      </form>
    )
  }

}
const validate = values => {
  const errors = {}
  const requiredFields = [
    'heading',
    'subHeading',
    'body'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  
  return errors
}
export default reduxForm({
  form: 'employeeForm', // a unique identifier for this form
  validate,
})(EmployeeForm);