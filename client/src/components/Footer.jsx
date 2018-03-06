
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Display footer component
 * @param {null} null
 *
 * @returns {object} jsx for footer
 *
 */
const Footer = ({ isHomeScreen }) => ((
  <footer
    className={`${isHomeScreen ? '' : 'fixed-bottom'}`}
    style={{
      backgroundColor: 'rgba(73, 67, 67, 0.9)',
      maxWidth: '100%',
      height: 30
    }}
  >
    <p
      className="text-center"
      style={{
          marginBottom: 5,
          paddingTop: 5,
          color: '#fff',
          fontSize: 12
        }}
    >
          © 2017 More-Recipes
    </p>
  </footer>
));

Footer.propTypes = {
  isHomeScreen: PropTypes.bool
};

Footer.defaultProps = {
  isHomeScreen: false
};

export default Footer;
