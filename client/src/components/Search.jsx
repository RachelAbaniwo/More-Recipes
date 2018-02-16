import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateSearchQuery } from './../store/actions/recipes';


/**
 * Mounts search bar on navbar
 * @function
 *
 * @param {object} props
 * @returns {object} jsx search bar
 */
const Search = (props) => {
  return (
    <form
      className="form-inline my-2 my-lg-0"
      onSubmit={
        (event) => {
          event.preventDefault();
          props.router.push('/recipes');
        }
      }
    >
      <input
        onChange={
          (event) => {
            props.updateSearchQuery(event.target.value);
          }
        }
        value={props.searchQuery}
        className="form-control mr-sm-2"
        type="search"
        placeholder="Find a Recipe"
        aria-label="Search"
      />
    </form>
  );
};

Search.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  updateSearchQuery: PropTypes.func.isRequired,
};
/**
 * Map state to props
 * @param {object} state
 *
 * @returns {object} search query passed as props
 */
const mapStateToProps = state =>
  ({ searchQuery: state.search.query });

/**
* Map dispatch to props
* @param {object} dispatch
*
* @returns {object} object to be passed as props to component
*/
const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateSearchQuery }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Search);

