import PropTypes from 'prop-types';
import React from 'react';

/**
 * Display method component
 * @function MethodList
 *
 * @param {object} props
 *
 * @returns {jsx} method list jsx
 */
export const MethodList = ({ method }) => {
  method = method.trim();
  if (method[method.length - 1] === '.') {
    method = method.substr(0, method.length - 1);
  }
  const methodArray = method.split('.');
  const methodList = methodArray.map((eachMethod, index) => (
    <li
      id="ingredient-style"
      //   eslint-disable-next-line
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
