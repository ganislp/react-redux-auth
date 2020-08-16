import React from 'react';
import {connect} from 'react-redux';
import {login} from '../../actions/auth-actions';
import history from '../../history';
import AuthForm from './AuthForm'

class Login extends React.Component{
  onSubmit = formValues => {
    this.props.login(formValues).then(() => {
      console.log("Login successful");
     history.push("/")
   })
   .catch(error => {
     // toast.error("Registration failed")
      console.error(error)
   });
   };

  render(){
    return(
    <AuthForm onSubmit={this.onSubmit}  buttonLable="Login"/>
    )
  }
}

export default connect(null,{login})(Login);