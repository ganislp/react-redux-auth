import React from 'react';
import { Field,reduxForm } from 'redux-form';
import {TextField,Button,Grid} from '@material-ui/core';



class AuthForm extends React.Component{

 

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
   this.props.onSubmit(formValues)
  };

  render(){
    return(
      <form    
      onSubmit={this.props.handleSubmit(this.onSubmit)} 
      style={{marginLeft:"5em",marginRight:"5em"}} >
      <Grid container >
        <Grid item container xs={12}>
        <Field
          name="email"
          component={this.renderTextField}
          label="Email"
          fullWidth
        />
        </Grid>
        <Grid item container>
          <Field
          name="password"
          component={this.renderTextField}
          type="password"
          label="Password"
          fullWidth
        />
        </Grid>
        
        <Grid item container justify="center">
        <Button variant="contained" color="primary"  type="submit">{this.props.buttonLable}</Button>
</Grid>
        </Grid>
      </form>
    )
  }
}
const validate = values => {
  const errors = {}
  const requiredFields = [
    'email',
    'password',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  return errors
};

const formWrapped=  reduxForm({
    form: 'authForm',
    validate
  })  (AuthForm);
  export default (formWrapped)