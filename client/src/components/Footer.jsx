
import React from 'react';
/**
 * Display footer component
 * @param {null} null
 *
 * @returns {object} jsx for footer
 *
 */
const Footer = () => ((
  <footer
    className="fixed-bottom"
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

export default Footer;
