import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <section id="nav">
      <nav className="navbar navbar-expand-sm navbar-dark fixed-top navbar-custom">
        <a className="navbar-brand" href="#">MORE RECIPES</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="navbar-register" style={{marginRight: 20}} href="#">POPULAR RECIPES</a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Find a Recipe" aria-label="Search" />
          </form>
        </div>
      </nav>
    </section>
    );
  }
}