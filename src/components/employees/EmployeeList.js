import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchEmployees,updateInActive,updateActive,deleteInActive} from '../../actions'
import MaterialTable from 'material-table';
import {Button, Grid,Typography}  from '@material-ui/core'
import history from '../../history';
import _ from 'lodash';
import UserRegister from './UserRegister'
import Login from './Login'
import HeroImagesList from './HeroImagesList'

class EmployeeList extends Component {

  componentDidMount(){
    this.props.fetchEmployees()
  }

  updateActive = (rowData) => {
    if(!rowData.active){
 const uid =  (this.props.employees.filter(emp => emp.active === true).map((value, key) => {
  return value.uid
 }));
this.props.updateInActive(uid);
this.props.updateActive(rowData.uid)   
}
}

deleteContent = (rowData) => {
  if(!rowData.active){
this.props.deleteInActive(rowData.uid)
  }
}

  renderList(){
 return (  
<Grid container>
{/* <Grid item >
  <Typography variant="h2">Login</Typography>
  <Login/>
</Grid>
<Grid item >
  <Typography variant="h2">Register</Typography>
  <UserRegister/>
</Grid> */}

<Grid item container justify="flex-end">
<Button variant="contained" color="primary" onClick={() => history.push("/employees/create")}>Create Header</Button>
</Grid>
  <Grid item>
  <MaterialTable
     columns={[
      { title: 'heading', field: 'heading' },
      { title: 'subHeading', field: 'subHeading' },
      { title: 'body', field: 'body', },
      { title: 'createdAt', field: 'createdAt', },
    ]}
     data = {this.props.employees}
     options={{actionsColumnIndex: -1}}
     actions={[    
      rowData => ( {
        icon: rowData.active ? 'check' : 'clear',
        tooltip: rowData.active ? 'Active' : 'inActive',
        onClick: (event, rowData) => this.updateActive(rowData)
      }),
      rowData => ( {      
        icon: 'edit',
        tooltip: 'Edit Hero Top',
        onClick: (event, rowData) => history.push(`/employees/edit/${rowData.uid}`)  
      }),
      rowData => ({
        icon: 'clear',
        tooltip: 'Delete User',
        onClick: (event, rowData) => this.deleteContent(rowData), 
        disabled: rowData.birthYear < 2000
      })
    ]}
    title="Hero Header"    />
 

    </Grid>
    <Grid item container>
    {/* <HeroImagesList/> */}
    </Grid>
    </Grid>
  
 )
}

  render(){
   
    if(this.props.employees.length <= 0){
      return <div>loading.........</div>
    }
    return(
      <div>

        {this.renderList()}      
      </div>     
    )
  }
}

 const mapStateToProps = (state, ownProps) => {
  return {
    employees: Object.values(state.employees)
  }
}

export  default connect(mapStateToProps,{fetchEmployees,updateInActive,updateActive,deleteInActive})(EmployeeList) ;