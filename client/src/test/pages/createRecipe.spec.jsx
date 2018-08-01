/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import moxios from 'moxios';
import { mount } from 'enzyme';
import { CreateRecipeScreen, mapStateToProps, mapDispatchToProps } from '../../pages/CreateRecipe';

import recipeMock from '../mockData/recipeMock';

describe('The CreateRecipeScreen page', () => {
  const props = {
    recipe: recipeMock,
    router: { push: jest.fn() },
    imageFile: { preview: 'image-link' },
    routeParams: { recipeId: `${recipeMock.id}` },
    /**
     * The createRecipe mock
     * @returns {object} mock recipe
     */
    createRecipe() {
      return recipeMock;
    },
    setImageUrl: jest.fn(),
    updateRecipe: jest.fn()
  };

  const failedProps = {
    ...props,
    /**
     * Sign in user mock
     * @returns {promise} promise
     */
    createRecipe() {
      const error = new Error();
      error.response = {
        status: 400,
        data: { errors: ['Wrong input'] }
      };

      throw error;
    }
  };

  const failedPropsWith500 = {
    ...props,
    /**
     * Sign in user mock
     * @returns {promise} promise
     */
    createRecipe() {
      const error = new Error();
      error.response = {
        status: 500,
        data: { errors: ['Wrong input'] }
      };

      throw error;
    }
  };

  const editingPropsWithNoUploadedImage = {
    ...props,
    imageFile: null
  };

  const creatingProps = {
    ...props,
    recipe: null,
    routeParams: { recipeId: null }
  };
  const creatingPropsWithoutImage = {
    ...props,
    recipe: null,
    routeParams: { recipeId: null },
    imageFile: null
  };

  const updatingProps = {
    ...props,
    recipe: null
  };

  it('should set state into editing mode if recipe is passed', () => {
    const wrapper = mount(<CreateRecipeScreen {...props} />);
    expect(wrapper.state().editing).toBe(true);
    expect(wrapper.state().name).toBe(recipeMock.name);
    expect(wrapper
      .contains(<h4 className="card-header text-center title">UPDATE RECIPE</h4>))
      .toBe(true);

    expect(wrapper.find('ImageFile').props().imageUrl)
      .toBe(props.recipe.recipeImage);

    const button = wrapper.find('button');

    expect(button.props().onClick)
      .toBe(wrapper.instance().updateRecipe);
    expect(wrapper
      .contains(<button
        className="btn btn-default"
        id="create-recipe-button"
        type="button"
        style={{
          marginLeft: 10, marginTop: 20, marginBottom: 20, fontWeight: 900
        }}
        onClick={wrapper.instance().updateRecipe}
        disabled={false}
      >UPDATE RECIPE</button>))
      .toBe(true);
  });

  it('should set state into creating mode if recipe is not passed', () => {
    const wrapper = mount(<CreateRecipeScreen {...creatingProps} />);
    expect(wrapper.state().editing).toBe(false);
    expect(wrapper.state().name).toBe('');
    expect(wrapper
      .contains(<h4 className="card-header text-center title">CREATE RECIPE</h4>))
      .toBe(true);

    expect(wrapper.find('ImageFile').props().imageUrl)
      .toBe(null);

    const button = wrapper.find('button');

    expect(button.props().onClick)
      .toBe(wrapper.instance().handleSubmit);
    expect(wrapper
      .contains(<button
        className="btn btn-default"
        id="create-recipe-button"
        type="button"
        style={{
          marginLeft: 10, marginTop: 20, marginBottom: 20, fontWeight: 900
        }}
        onClick={wrapper.instance().handleSubmit}
        disabled={false}
      >ADD RECIPE</button>))
      .toBe(true);
  });
  describe('The handleValidation function ', () => {
    it(
      'should set validation errors on state if wrong input is passed when creating a recipe',
      () => {
        const creatingPropsWithNoUploadedImage = {
          ...creatingProps,
          imageFile: null,
          imageUrl: null
        };
        const wrapper = mount(<CreateRecipeScreen {...creatingPropsWithNoUploadedImage} />);

        wrapper.instance().handleValidation();
        expect(wrapper.state().errors).toEqual([
          'Recipe name is required',
          'Recipe category is required',
          'Recipe description is required',
          'Recipe ingredients are required',
          'Preparation method is required'
        ]);
      }
    );
    it(
      'should set validation errors on state is wrong input is passed when updating a recipe',
      () => {
        const wrapper = mount(<CreateRecipeScreen {...updatingProps} />);

        wrapper.instance().handleValidation();
        expect(wrapper.state().errors).toEqual([
          'Recipe name is required',
          'Recipe category is required',
          'Recipe description is required',
          'Recipe ingredients are required',
          'Preparation method is required'
        ]);
      }
    );
  });

  describe('the handleChange function', () => {
    it('should set state when input changes', () => {
      const wrapper = mount(<CreateRecipeScreen {...creatingProps} />);

      wrapper.find('input[name="name"]').simulate('change', {
        target: { value: 'name of recipe', name: 'name' }
      });
      wrapper.find('textarea[name="description"]').simulate('change', {
        target: { value: 'description of recipe', name: 'description' }
      });
      wrapper.find('textarea[name="method"]').simulate('change', {
        target: { value: 'method of recipe', name: 'method' }
      });
      wrapper.find('textarea[name="ingredients"]').simulate('change', {
        target: { value: 'ingredients of recipe', name: 'ingredients' }
      });
      wrapper.find('input[name="category"]').simulate('change', {
        target: { value: 'category of recipe', name: 'category' }
      });

      expect(wrapper.state().name).toBe('name of recipe');
      expect(wrapper.state().method).toBe('method of recipe');
      expect(wrapper.state().category).toBe('category of recipe');
      expect(wrapper.state().ingredients).toBe('ingredients of recipe');
      expect(wrapper.state().description).toBe('description of recipe');
    });
  });

  describe('the handleSubmit function ', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());
    it('should upload image and create the recipe', (done) => {
      const spy = jest.spyOn(creatingProps, 'createRecipe');
      localStorage
        .setItem('authUser', JSON.stringify({ user: {}, token: 'SOME TOKEN' }));
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            secure_url: 'https://cloudinary.com/recipe_image.jpg'
          }
        });
      });

      const wrapper = mount(<CreateRecipeScreen {...creatingProps} />);

      wrapper.setState({
        name: recipeMock.name,
        description: recipeMock.description,
        category: recipeMock.category,
        method: recipeMock.method,
        ingredients: 'beans'
      });
      wrapper.instance().handleSubmit().then(() => {
        expect(spy).toHaveBeenCalledWith({
          name: recipeMock.name,
          description: recipeMock.description,
          category: recipeMock.category,
          method: recipeMock.method,
          ingredients: 'beans',
          imageUrl: 'https://cloudinary.com/recipe_image.jpg',
          isLoading: true,
          errors: [],
          editing: false
        });
        done();
      });
    });
    it('should use default image and create the recipe if user doesn\'t upload an image', (done) => {
      const spy = jest.spyOn(creatingPropsWithoutImage, 'createRecipe');
      localStorage
        .setItem('authUser', JSON.stringify({ user: {}, token: 'SOME TOKEN' }));

      const wrapper = mount(<CreateRecipeScreen {...creatingPropsWithoutImage} />);

      wrapper.setState({
        name: recipeMock.name,
        description: recipeMock.description,
        category: recipeMock.category,
        method: recipeMock.method,
        ingredients: 'beans'
      });
      wrapper.instance().handleSubmit().then(() => {
        expect(spy).toHaveBeenCalledWith({
          name: recipeMock.name,
          description: recipeMock.description,
          category: recipeMock.category,
          method: recipeMock.method,
          ingredients: 'beans',
          imageUrl: 'http://res.cloudinary.com/rachelabaniwo/image/upload/v1520967994/recipe-placeholder_tqgdh1.jpg',
          isLoading: true,
          errors: [],
          editing: false
        });
        done();
      });
    });
    it('should display errors if errors are returned from the server with 400 status code', (done) => {
      localStorage
        .setItem('authUser', JSON.stringify({ user: {}, token: 'SOME TOKEN' }));
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            secure_url: 'https://cloudinary.com/recipe_image.jpg'
          }
        });
      });

      const wrapper = mount(<CreateRecipeScreen {...failedProps} />);
      wrapper.setState({
        name: recipeMock.name,
        description: recipeMock.description,
        category: recipeMock.category,
        method: recipeMock.method,
        ingredients: 'beans'
      });

      wrapper.instance().handleSubmit().then(() => {
        expect(wrapper.state().errors).toEqual(['Wrong input']);
        done();
      });
    });
    it('should display errors if errors are returned from the server with any other status code', (done) => {
      localStorage
        .setItem('authUser', JSON.stringify({ user: {}, token: 'SOME TOKEN' }));
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            secure_url: 'https://cloudinary.com/recipe_image.jpg'
          }
        });
      });

      const wrapper = mount(<CreateRecipeScreen {...failedPropsWith500} />);
      wrapper.setState({
        name: recipeMock.name,
        description: recipeMock.description,
        category: recipeMock.category,
        method: recipeMock.method,
        ingredients: 'beans'
      });

      wrapper.instance().handleSubmit().then(() => {
        expect(wrapper.state().errors).toEqual(['Something went wrong, try again after some time']);
        done();
      });
    });
    it('should stop execution if there are validation errors', () => {
      const wrapper = mount(<CreateRecipeScreen {...creatingProps} />);

      wrapper.instance().handleSubmit();
      expect(wrapper.state().errors).toEqual([
        'Recipe name is required',
        'Recipe category is required',
        'Recipe description is required',
        'Recipe ingredients are required',
        'Preparation method is required'
      ]);
    });
  });

  describe('the updateRecipe function ', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());
    it('should upload image and update the recipe if user uploaded another image', (done) => {
      const spy = jest.spyOn(creatingProps, 'updateRecipe');
      localStorage
        .setItem('authUser', JSON.stringify({ user: {}, token: 'SOME TOKEN' }));
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            secure_url: 'https://cloudinary.com/recipe_image.jpg'
          }
        });
      });

      const wrapper = mount(<CreateRecipeScreen {...props} />);

      wrapper.setState({
        name: recipeMock.name,
        description: recipeMock.description,
        category: recipeMock.category,
        method: recipeMock.method,
        ingredients: 'beans'
      });
      wrapper.instance().updateRecipe().then(() => {
        expect(spy).toHaveBeenCalledWith(wrapper.state(), props.recipe.id);
        done();
      });
    });
    it('should update the recipe if user did not upload another image', (done) => {
      const spy = jest.spyOn(editingPropsWithNoUploadedImage, 'updateRecipe');
      localStorage
        .setItem('authUser', JSON.stringify({ user: {}, token: 'SOME TOKEN' }));

      const wrapper = mount(<CreateRecipeScreen {...editingPropsWithNoUploadedImage} />);

      wrapper.setState({
        name: recipeMock.name,
        description: recipeMock.description,
        category: recipeMock.category,
        method: recipeMock.method,
        ingredients: 'beans'
      });
      wrapper.instance().updateRecipe().then(() => {
        expect(spy)
          .toHaveBeenCalledWith(wrapper.state(), props.recipe.id);
        done();
      });
    });
    it('should stop execution if there are validation errors', () => {
      const wrapper = mount(<CreateRecipeScreen {...updatingProps} />);

      wrapper.instance().updateRecipe();
      expect(wrapper.state().errors).toEqual([
        'Recipe name is required',
        'Recipe category is required',
        'Recipe description is required',
        'Recipe ingredients are required',
        'Preparation method is required'
      ]);
    });
  });

  describe('the uploadToCloudinary function', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());
    it('should return secure_url when called', (done) => {
      localStorage.setItem('authUser', JSON.stringify({ user: {}, token: 'SOME TOKEN' }));
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            secure_url: 'https://cloudinary.com/recipe_image.jpg'
          }
        });
      });

      const wrapper = mount(<CreateRecipeScreen {...creatingProps} />);
      wrapper.instance().uploadToCloudinary().then((response) => {
        expect(response).toBe('https://cloudinary.com/recipe_image.jpg');
        done();
      });
    });
  });
});

