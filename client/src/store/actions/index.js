import axios from 'axios';



export function signInUser({Username, Password}) {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(`http://localhost:4044/api/v1/users/signin`, {
        Username, Password
      });
      localStorage.setItem('authUser', JSON.stringify(response.data));

      
      return;

      dispatch ({
        type: 'SIGN_IN_USER',
        authUser: response.data
      });

      return Promise.resolve(response);
    }
    catch (error) {
      return Promise.reject(error);
    }
  };
}


export function signOutUser() {
  return async (dispatch) => {

    localStorage.removeItem(authUser);

    dispatch ({
      type: 'SIGN_OUT_USER'
    });

    return Promise.resolve();
  };
}


export function signUpUser({ Firstname, Lastname, Email, Username, Password }) {
  return async (dispatch, getState) => {
    
    try {
      const response = await axios.post(`http://localhost:4044/api/v1/users/signup`, {
        Firstname, Lastname, Email, Username, Password
      });
      localStorage.setItem('authUser', JSON.stringify(response.data));

      
      return;

      dispatch ({
        type: 'SIGN_IN_USER',
        authUser: response.data
      });

      return Promise.resolve(response);
    }
    catch (error) {
      return Promise.reject(error);
    }
  };
}