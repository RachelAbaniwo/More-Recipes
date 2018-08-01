import React from 'react';

/**
 * Displays PageNotFound component
 * @function
 *
 * @returns {object} jsx object
 */
export const PageNotFound = () =>
  (
    <div>
      <div
        className="container justify-content-center text-center"
        style={{
            backgroundColor: 'rgba(73, 67, 67, 0.679)',
            position: 'absolute',
            paddingTop: 50,
            paddingBottom: 80,
            top: 80,
            left: 0,
            right: 0,
            margin: '80px auto',
            minWidth: 'auto',
            boxShadow: '0px 2px 2px rgba(27, 255, 164, 0.967)'
        }}
      >
        <h1
          className="text-center"
          id="page-not-found-title"
          style={{
          fontFamily: 'Berkshire Swash',
          color: 'lightGrey',
          fontSize: 150
        }}
        >404

        </h1>
        <h3
          id="lost-your-way"
          style={{
            color: 'lightGrey'
            }}
        >
            Hey! it seems you lost your way
        </h3>
        <h3
          style={{
            color: 'lightGrey'
            }}
        >
        Page not found
        </h3>
      </div>
    </div>
  );

export default PageNotFound;

