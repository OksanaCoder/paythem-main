import { isEmpty } from 'lodash';

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function authentication(params = '') {
  return (state = initialState, action = {}) => {
    switch (action.type) {
      case `authentication/${params}/SUCCESS`:
        return {
          ...state,
          isAuthenticated: !isEmpty(action.user),
          user: action.user,
        };
      default:
        return state;
    }
  };
}
