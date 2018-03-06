import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { signOutUser } from '../store/actions/user';
import ImageFile from '../components/ImageFile';
import { createRecipe, setImageUrl, updateRecipe } from '../store/actions/recipes';
import { checkField } from '../helpers';
import '../../assets/css/style.css';

/**
 * Create recipe component
 * @class
 *
 * @returns {object} jsx object
 */
class CreateRecipeScreen extends React.Component {
  /**
   * Adds new recipe or updates existing one
   * @constructor
   *
   * @param {object} props
   *
   * @returns {object} jsx
   */
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      category: '',
      description: '',
      ingredients: '',
      method: '',
      imageUrl: '',
      errors: [],
      editing: false,
      isLoading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateRecipe = this.updateRecipe.bind(this);
  }

  /**
   * Execute when component will mount
   * @return {object} object
   */
  componentWillMount() {
    if (this.props.routeParams.recipeId) {
      const { recipe } = this.props;
      if (!recipe) {
        return this.props.router.push(`/view-recipe/${this.props.routeParams.recipeId}`);
      }
      this.setState({
        editing: true,
        name: recipe.name,
        category: recipe.category,
        description: recipe.description,
        ingredients: recipe.ingredients,
        method: recipe.method,
        imageUrl: recipe.recipeImage
      });
    }
  }

  /**
   * handles field change
   * @function
   *
   * @param {object} event
   *
   * @returns {object} sets state of field to its current value
   */
  async handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * handles validation of field input
   * @function
   *
   * @param {null} null
   *
   * @returns {object} with errors if errors exist
   */
  async handleValidation() {
    const errors = [];

    if ((this.state.name.length < 1) || (checkField(this.state.name))) {
      errors.push('Recipe name is required');
    }

    if ((this.state.category.length < 1) || (checkField(this.state.category))) {
      errors.push('Recipe category is required');
    }

    if ((this.state.description.length < 1) || (checkField(this.state.description))) {
      errors.push('Recipe description is required');
    }

    if ((this.state.ingredients.length < 1) || (checkField(this.state.ingredients))) {
      errors.push('Recipe ingredients are required');
    }

    if ((this.state.method.length < 1) || (checkField(this.state.method))) {
      errors.push('Preparation method is required');
    }

    if (!this.props.imageFile) {
      if (!this.state.imageUrl) {
        errors.push('Recipe image is required');
      }
    }
    this.setState({ errors }, () => Promise.resolve());
  }

  /**
   * handles upload of recipe image to cloudinary
   * @function
   *
   * @param {null} null
   *
   * @returns {object} with image url
   */
  async uploadToCloudinary() {
    const formData = new FormData();

    formData.append('file', this.props.imageFile);
    formData.append('upload_preset', 'jj8czdds');

    delete axios.defaults.headers.common.token;

    const response = await axios.post('https://api.cloudinary.com/v1_1/rachelabaniwo/image/upload', formData);

    axios.defaults.headers.common.token = JSON.parse(localStorage.getItem('authUser')).token;

    return Promise.resolve(response.data.secure_url);
  }

  /**
   * handles form submission
   * @function
   *
   * @param {null} null
   *
   * @returns {object} recipe object or errors if errors exist
   */
  async handleSubmit() {
    await this.handleValidation();
    if (this.state.errors.length > 0) {
      return;
    }

    try {
      this.setState({
        isLoading: true
      });
      const imageUrl = await this.uploadToCloudinary();

      const recipeData = this.state;
      recipeData.imageUrl = imageUrl;

      const recipe = await this.props.createRecipe(recipeData);

      this.props.router.push(`/view-recipe/${recipe.id}`);
    } catch (error) {
      if (error.response.status === 400) {
        this.setState({
          errors: error.response.data.errors
        });
      } else {
        // notify user swr
      }
    }
  }

  /**
   * handles update recipe form submission
   * @function
   *
   * @param {null} null
   *
   * @returns {object} recipe object or errors if errors exist
   */
  async updateRecipe() {
    await this.handleValidation();
    if (this.state.errors.length > 0) {
      return;
    }
    this.setState({
      isLoading: true
    });
    if (this.props.imageFile) {
      const secureUrl = await this.uploadToCloudinary();
      const recipeUpdateData = this.state;
      recipeUpdateData.imageUrl = secureUrl;

      // update to server.
      await this.props.updateRecipe(recipeUpdateData, this.props.recipe.id);
      return this.props.router.push(`/view-recipe/${this.props.routeParams.recipeId}`);
    }

    await this.props.updateRecipe(this.state, this.props.recipe.id);
    return this.props.router.push(`/view-recipe/${this.props.routeParams.recipeId}`);
  }

  /**
   * Creates a new recipe
   *
   * @returns {jsx} jsx which adds a new recipe or errors if errors exist
   */
  render() {
    const errorHolder = this.state.errors.map(error => (
      <span key={error}>
        <small
          className="mb-3"
          style={{
            color: 'orange',
            fontFamily: 'Advent Pro',
            fontWeight: '900'
        }}
        >{error}
        </small>
        <br />
      </span>
    ));

    let buttonText = 'ADD RECIPE';
    const { isLoading, editing } = this.state;
    if (isLoading && editing) {
      buttonText = 'UPDATING RECIPE ...';
    } else if (isLoading && !editing) {
      buttonText = 'ADDING RECIPE ...';
    } else if (!isLoading && editing) {
      buttonText = 'UPDATE RECIPE';
    }

    return (
      <div>
        <section
          className="container text-center mx auto create-recipe-container"
          style={{
            border: '1px solid lightgrey',
            padding: 30,
            marginTop: 90,
            marginBottom: 50
          }}
        >
          <section className="row justify-content-center py-5">
            <section className="col-md-8">
              <div className="card" style={{ backgroundColor: 'rgba(233, 231, 231, 0.863)' }}>
                <h4 className="card-header text-center title">{this.state.editing ? 'UPDATE' : 'CREATE'} RECIPE</h4><br />
                {errorHolder}
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={this.state.name}
                        placeholder="Recipe Name"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        onChange={this.handleChange}
                        className="form-control"
                        name="category"
                        placeholder="Recipe category"
                        value={this.state.category}
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        type="text"
                        onChange={this.handleChange}
                        className="form-control"
                        name="description"
                        placeholder="Recipe description"
                        value={this.state.description}
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        type="text"
                        onChange={this.handleChange}
                        className="form-control"
                        name="ingredients"
                        placeholder="Ingredients (separate with commas)"
                        value={this.state.ingredients}
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        type="text"
                        onChange={this.handleChange}
                        className="form-control"
                        name="method"
                        placeholder="Recipe directions (separate each step with a period)"
                        value={this.state.method}
                      />
                    </div>
                    <div className="form-group p-0 m-0">
                      <ImageFile
                        setImageUrl={this.props.setImageUrl}
                        imageFile={this.props.imageFile}
                        imageUrl={this.props.recipe && this.props.recipe.recipeImage}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={this.state.editing ? this.updateRecipe : this.handleSubmit}
                      className="btn btn-default"
                      disabled={this.state.isLoading}
                      style={{
                        marginLeft: 10, marginTop: 20, marginBottom: 20, fontWeight: 900
                      }}
                    >{buttonText}
                    </button>
                  </form>
                </div>
              </div>
            </section>
          </section>
        </section>
      </div>

    );
  }
}

