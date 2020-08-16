import React from 'react';
import {connect} from 'react-redux';
import {register} from '../../actions/auth-actions';
import history from '../../history';
import AuthForm from './AuthForm'

class UserRegister extends React.Component{

  onSubmit = formValues => {
    this.props.register(formValues).then(() => {
     // toast.success("Registration successful")
     history.push("/")
   })
   .catch(error => {
     // toast.error("Registration failed")
      console.error(error)
   });
   };

  render(){
    return(
    <AuthForm onSubmit={this.onSubmit} buttonLable="Sigup"/>
    )
  }
}

export default connect(null,{register})(UserRegister);