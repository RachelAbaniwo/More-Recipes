import React from 'react';
import Footer from '../components/Footer';
import { Link } from 'react-router';
import { checkname, checkUsername, checkPassword } from '../../../server/helpers/checkInput'

import '../../assets/css/style.css';
export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
     error: null,
     Username: '',
     Password:'',
     errors: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  async handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleValidation() {
   let errors = [];

    if(( this.state.Username.length < 1 ) || (!checkUsername(this.state.Username))) {
    errors.push('Username is required');
    }

    if( this.state.Password.length < 1 ) {
      errors.push('Password is required');
      }

    this.setState( {errors}, () => {
      return Promise.resolve();
    });
  }

  async handleSignIn() {
    await this.handleValidation();
    if (this.state.errors.length > 0) {
      return
    }
    
    try {
      const user = await this.props.signInUser({ 
        Username: this.state.Username, 
        Password: this.state.Password
      });

      this.props.router.push('/');
    } catch (error) {
      if (error.response.status === 400) {
        this.setState({
          errors: error.response.data.errors
        });
      } 
      else if(error.response.status === 404) {
        this.setState({
          errors: error.response.data.message
        });
      } else {
        this.setState({
          error: 'Please try again after some time.'
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

    return (
      <div >
        <section id="nav">
          <nav className="navbar navbar-expand-sm navbar-dark fixed-top navbar-custom">
            <Link to='/home' className="moreRecipes" href="#">MORE RECIPES</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to='/signup' className="navbar-register" style={{marginRight: 20}} href="#">REGISTER</Link>
                </li>
              </ul>
              <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Find a Recipe" aria-label="Search" />
              </form>
            </div>
          </nav>
        </section>
        <div className="container" style={{position: 'absolute', top: 40, left: 0, right: 0, margin: '0 auto'}}>
          <div className="row justify-content-center py-5">
            <div className="col-sm-12 col-md-8">
              <div className="card card-container" id="login-card">
                <h1 className="card-header text-center" style={{fontFamily: 'kaushan script'}}>SIGN IN</h1><br />
                {errorHolder}
                <div className="card-body">
                    <input type="text" name="Username" placeholder="Username" value={this.state.Username} onChange={this.handleInputChange} />
                    <input type="password" name="Password" placeholder="Password" value={this.state.Password} onChange={this.handleInputChange} />
                    <div className="row justify-content-center">
                      <input type="submit" name="login" className="login login-card-submit" onClick={ (event) => {this.handleSignIn(); }} style={{fontFamily: 'kaushan script'}} defaultValue="SIGN IN" />
                    </div>
                  <div className="login-help" style={{color: 'white', fontFamily: 'kaushan script'}}>
                    <Link to = 'signup' className="register-link mr-1" href="#" style={{color: 'white'}}>REGISTER NEW ACCOUNT</Link><a className="forgot-link" href="#" style={{color: 'white'}}>FORGOT PASSWORD?</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}