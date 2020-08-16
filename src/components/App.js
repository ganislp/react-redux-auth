import React,{Component} from 'react';
import { Router, Route, Switch,BrowserRouter,Link } from 'react-router-dom';
import {ThemeProvider} from '@material-ui/core/styles';
import history from '../history';
import {connect} from 'react-redux';
import EmployeeList from './employees/EmployeeList';
import EmployeeCreate from './employees/CreateEmployee';
import EmployeeEdit from './employees/EditEmployee';
import EmployeeDelete from './employees/DeleteEmployee';
import EmployeeDetails from './employees/EmployeeDetails';
import Login from './employees/Login';
import UserRegister from './employees/UserRegister'
import theme from './ui/Theme'
import Header from './Navigation/Header';
import PrivateRoute from './PrivateRoute';
import {fetchUser}  from '../actions/auth-actions';


class App extends Component{

 componentDidMount(){
   this.props.fetchUser()
 }



render(){
  return(
    <ThemeProvider theme={theme}>
      <Router history={history}>
    <Header/>
    <Switch>
   
     <Route exact path="/" component={props => (<EmployeeList {...props} /> )}></Route>
      <PrivateRoute  path="/employees/create" exact component={props => (<EmployeeCreate {...props} /> )}></PrivateRoute>
      <Route  path="/employees/edit/:uid" exact render={props => (<EmployeeEdit {...props} /> )}></Route>
      <Route  path="/employees/delete" exact render={props => (<EmployeeDelete {...props} /> )}></Route>
      <PrivateRoute  path="/employees/details" exact component={EmployeeDetails}></PrivateRoute>
      <Route exact path="/login" render={props => (<Login {...props} /> )}></Route>
      <Route exact path="/register" render={props => (<UserRegister {...props} /> )}></Route>
    
    </Switch>
    </Router>
    </ThemeProvider>
  )
}

}
const mapStateToProps = ({ currentUser }) => {
  console.log("currentUser",currentUser)
  return { currentUser }
}
export default connect(mapStateToProps,{fetchUser})(App);