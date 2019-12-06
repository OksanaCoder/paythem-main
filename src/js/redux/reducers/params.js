const initialState = {
  loaded: false,
  loading: false,
  data: [],
};

export default function params(param = '') {
  return (state = initialState, action = {}) => {
    switch (action.type) {
      case `params/${param}/REQUEST`:
        return {
          ...state,
          loading: true,
          loaded: false,
        };
      case `params/${param}/SUCCESS`:
        return {
          ...state,
          loading: false,
          loaded: true,
          data: action.payload,
        };
      case `params/${param}/FAILURE`:
        return {
          ...state,
          loading: false,
          loaded: false,
        };
      default:
        return state;
    }
  };
}
