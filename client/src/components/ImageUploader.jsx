import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { bindActionCreators } from 'redux';
import { setImageUrl } from '../store/actions/recipes';
import '../../assets/css/hover.css';

/**
 * Add a recipe image component
 * @class
 *
 * @returns {object} jsx object
 */
class ImageFile extends React.Component {
  /**
   * Adds recipe image
   * @constructor
   *
   * @param {object} props
   *
   * @returns {object} jsx
   */
  constructor(props) {
    super(props);

    this.handleDrop = this.handleDrop.bind(this);
    this.buildImageMessage = this.buildImageMessage.bind(this);
  }
  /**
   * sets image url
   * @function
   *
   * @param {object} files
   *
   * @returns {function} file[0] as parameter
  */
  handleDrop(files) {
    this.props.setImageUrl(files[0]);
    console.log(this.props.setImageUrl(files[0]));
  }
  /**
   * Displays appropriate message alongside image
   * @function
   *
   * @param {null} null
   *
   * @returns {jsx} imgMsg jsx that displays message
  */
  buildImageMessage() {
    let imgMsg = null;
    if (!this.props.imageFile) {
      imgMsg = (
        <div
          className="justify-content-center"
          style={{ height: '100px' }}
        >
          <h5
            className="justify-content-center"
          >Click to select your Recipe Image
          </h5>
        </div>
      );
    } else {
      imgMsg = (
        <div className="justify-content-center">
          <div className="hovereffect">
            <img
              className="img-responsive col-sm-12 justify-content-center figure-img img-thumbnail image-fluid mx-auto"
              style={{ maxWidth: 700, maxHeight: 500 }}
              src={this.props.imageFile.preview}
              alt=""
            />
            <div className="overlay">
              <h2>Click to upload another image</h2>
            </div>
          </div>
        </div>
      );
    }
    return imgMsg;
  }
  /**
   * Displays preview of recipe image
   *
   * @returns {jsx} jsx with dropzone mounting preview of image
   */
  render() {
    return (
      <Dropzone onDrop={this.handleDrop} style={{ width: '100%' }}>
        {this.buildImageMessage()}
      </Dropzone>
    );
  }
}
ImageFile.propTypes = {
  setImageUrl: PropTypes.func.isRequired,
  imageFile: PropTypes.func
};

ImageFile.defaultProps = {
  imageFile: null
};
/**
 * Map state to props
 * @param {object} state
 *
 * @returns {object} object of state to props
 */
const mapStateToProps = state => ({
  imageFile: state.imageUpload.imageFile
});
/**
 * Map dispatch to props
 * @param {function} dispatch
 *
 * @returns {object} object to be passed as props to component
 */
const mapDispatchToProps = dispatch =>
  bindActionCreators({ setImageUrl }, dispatch);


const ImageUrlContainer = connect(mapStateToProps, mapDispatchToProps)(ImageFile);

export default ImageUrlContainer;
