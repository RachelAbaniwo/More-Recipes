import React from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { bindActionCreators } from 'redux';
import { setImageUrl } from '../store/actions';
import foodPlaceholder from '../../assets/image/food-placeholder.jpeg';

import '../../assets/css/hover.css';

class ImageFile extends React.Component {
  constructor(props) {
    super(props);

    this.handleDrop = this.handleDrop.bind(this);
    this.buildImageMessage = this.buildImageMessage.bind(this);
  }
  handleDrop(files) {
    this.props.setImageUrl(files[0]);
  }
  buildImageMessage() {
    let imgMsg = null;
    if (!this.props.imageFile) {
      imgMsg = (
        <div className="justify-content-center" style={{ height: '100px' }}>
          <h5 className="justify-content-center">Click to select your Recipe Image</h5>
      </div>
      );
    } else {
      imgMsg = (
          <div className="justify-content-center">
            <div className="hovereffect">
              <img className="img-responsive col-sm-12 justify-content-center figure-img img-thumbnail image-fluid mx-auto" 
                    style={{ maxWidth: 700, maxHeight: 500 }}
                   src={this.props.imageFile.preview} alt="" />
              <div className="overlay">
                <h2>Click to upload another image</h2>
              </div>
          </div>
        </div>
      );
    }
    return imgMsg;
  }

  render() {
    return (
      <Dropzone onDrop={this.handleDrop} style={{ width: '100%' }}>
        {this.buildImageMessage()}
      </Dropzone>
    );
  }
}



const mapStateToProps = state => {
  return {
    imageFile: state.imageUpload.imageFile
  };
};


const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { setImageUrl }, dispatch
  );
};

const ImageUrlContainer = connect(mapStateToProps, mapDispatchToProps)(ImageFile);

export default ImageUrlContainer;
