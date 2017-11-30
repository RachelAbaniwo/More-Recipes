import React from 'react';
import Footer from '../components/Footer';
import { Link } from 'react-router';

export default class Login extends React.Component {
  render() {
    return (
      <div>
        <section id="nav">
          <nav className="navbar navbar-expand-sm navbar-dark fixed-top navbar-custom">
            <a className="navbar-brand" href="#">MORE RECIPES</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="navbar-register" style={{marginRight: 20}} href="#">REGISTER</a>
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
                <div className="card-body">
                  <form>
                    <input type="text" name="user" placeholder="Username" />
                    <input type="password" name="pass" placeholder="Password" />
                    <div className="row justify-content-center">
                      <input type="submit" name="login" className="login login-card-submit" style={{fontFamily: 'Candara'}} defaultValue="SIGN IN" />
                    </div>
                  </form>
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