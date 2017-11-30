import React from 'react';
import Footer from '../components/Footer';
import { Link } from 'react-router';

export default class Register extends React.Component {
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
                <div className="card-body">
                  <form>
                    <input type="text" name="user" placeholder="Firstname" />
                    <input type="text" name="user" placeholder="Lastname" />
                    <input type="text" name="user" placeholder="Email" />
                    <input type="text" name="user" placeholder="Username" />
                    <input type="password" name="pass" placeholder="Password" />
                    <div className="row justify-content-center">
                      <input type="submit" name="register" className="register-card-submit" style={{fontFamily: 'Candara'}} defaultValue="SIGN UP" />
                    </div>
                  </form>
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
