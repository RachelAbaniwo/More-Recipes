import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalBody } from 'reactstrap';
import { Link } from 'react-router';

/**
 * Displays a view-recipes button
 * @function ViewRecipesButtons
 *
 * @param {object} props
 *
 * @returns {jsx} jsx for single recipe
 */
export const ViewRecipesButtons = props =>
  (
    <span>
      <Link
        className="button btn btn-default update-button"
        to={`/update-recipe/${props.recipeId}`}
      > UPDATE
      </Link>
      &nbsp;&nbsp;
      <Button
        className="button btn btn-default toggle-modal update-button delete-button"
        onClick={props.toggle}
      >DELETE
      </Button>
      <Modal
        className="modal-open"
        isOpen={props.modal}
        toggle={props.toggle}
      >
        <ModalBody>
          <h4>CONFIRM</h4>
          <h5>Are you sure you want to delete this recipe?</h5>
          <Button
            className="button btn btn-default delete-recipe update-button pull-right"
            onClick={props.deleteRecipe}
          >DELETE
          </Button>
          <Button
            className="button btn btn-default close-modal update-button pull-right mr-2"
            onClick={props.toggle}
          >CANCEL
          </Button>
        </ModalBody>
      </Modal>
    </span>
  );

ViewRecipesButtons.propTypes = {
  recipeId: PropTypes.number.isRequired,
  toggle: PropTypes.func.isRequired,
  modal: PropTypes.bool.isRequired,
  deleteRecipe: PropTypes.func.isRequired
};

export default ViewRecipesButtons;
