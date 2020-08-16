import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchEmployee,editEmployee} from '../../actions';

import _ from 'lodash';
import EmployeeForm from './EmployeeForm';

class EditEmployee extends Component {

  componentDidMount(){
    this.props.fetchEmployee(this.props.match.params.uid);
  }

  onSubmit = formValues => {
  this.props.editEmployee(this.props.match.params.uid,formValues)
  };


  render(){

    if (!this.props.employee) {
      return <div>Loading...</div>;
    }


    return(
     <div>
         <h3>Edit a Stream</h3>
        <EmployeeForm 
        initialValues={_.pick(this.props.employee,'heading','subHeading','body')}
        onSubmit={this.onSubmit}
        />
     </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    employee: state.employees[ownProps.match.params.uid]
  }
 
}
export  default  connect(mapStateToProps,{fetchEmployee,editEmployee}) (EditEmployee) ;