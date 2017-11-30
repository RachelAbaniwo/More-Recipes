import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router';

export default class Home extends React.Component {
       render() {
          return (
            <div>
             
              <Navbar/>
              <section id="slider">
                  <div id="carouselExampleIndicators" className="carousel slide" data-interval={2000} data-ride="carousel">
                    <div className="carousel-inner fullHeight">
                      <div className="carousel-item active">
                        <img className="d-block w-100" src="assets/image/food-9.jpg" alt="First slide" />
                        <div className="carousel-caption d-none d-md-block">
                          <h3>Check Out Our All Time Favorites</h3>
                          <p>from around the world</p>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <img className="d-block w-100" src="assets/image/food-20.jpg" alt="Third slide" />
                        <div className="carousel-caption d-none d-md-block">
                          <h3>Amazing Desserts</h3>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <img className="d-block w-100" src="assets/image/food-23.jpg" alt="Third slide" />
                        <div className="carousel-caption d-none d-md-block">
                          <h3>Breakfast Recipes</h3>
                          <p>to help you start your day</p>
                        </div>
                      </div>  
                    </div>
                    <div className="container" style={{position: 'absolute', top: 200, left: 0, right: 0, margin: '0 auto', width: '40%', minWidth: 250}}>
                      <form className="navbar-form" role="search">
                        <div className="input-group add-on">
                          <input className="form-control" placeholder="Find a Recipe" name="srch-term" id="srch-term" type="text" />
                          <div className="input-group-btn">
                            <button className="btn btn-default" type="submit"><i className="fa fa-search" aria-hidden="true" /></button>
                          </div>
                        </div>
                      </form>
                      <div className="container text-center">
                        <Link to='/signin' type="button" className="btn btn-default mr-3" style={{width: 150, marginTop: 10}}>LOGIN</Link>
                        <Link to ='/signup' type="button" className="btn btn-default" style={{width: 150, marginTop: 10}}>REGISTER</Link>
                      </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true" />
                      <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true" />
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                </section>
                <section className="container-fluid row no-gutters justify-content-between text-center" style={{backgroundColor: '#eee'}}>
                  <div className="card card-1 col-sm-12 col-md-5 card" style={{marginTop: 20, marginBottom: 20}}>
                    <div className="card-body">
                      <h2 className="card-subtitle text-muted">TOP FAVORITES</h2>
                    </div>
                    <img className="img-fluid mx-auto" src="assets/image/image10.jpeg" alt="Photo of sunset" />
                    <p className="card-text text-center" style={{color: 'rgba(73, 67, 67, 0.9)'}}>TAKE A SURVEY OF OUR ALL TIME FAVORITE RECIPES.</p>
                  </div>
                  <div className="card card-1 col-sm-12 col-md-5 card" style={{marginTop: 20, marginBottom: 20}}>
                    <div className="card-body">
                      <h2 className="card-subtitle text-muted">TOP VOTED</h2>
                    </div>
                    <img className="img-fluid mx-auto" src="assets/image/image5.jpeg" alt="Photo of sunset" />
                    <p className="card-text text-center" style={{color: 'rgba(73, 67, 67, 0.9)'}}>CHECKOUT THE RECIPES WITH THE MOST UPVOTES.</p>
                  </div>
                </section>
                <Footer/>
              </div>
       );
     }
  }