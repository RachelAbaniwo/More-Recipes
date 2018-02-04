import PropTypes from 'prop-types';
import React from 'react';

/**
 * Display method component
 * @function
 *
 * @param {string} method
 *
 * @returns {object} jsx for component
 */
const MethodList = ({ method }) => {
  method = method.trim();
  if (method[method.length - 1] === '.') {
    method = method.substr(0, method.length - 1);
  }
  const methodArray = method.split('.');
  const methodList = methodArray.map((eachMethod, index) => (
    <li
      style={{ fontSize: '18px' }}
      key={index}
    >
      {eachMethod}.
    </li>));
  return (
    <ul className="text-justify" style={{ paddingBottom: 50 }}>
      {methodList}
    </ul>
  );
};

MethodList.propTypes = {
  method: PropTypes.string.isRequired
};

export default MethodList;
