import React from "react"
import {Tabs,Tab} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout,cookies} from '../../actions/auth-actions';



class ToolbarTabs extends React.Component{



  handleLogout = event => {
    event.preventDefault();
    this.props.logout();

  }

 

render(){
 
return(
  <Tabs  onChange={(event,value) =>  this.props.onChangeTabHandler(value)} value={this.props.value}>
<Tab label="Employee List" component={Link} to="/"></Tab>
<Tab label="Employee Details" component={Link} to="/employees/details"></Tab>
{this.props.currentUser ? <Tab label="Logout" component={Link} to="/login" onClick={this.handleLogout} ></Tab>  : <Tab label="Login" component={Link} to="/login" ></Tab>}
 
 
 </Tabs>
)
}

}   
const mapStateToProps = ({ currentUser }) => {
  return { currentUser }
}
export default connect(mapStateToProps,{logout})(ToolbarTabs);