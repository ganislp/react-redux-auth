import React,{Component} from 'react';
import {AppBar,Toolbar} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";


import ToolbarTabs from './ToolbarTabs'

const useStyles = theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
   // marginBottom: "1em"
   [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
  },
})


class Header extends Component{
  state = {
    value : 0
  }

  onChangeTabHandler = (value) => {
    this.setState({
      value:value
    }); 
  }

  render(){

    const { classes } = this.props;
    return(
      <React.Fragment>
      <AppBar position="fixed" color="primary">
        <Toolbar disableGutters>
        <ToolbarTabs value={this.state.value} onChangeTabHandler={this.onChangeTabHandler}/>
        </Toolbar>
        </AppBar>
        <div className={classes.toolbarMargin} />
        </React.Fragment>
    )
  }
}

export default (withStyles(useStyles,{ withTheme: true })(Header))

