import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IngredientList from '../components/IngredientList';
import MethodList from '../components/MethodList';
import ReviewList from '../components/ReviewList';
import Footer from '../components/Footer';
import { Link } from 'react-router';
import { getRecipe } from '../store/actions';
import food9 from '../../assets/image/food-9.jpg';
import AddReview from './../components/AddReview';
import '../../assets/css/style.css';

class ViewRecipeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    if (!this.props.recipe) {
      this.props.getRecipe(this.props.params.recipeId);
    }
  }
  render() {
    let { recipe } = this.props;

    
    
    
    
    let recipeCard;

    if(!recipe) {
      recipeCard = (
        <h1>Loading the recipe...</h1>
      );
    } else {
      
      recipeCard = (
        <div>
          <section id="nav">
            <nav className="navbar navbar-expand-sm navbar-dark fixed-top navbar-custom">
              <Link to ='/home' className="moreRecipes" href="#">MORE RECIPES</Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a className="navbar-register" style={{marginRight: 20}} href="#">REGISTER</a>
                  </li>
                  <li className="nav-item">
                    <a className="navbar-register" style={{marginRight: 20}} href="#">SIGN IN</a>
                  </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                  <input className="form-control mr-sm-2" type="search" placeholder="Find a Recipe" aria-label="Search" />
                </form>
              </div>
            </nav>
          </section>
          <section className="container text-center mx auto view-recipe-container" 
                   style={{border: '1px solid lightgrey', 
                   padding: 30, marginTop: 90, marginBottom: 50}}>
            <div className="row">
              <div className="col-sm-12">
                <h2 className="text-center">{recipe.name}</h2>
              </div>
            </div>
            <div className="row justify-content-center">
              <section className="col-sm-12">
                <figure className="figure" style={{padding: 10, marginBottom: 50}}>
                  <img src={recipe.recipeImage} 
                       alt="image 1" 
                       className="img-responsive col-sm-12 justify-content-center figure-img img-thumbnail image-fluid mx-auto" 
                       style={{ maxWidth: 900, maxHeight: 700 }} />
                  <figcaption className="figure-caption" style={{textAlign: 'left'}}>
                    <p style={{fontSize: '18px'}}><i className="fa fa-user-circle-o" aria-hidden="true" /> &nbsp;{recipe.User.username}</p>
                    <p style={{fontSize: '18px'}}><i className="fa fa-thumbs-up text-info" aria-hidden="true" />{recipe.Upvotes.length} &nbsp; 
                    <i className="fa fa-thumbs-down text-danger" aria-hidden="true" />
                    {recipe.Downvotes.length} &nbsp; 
                    <i className="fa fa-heart" aria-hidden="true" style={{color: 'yellow'}} />{recipe.Favorites.length}</p><br/><br/>
                    <p style={{fontSize: '18px', color:'green'}}>CATEGORY: </p><p style={{fontSize: '18px'}}>{recipe.category}</p>
                    <br/>
                    <p style={{fontSize: '18px', color:'green'}}>DESCRIPTION:</p>
                    <p style={{fontSize: '18px'}}>{recipe.description}</p>
                  </figcaption>
                </figure>
                <article>
                  <h3 style={{borderBottom: '1px solid lightgrey', marginBottom: 20, color:'green'}}>INGREDIENTS</h3>
                  <IngredientList ingredients={recipe.ingredients}/>
                </article>
                <h3 style={{borderBottom: '1px solid lightgrey', marginBottom: 20, color:'green'}}>DIRECTIONS</h3>
                  <MethodList method={recipe.method}/>
              </section>
            </div>
            <div className="row">
              <section className="col-sm-12 text-center">
                <h3 style={{borderBottom: '1px solid lightgrey', marginBottom: 20, color:'green'}}>REVIEWS</h3>
              </section>
            </div>
            <section className="text-justify" style={{paddingLeft: 50, paddingRight: 50}}>
                <ReviewList reviews={recipe.Reviews}/>
            </section>
            <div className="row justify-content-center">
                <AddReview recipeId={recipe.id}/>
            </div>
          </section>
          <Footer/>
        </div>
      );
    }
    return (
      <div>
        {recipeCard}
      </div>
    )
  }
}

ViewRecipeScreen.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    ingredients: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    recipeImage: PropTypes.string.isRequired
  }),
  getRecipe: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    recipe: state.recipes.find(r => r.id === parseInt(ownProps.params.recipeId)) || null
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getRecipe
  }, dispatch);
}
const ViewRecipe = connect(mapStateToProps, mapDispatchToProps)(ViewRecipeScreen);

export default ViewRecipe;
