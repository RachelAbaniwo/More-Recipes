
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Display footer component
 * @function Footer
 *
 * @param {object} props
 *
 * @returns {object} jsx for footer
 *
 */
const Footer = ({ isHomeScreen }) => ((
  <footer
    className={`${isHomeScreen ? '' : 'fixed-bottom'}`}
    id="footer"
  >
    <p
      className="text-center"
      id="p-footer"
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
