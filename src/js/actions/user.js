import * as type from 'constants/user';

export const register = data => ({
  types: [type.REGISTER_REQUEST, type.REGISTER_SUCCESS, type.REGISTER_FAILURE],
  payload: {
    request: {
      url: '/user/register',
      method: 'POST',
      data,
    },
  },
});

export const login = data => ({
  types: [type.LOGING_REQUEST, type.LOGING_SUCCESS, type.LOGING_FAILURE],
  payload: {
    request: {
      url: '/user/login',
      method: 'POST',
      data,
    },
  },
});

export const isLoggedIn = user => ({
  type: type.IS_LOGGED_IN_SUCCESS,
  user,
});

export const loadProfile = () => ({
  types: [type.GET_PROFILE_REQUEST, type.GET_PROFILE_SUCCESS, type.GET_PROFILE_FAILURE],
  payload: {
    request: {
      url: '/user/profile',
      method: 'GET',
    },
  },
});

export const forgotPassword = email => ({
  types: [type.FORGOT_PASSWORD_REQUEST, type.FORGOT_PASSWORD_SUCCESS, type.FORGOT_PASSWORD_FAILURE],
  payload: {
    request: {
      url: '/user/forgot',
      method: 'POST',
      data: email,
    },
  },
});

export const resetPassword = data => ({
  types: [type.RESET_PASSWORD_REQUEST, type.RESET_PASSWORD_SUCCESS, type.RESET_PASSWORD_FAILURE],
  payload: {
    request: {
      url: '/user/reset',
      method: 'PUT',
      data,
    },
  },
});

export const updateProfile = data => ({
  types: [type.UPDATE_PROFILE_REQUEST, type.UPDATE_PROFILE_SUCCESS, type.UPDATE_PROFILE_FAILURE],
  payload: {
    request: {
      url: '/user/profile',
      method: 'PUT',
      data,
    },
  },
});

export const logout = () => ({
  type: type.LOGOUT_SUCCESS,
});
