import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Footer from '../components/Footer';
import ImageFile from '../components/ImageUploader';
import { createRecipe } from '../store/actions/recipes';
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
   * Adds new recipe
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
      method: '',
      description: '',
      ingredients: '',
      error: null,
      errors: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      errors.push('Recipe image is required');
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

    try {
      delete axios.defaults.headers.common.token;

      const response = await axios.post('https://api.cloudinary.com/v1_1/rachelabaniwo/image/upload', formData);

      axios.defaults.headers.common.token = JSON.parse(localStorage.getItem('authUser')).token;

      return Promise.resolve(response.data.secure_url);
    } catch (errors) {
      console.log(errors);
    }
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
      const imageUrl = await this.uploadToCloudinary();

      const recipeData = this.state;
      recipeData.imageUrl = imageUrl;

      const recipe = await this.props.createRecipe(recipeData);

      //  this.props.router.push('/');
    } catch (error) {
      if (error.response.status === 400) {
        this.setState({
          errors: error.response.data.errors
        });
      } else {
        this.setState({
          error: 'Try again after some time.'
        });
      }
    }
  }
  /**
   * Creates a new recipe
   *
   * @returns {jsx} jsx which adds a new recipe or errors if errors exist
   */
  render() {
    const errorHolder = this.state.errors.map((error, index) => (
      <span key={index}>
        <small
          className="mb-3"
          style={{
          color: 'red',
          fontFamily: 'kaushan script',
          fontWeight: 'bold'
        }}
        >{error}
        </small>
        <br />
      </span>
    ));
    return (
      <div>
        <section id="nav">
          <nav
            className="navbar navbar-expand-sm navbar-dark fixed-top navbar-custom"
          >
            <Link to='/home'className="moreRecipes" href="#">MORE RECIPES</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                <form className="form-inline my-2 my-lg-0">
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Find a Recipe"
                    aria-label="Search"
                  />
                </form>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    style={{ marginRight: 50 }} 
                    href="#" id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true" 
                    aria-expanded="false"
                  >
                    Hi Rachel!
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <a
                      className="dropdown-item"
                      href="topFavorites.html"
                      style={{ fontSize: 15 }}
                    >PROFILE
                    </a>
                    <a
                      className="dropdown-item"
                      href="topFavorites.html"
                      style={{ fontSize: 15 }}
                    >LOG OUT
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </section>
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
                <h4 className="card-header text-center">CREATE RECIPE</h4><br />
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
                      <ImageFile />
                    </div>
                    <button
                      type="button"
                      onClick={this.handleSubmit}
                      className="btn btn-default"
                      style={{ marginLeft: 10, marginTop: 20, marginBottom: 20 }}
                    >ADD RECIPE
                    </button>
                  </form>
                </div>
              </div>
            </section>
          </section>
        </section>
        <Footer />
      </div>

    );
  }
}
/**
 * Map state to props
 * @param {object} state
 *
 * @returns {object} object of recipes passed as props
 */
const mapStateToProps = state => ({
  imageFile: state.imageUpload.imageFile
});
/**
 * Map dispatch to props
 * @param {object} dispatch
 *
 * @returns {object} object to be passed as props to component
*/
const mapDispatchToProps = dispatch => bindActionCreators({
  createRecipe
}, dispatch);

const CreateRecipe = connect(mapStateToProps, mapDispatchToProps)(CreateRecipeScreen);

export default CreateRecipe;
