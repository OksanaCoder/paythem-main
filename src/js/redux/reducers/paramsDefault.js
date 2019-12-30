import { PARAMS_DEFAULT } from 'config';

const initialState = {
  data: PARAMS_DEFAULT,
  errors: {},
};

export default function paramsDefault(param = '') {
  return (state = initialState, action = {}) => {
    switch (action.type) {
      case `paramsDefault/${param}/UPDATE`:
        return {
          ...state,
          data: action.payload,
          errors: action.errors,
        };
      default:
        return state;
    }
  };
}
