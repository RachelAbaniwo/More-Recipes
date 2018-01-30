import React from 'react';
import { Link } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import food9 from '../../assets/image/food-9.jpg';
import food20 from '../../assets/image/food-20.jpg';
import food23 from '../../assets/image/food-23.jpg';
import image10 from '../../assets/image/image10.jpeg';
import image5 from '../../assets/image/image5.jpeg';
import '../../assets/css/style.css';

/**
 * Displays home page component
 * @function
 *
 * @returns {object} jsx object
 */
const Home = () => ((
  <div style={{ backgroundColor: '#eee' }}>
    <Navbar />
    <section id="slider">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-interval={2000}
        data-ride="carousel"
      >
        <div className="carousel-inner fullHeight">
          <div className="carousel-item active">
            <img className="d-block w-100" src={food9} alt="First slide" />
            <div className="carousel-caption d-none d-md-block" >
              <h3 style={{ color: 'white' }}>Check Out Our All Time Favorites</h3>
              <p style={{ color: 'white' }}>from around the world</p>
            </div>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={food20} alt="Third slide" />
            <div className="carousel-caption d-none d-md-block">
              <h3 style={{ color: 'white' }}>Amazing Desserts</h3>
            </div>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={food23} alt="Third slide" />
            <div className="carousel-caption d-none d-md-block">
              <h3 style={{ color: 'white' }}>Breakfast Recipes</h3>
              <p style={{ color: 'white' }}>to help you start your day</p>
            </div>
          </div>
        </div>
        <div
          className="container"
          style={{
            position: 'absolute',
            top: 250,
            left: 0,
            right: 0,
            margin: '0 auto',
            width: '40%',
            minWidth: 250
          }}
        >
          <form className="navbar-form" role="search">
            <div className="input-group add-on">
              <input
                className="form-control"
                placeholder="Search Recipes"
                name="srch-term"
                id="srch-term"
                type="text"
              />

            </div>
          </form>
          <div className="container text-center">
            <Link
              to="/signin"
              className="button btn btn-default link-button mr-2"
              style={{ width: 150, marginTop: 10 }}
            >LOGIN
            </Link>
            <Link
              to="/signup"
              className="button btn btn-default link-button mr-2"
              style={{ width: 150, marginTop: 10 }}
            >REGISTER
            </Link>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    </section>
    <section
      className="container-fluid row no-gutters justify-content-between text-center"
      id="popular"
      style={{ backgroundColor: '#eee', marginTop: 50, marginBottom: 50 }}
    >
      <div className="card card-1 col-sm-12 col-md-5 card my-3" >
        <div className="card-body">
          <h2 className="card-subtitle text-muted">TOP FAVORITES</h2>
        </div>
        <img
          className="img-fluid mx-auto"
          src={image10}
          alt="sunset"
        />
        <p
          className="card-text text-center"
          style={{ color: 'rgba(73, 67, 67, 0.9)' }}
        >Take a survey of our all time favorite recipes.
        </p>
      </div>
      <div className="card card-1 col-sm-12 col-md-5 card my-3">
        <div className="card-body">
          <h2 className="card-subtitle text-muted">TOP VOTED</h2>
        </div>
        <img className="img-fluid mx-auto" src={image5} alt="sunset" />
        <p
          className="card-text text-center"
          style={{ color: 'rgba(73, 67, 67, 0.9)' }}
        >Checkout the recipes with the most upvotes.
        </p>
      </div>
    </section>
    <Footer />
  </div>
));

export default Home;
