import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

/**
 * Add a recipe image component
 * @class
 *
 * @returns {object} jsx object
 */
export class ImageFile extends React.Component {
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
    if (!this.props.imageFile && !this.props.imageUrl) {
      imgMsg = (
        <div
          className="justify-content-center"
          style={{ height: '100px' }}
        >
          <h5
            className="justify-content-center"
          >Click to select Image
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
              src={this.props.imageFile ? this.props.imageFile.preview : this.props.imageUrl}
              alt=""
            />
            <div className="overlay">
              <h2>Click to select another image</h2>
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
  imageFile: PropTypes.shape({
    preview: PropTypes.string.isRequired
  }),
  imageUrl: PropTypes.string
};

ImageFile.defaultProps = {
  imageFile: null,
  imageUrl: null
};

export default ImageFile;
