/* eslint-disable function-paren-newline */
import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router';
import { shallow, mount } from 'enzyme';
import {
  ViewRecipesButtons
} from '../../components/ViewRecipesButtons';

describe('The ViewRecipeButtons Component', () => {
  const props = {
    recipeId: 1,
    deleteRecipe: jest.fn(),
    toggle: jest.fn(),
    modal: true
  };
  it('should mount without crashing and display update and delete buttons', () => {
    const wrapper = mount(<ViewRecipesButtons {...props} />);
    expect(wrapper.contains(
      <Link
        className="button btn btn-default update-button"
        to={`/update-recipe/${props.recipeId}`}
      > UPDATE
      </Link>
    )).toBe(true);
    expect(wrapper.contains(
      <Button
        className="button btn btn-default toggle-modal update-button delete-button"
        onClick={props.toggle}
      >DELETE
      </Button>
    )).toBe(true);
  });
  it('should call delete recipe function when delete button is clicked', () => {
    const wrapper = shallow(<ViewRecipesButtons {...props} />);

    wrapper.find('Button.delete-recipe').simulate('click');
    expect(props.deleteRecipe).toHaveBeenCalled();
  });
});