describe('The CreateRecipe page mapStateToProps function', () => {
  it('should update the authUser, recipe, and imageFile state', () => {
    const state = {
      recipes: {
        rows: [
          {
            id: 1
          },
          {
            id: 2
          }
        ],
        pageData: {}
      },
      authUser: { user: {}, token: '' },
      imageUpload: {
        imageFile: {
          preview: 'image.jpg'
        }
      }

    };
    const ownProps = {
      params: {
        recipeId: 1
      }
    };

    const componentProps = mapStateToProps(state, ownProps);
    expect(componentProps.authUser).toEqual({ user: {}, token: '' });
    expect(componentProps.recipe).toEqual({ id: 1 });
    expect(componentProps.imageFile).toEqual({ preview: 'image.jpg' });
  });
});

describe('The CreateRecipe page mapDispatchToProps function', () => {
  it('should return signOutUser, createRecipe, setImageUrl, updateRecipe functions', () => {
    const dispatch = jest.fn();
    const results = mapDispatchToProps(dispatch);


    expect(results.signOutUser).toBeTruthy();
    expect(typeof results.signOutUser).toBe('function');

    expect(results.createRecipe).toBeTruthy();
    expect(typeof results.createRecipe).toBe('function');

    expect(results.setImageUrl).toBeTruthy();
    expect(typeof results.setImageUrl).toBe('function');

    expect(results.updateRecipe).toBeTruthy();
    expect(typeof results.updateRecipe).toBe('function');
  });
});

