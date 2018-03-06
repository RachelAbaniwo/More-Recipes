import PropTypes from 'prop-types';

const authUserPropType = PropTypes.shape({
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    aboutMe: PropTypes.string.isRequired
  }).isRequired
});

export default authUserPropType;
