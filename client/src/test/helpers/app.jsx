import axios from 'axios';
import { ifAuthenticated, ifNotAuthenticated, setAxios, unsetAxios } from '../../helpers/app';

describe('the ifAuthenticated function', () => {
  it('should call router replace if user is authenticated', () => {
    localStorage.setItem('authUser', { user: {} });
    const replace = jest.fn();

    ifAuthenticated({}, replace);
    expect(replace).toHaveBeenCalledWith({ pathname: '/' });
  });
});

describe('the setAxios function', () => {
  it('should set authUser token as axios header', () => {
    const token = 'SOME_TOKEN';
    localStorage.setItem('authUser', JSON.stringify({ user: {}, token }));

    setAxios();
    expect(axios.defaults.headers.common.token).toBe(token);
  });
});

describe('the unsetAxios function', () => {
  it('should delete authUser token as axios header', () => {
    const token = 'SOME_TOKEN';
    localStorage.setItem('authUser', JSON.stringify({ user: {}, token }));

    setAxios();
    expect(axios.defaults.headers.common.token).toBe(token);

    unsetAxios();
    expect(axios.defaults.headers.common.token).toBeFalsy();
  });
});

describe('the ifNotAuthenticated function', () => {
  it('should call router replace if user is authenticated', () => {
    localStorage.setItem('authUser', undefined);
    const replace = jest.fn();

    ifNotAuthenticated({}, replace);
    expect(replace).toHaveBeenCalledWith({ pathname: '/signin' });
  });
});
