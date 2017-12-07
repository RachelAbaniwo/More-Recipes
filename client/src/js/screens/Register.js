import React from 'react';
import Footer from '../components/Footer';
import { Link } from 'react-router';
import { checkEmail } from '../helpers';

export default class Register extends React.Component {

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

    
    if( this.state.Firstname.length < 1 ) {
      errors.push('Fill in your First Name');
    }

    if( this.state.Lastname.length < 1 ) {
      errors.push('Fill in your Last Name');
    }

    if( this.state.Email.length < 1 ) {
      errors.push('Fill in your Email');
    }
    
    if(this.state.Email.length > 1 && (!checkEmail(this.state.Email))) {
      errors.push('Enter Valid Email Address');
    }

    if( this.state.Username.length < 1 ) {
      errors.push('Fill in a preferred User-Name');
    }
    
    if( this.state.Password.length < 6) {
      errors.push('Your Password should have a minimum of 6 characters');
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
      
      if (error.response.status === 422) {
        this.setState({
          errors: error.response.data.data.errors
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
            fontFamily: 'candara',
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
            <Link to ='/home' className="navbar-brand" href="#">MORE RECIPES</Link>
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
            <div className="col-md-6">
              <div className="card card-container " id="register-card">
                <h1 className="card-header text-center" style={{fontFamily: 'Candara'}}>CREATE NEW ACCOUNT</h1><br />
                {errorHolder}
                <div className="card-body">
                    <input type="text" 
                    name="Firstname" 
                    placeholder="Firstname"
                    value={this.state.Firstname}
                    onChange={
                      this.handleInputChange} 
                      onBlur={this.handleValidation}/>
                    <input type="text" 
                    name="Lastname" 
                    placeholder="Lastname"
                    value={this.state.Lastname}
                    onChange={this.handleInputChange} 
                      onBlur={this.handleValidation}/>
                    <input 
                    type="text" 
                    name="Email" 
                    placeholder="Email"
                    value={this.state.Email}
                    onChange={this.handleInputChange} 
                      onBlur={this.handleValidation} />
                    <input 
                    type="text" 
                    name="Username" 
                    placeholder="Username" 
                    value={this.state.Username}
                    onChange={this.handleInputChange} 
                      onBlur={this.handleValidation}/>
                    <input 
                    type="password" 
                    name="Password" 
                    placeholder="Password"
                    value={this.state.Password}
                    onChange={this.handleInputChange} 
                      onBlur={this.handleValidation} />
                    <div className="row justify-content-center">
                      <input type="submit" name="register" className="register-card-submit" onClick={ (event) => {this.handleRegister();}} style={{fontFamily: 'Candara'}} defaultValue="SIGN UP" />
                    </div>
                  <div className="register-help">
                    <Link to = '/signin' className="register-link" href="#" style={{color: 'white', fontFamily: 'Candara'}}>ALREADY REGISTERED?  SIGN IN</Link>
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
