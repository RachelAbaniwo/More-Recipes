import React from 'react';
import Footer from '../components/Footer';
import { Link } from 'react-router';
import { checkname, checkUsername, checkPassword } from '../../../server/helpers/checkInput'
export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
     error: null,
     Username: '',
     Password:'',
    };

    this.handleSignIn = this.handleSignIn.bind(this);
  }

  async handleSignIn() {
    
    try {
      const user = await this.props.signInUser({ 
        Username: this.state.Username, 
        Password: this.state.Password
      });

      this.props.router.push('/');
    } catch (error) {
      if (error.response.status === 400) {
        this.setState({
          error: error.response.data.errors
        });
      } 
      else if(error.response.status === 404) {
        this.setState({
          error: error.response.data.message
        });
      } else {
        this.setState({
          error: 'Please try again after some time.'
        });
      }
    }
  }



  render() {

    let errorHolder = ( <small></small> );

    if (this.state.error) {
      errorHolder = ( 
      <small className="mb-3" style={{
      color: 'red',
      fontFamily: 'candara',
      fontWeight: 'bold'
      }}> 
        {this.state.error}
      </small> 
      );
    } 

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
            <div className="col-md-6">
              <div className="card card-container" id="login-card">
                <h1 className="card-header text-center" style={{fontFamily: 'Candara'}}>SIGN IN</h1><br />
                {errorHolder}
                <div className="card-body">
                    <input type="text" name="user" placeholder="Username" value={this.state.Username} onChange={ (event) => {this.setState({ Username: event.target.value}); }} />
                    <input type="password" name="pass" placeholder="Password" value={this.state.Password} onChange={ (event) => {this.setState({ Password: event.target.value}); }} />
                    <div className="row justify-content-center">
                      <input type="submit" name="login" className="login login-card-submit" onClick={ (event) => {this.handleSignIn(); }} style={{fontFamily: 'Candara'}} defaultValue="SIGN IN" />
                    </div>
                  <div className="login-help" style={{color: 'white', fontFamily: 'Candara'}}>
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