import React from 'react';
import FileUploader from "react-firebase-file-uploader";
import {storage} from '../../Firebase/Firebase';
import { connect } from 'react-redux';
import {uploadHeroImages} from '../../actions'


class ImageUploader extends React.Component{
  state = {
    filenames: [],
    downloadURLs: [],
    isUploading: false,
    uploadProgress: 0
  };

   
  handleUploadStart = () =>
    this.setState({
      isUploading: true,
      uploadProgress: 0
    });
 
  handleProgress = progress =>
    this.setState({
      uploadProgress: progress
    });


 
  handleUploadError = error => {
    this.setState({
      isUploading: false
      // Todo: handle error
    });
    console.error(error);
  };

  handleUploadSuccess = async filename => {
   
    const downloadURL = await 
       storage
      .ref("hero")
      .child(filename)
      .getDownloadURL().then(res => {
        this.props.uploadHeroImages({imageUrl:res,fileName:filename})
      });
 
    this.setState(oldState => ({
      filenames: [...oldState.filenames, filename],
      downloadURLs: [{...oldState.downloadURLs, downloadURL}],
      uploadProgress: 100,
      isUploading: false
    }));

    
  };
 
  

  render(){
    return(
      <div>
        {this.state.downloadURLs.length}
      <form>
        
        <FileUploader
          accept="hero/"
          name="image-uploader-multiple"
          // randomizeFilename
          storageRef={storage.ref("hero")}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
          multiple
        />
      </form>
      </div>
    )
  }
}

export default connect(null,{uploadHeroImages})(ImageUploader);