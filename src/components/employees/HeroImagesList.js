import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchHeroImages} from '../../actions';
import {Button, Grid}  from '@material-ui/core';
import ImageUploader from './ImageUploader';
import MaterialTable from 'material-table';

class HeroImagesList extends Component{

  componentDidMount(){
    this.props.fetchHeroImages();
  }

  render(){
    return(
<Grid container>
<Grid item container justify="flex-end">
<ImageUploader/>
</Grid>
  <Grid item>
  <MaterialTable
     columns={[
      { title: 'fileName', field: 'fileName' },
      { title: 'imageUrl', field: 'imageUrl' },
      { title: 'createdAt', field: 'createdAt', },
    ]}
     data = {this.props.heroImageList}
     options={{actionsColumnIndex: -1}}
     actions={[    
      rowData => ( {
        icon: rowData.active ? 'check' : 'clear',
        tooltip: rowData.active ? 'Active' : 'inActive',
        // onClick: (event, rowData) => this.updateActive(rowData)
      }),
   
      rowData => ({
        icon: 'clear',
        tooltip: 'Delete User',
        // onClick: (event, rowData) => this.deleteContent(rowData), 
      })
    ]}
    title="Hero Header"    />
 

    </Grid>
    </Grid>


    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    heroImageList: Object.values(state.heroImagesList)
  }
}

export default connect(mapStateToProps,{fetchHeroImages})(HeroImagesList);