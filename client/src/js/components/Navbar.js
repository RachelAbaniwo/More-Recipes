import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <section id="nav">
      <nav className="navbar navbar-expand-md navbar-dark fixed-top" style={{backgroundColor: 'rgba(73, 67, 67, 0.9)', width: '100%', height: 50, fontSize: 15}}>
        <a className="navbar-brand" href="#page-top"><h4 style={{color: 'rgba(27, 255, 164, 0.473)'}}> MORE RECIPES</h4><span className="sr-only">(current)</span></a>
      </nav>
    </section>
    );
  }
}