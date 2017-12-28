import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Footer from '../components/Footer';
import { Link } from 'react-router';
import { signUpUser } from '../store/actions';
import { checkEmail, checkUsername, checkname, checkPassword } from '../helpers';
import '../../assets/css/style.css';

class RegisterScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      Firstname: '',
      Lastname: '',
      Username: '',
      Email: '',
      Password: '',
      error: null,
      errors: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  async handleInputChange(event) {
   this.setState ({
     [event.target.name]: event.target.value,
   });
  }

  async handleValidation() {
    let errors = [];

    
    if(( this.state.Firstname.length < 1 ) || (!checkname(this.state.Firstname)))  {
      errors.push('First name is required');
    }

    if(( this.state.Lastname.length < 1 ) || (!checkname(this.state.Lastname))) {
      errors.push('Last name is required');
    }

    if( this.state.Email.length < 1 ) {
      errors.push('Email address is required');
    }
    
    if(this.state.Email.length > 1 && (!checkEmail(this.state.Email))) {
      errors.push('Please enter a valid email address');
    }

    if(( this.state.Username.length < 1 ) || (!checkUsername(this.state.Username))) {
      errors.push('Choose a preferred username');
    }
    
    if( this.state.Password.length < 6) {
      errors.push('Your password should have a minimum of 6 characters');
    }
    if( this.state.Password.length >= 6 && (!checkPassword(this.state.Password))) {
      errors.push('Password should only include (a-z, 0-9, -, _, .)');
    }


    this.setState( {errors}, () => {
      return Promise.resolve();
    });

  }


  async handleRegister() {
    await this.handleValidation();
    
    if( this.state.errors.length > 0) {
      return;
    }

    try {

      const response = await this.props.signUpUser({
        Firstname: this.state.Firstname,
        Lastname: this.state.Lastname,
        Email: this.state.Email,
        Username: this.state.Username,
        Password: this.state.Password
      });
      
      this.props.router.push('/');

    } catch (error) {
      if (error.response.status === 400) {
          this.setState({
          errors: [error.response.data.message]
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

    return (
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
                  <Link to='/signin' className="navbar-register" style={{marginRight: 20}} href="#">SIGN IN</Link>
                </li>
              </ul>
              <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Find a Recipe" aria-label="Search" />
              </form>
            </div>
          </nav>
        </section>
        <div className="container" style={{position: 'absolute', top: 20, left: 0, right: 0, margin: '0 auto'}}>
          <div className="row justify-content-center py-5">
            <div className="col-sm-12 col-md-8">
              <div className="card card-container " id="register-card">
                <h1 className="card-header text-center" style={{fontFamily: 'kaushan script'}}>CREATE NEW ACCOUNT</h1><br />
                {errorHolder}
                <div className="card-body">
                    <input type="text" 
                    name="Firstname" 
                    placeholder="Firstname"
                    value={this.state.Firstname}
                    onChange={
                      this.handleInputChange}/>
                    <input type="text" 
                    name="Lastname" 
                    placeholder="Lastname"
                    value={this.state.Lastname}
                    onChange={this.handleInputChange}/>
                    <input 
                    type="text" 
                    name="Email" 
                    placeholder="Email"
                    value={this.state.Email}
                    onChange={this.handleInputChange} />
                    <input 
                    type="text" 
                    name="Username" 
                    placeholder="Username" 
                    value={this.state.Username}
                    onChange={this.handleInputChange}/>
                    <input 
                    type="password" 
                    name="Password" 
                    placeholder="Password"
                    value={this.state.Password}
                    onChange={this.handleInputChange} />
                    <div className="row justify-content-center">
                      <input type="submit" name="register" className="register-card-submit" onClick={ (event) => {this.handleRegister();}} style={{fontFamily: 'kaushan script'}} defaultValue="SIGN UP" />
                    </div>
                  <div className="register-help">
                    <Link to = '/signin' className="register-link" href="#" style={{color: 'white', fontFamily: 'kaushan script'}}>ALREADY REGISTERED?  SIGN IN</Link>
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

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    signUpUser
  }, dispatch);
};

const Register = connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);

export default Register;