CreateRecipeScreen.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    method: PropTypes.string,
    recipeImage: PropTypes.string
  }),
  authUser: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      aboutMe: PropTypes.string.isRequired
    })
  }),
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  imageFile: PropTypes.shape({
    preview: PropTypes.string.isRequired
  }),
  routeParams: PropTypes.shape({
    recipeId: PropTypes.string
  }),
  createRecipe: PropTypes.func.isRequired,
  setImageUrl: PropTypes.func.isRequired,
  updateRecipe: PropTypes.func.isRequired,
  signOutUser: PropTypes.func.isRequired
};
CreateRecipeScreen.defaultProps = {
  recipe: {},
  imageFile: null,
  routeParams: {},
  authUser: null
};

/**
 * Map state to props
 * @param {object} state
 * @param {object} ownProps
 *
 * @returns {object} object of recipes passed as props
 */
const mapStateToProps = (state, ownProps) => ({
  authUser: state.authUser,
  imageFile: state.imageUpload.imageFile,
  recipe: state.recipes.rows.filter(recipe =>
    recipe.id === parseInt(ownProps.params.recipeId, 10))[0]
});

/**
 * Map dispatch to props
 * @param {object} dispatch
 *
 * @returns {object} object to be passed as props to component
*/
const mapDispatchToProps = dispatch => bindActionCreators({
  signOutUser, createRecipe, setImageUrl, updateRecipe
}, dispatch);

const CreateRecipe = connect(mapStateToProps, mapDispatchToProps)(CreateRecipeScreen);

export default CreateRecipe;
