import PropTypes from 'prop-types';
import React from 'react';

const MethodList =  ({ method }) => {
  method = method.trim();
  if (method[method.length - 1] === '.') {
    method = method.substr(0, method.length - 1);
  }
  let methodArray = method.split(".");
  let methodList = methodArray.map((method, index) => <li style={{fontSize: '18px'}} key={index}>{method}. </li>);
   return(
    <ul className="text-justify" style={{paddingBottom: 50}}>
    {methodList}
    </ul>
   );
 } 

MethodList.propTypes = {
  method: PropTypes.string.isRequired
};

export default MethodList;
