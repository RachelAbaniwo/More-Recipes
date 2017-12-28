import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Footer from '../components/Footer';
import { Link } from 'react-router';
import { createRecipe } from '../store/actions';
import { checkField } from '../helpers'
import '../../assets/css/style.css';

class CreateRecipeScreen extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: 'ASDASDASDASD',
      category: 'ASDASDASD',
      method: 'asdasdasdasd',
      description: 'asl;as;lkasd;asd',
      ingredients: 'asdasdnlsdknakldnasd',
      error: null,
      errors: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleValidation() {
    let errors = [];
    
    if(( this.state.name.length < 1 ) || (checkField(this.state.name)))  {
      errors.push('Recipe name is required');
    }

    if(( this.state.category.length < 1 ) || (checkField(this.state.category))) {
      errors.push('Recipe category is required');
    }

    if(( this.state.description.length < 1 ) || (checkField(this.state.description))) {
      errors.push('Recipe description is required');
    }
    
    if(( this.state.ingredients.length < 1 ) || (checkField(this.state.ingredients))) {
      errors.push('Recipe ingredients are required');
    }
    
    if(( this.state.method.length < 1 ) || (checkField(this.state.method))) {
      errors.push('Preparation method is required');
    }
    


    this.setState( {errors}, () => {
      return Promise.resolve();
    });
  }

  async handleSubmit() {

    await this.handleValidation();
    if (this.state.errors.length > 0) {
      return
    }
    
    try {    
      const recipe = await this.props.createRecipe(this.state);
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
  render() {

    let errorHolder = this.state.errors.map((error, index) => {
      return (
        <span key={index}>
          <small className="mb-3" style={{
            color: 'red',
            fontFamily: 'kaushan script',
            fontWeight: 'bold'
          }}>{error}</small>
          <br />
        </span>
      );
    });
    return(
      <div>
        <section id="nav">
          <nav className="navbar navbar-expand-sm navbar-dark fixed-top navbar-custom">
            <a className="moreRecipes" href="#">MORE RECIPES</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                <form className="form-inline my-2 my-lg-0">
                  <input className="form-control mr-sm-2" type="search" placeholder="Find a Recipe" aria-label="Search" />
                </form>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" style={{marginRight: 50}} href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Hi Rachel!
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a className="dropdown-item" href="topFavorites.html" style={{fontSize: 15}}>PROFILE</a>
                    <a className="dropdown-item" href="topFavorites.html" style={{fontSize: 15}}>LOG OUT</a>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </section>
        <section className="container text-center mx auto view-recipe-container" style={{border: '1px solid lightgrey', padding: 30, marginTop: 90, marginBottom: 50}}>
          <section className="row justify-content-center py-5">
            <section className="col-md-8">
              <div className="card" style={{backgroundColor: 'rgba(233, 231, 231, 0.863)'}}>
                <h4 className="card-header text-center">CREATE RECIPE</h4><br />
                {errorHolder}
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <input type="text" className="form-control" name="name" value={this.state.name} placeholder="Recipe Name"
                      onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <input type="text" onChange={this.handleChange} className="form-control" name="category" placeholder="Category" value={this.state.category} />
                    </div>
                    <div className="form-group">
                      <textarea type="text" onChange={this.handleChange} className="form-control" name="ingredients" placeholder="Ingredients" value={this.state.ingredients} />
                    </div>
                    <div className="form-group">
                      <textarea type="text" onChange={this.handleChange} className="form-control" name="description" placeholder="Description" value={this.state.description} />
                    </div>
                    <div className="form-group">
                      <textarea type="text" onChange={this.handleChange} className="form-control" name="method" placeholder="Method" value={this.state.method} />
                    </div>
                    <div className="form-group col-md-4 p-0 m-0">
                      <input type="file" className="form-control" />
                    </div>
                    <button type="button" 
                    onClick={this.handleSubmit}
                    className="btn btn-default" style={{ marginLeft: 10, marginTop: 20,marginBottom: 20}}>ADD RECIPE</button>
                  </form>
                </div>
              </div>
            </section>
          </section>
        </section>
        <Footer/>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createRecipe
  }, dispatch);
};

const CreateRecipe = connect(mapStateToProps, mapDispatchToProps)(CreateRecipeScreen);

export default CreateRecipe;