import React,{Component} from 'react';
import { connect } from 'react-redux';
import { createEmployee } from '../../actions';
import EmployeeForm from './EmployeeForm'


class CreateEmployee extends Component {

  onSubmit = formValues => {
    this.props.createEmployee(formValues);
  };

  render(){
    return(
      <div>
       <h3>Create a Stream</h3>
        <EmployeeForm onSubmit={this.onSubmit} />
      </div>
    )
  }
}

export  default connect(null,{createEmployee})(CreateEmployee) ;