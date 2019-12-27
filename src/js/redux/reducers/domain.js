const initialState = {
  loaded: false,
  loading: false,
  data: [],
};

export default function domain(params = '') {
  return (state = initialState, action = {}) => {
    switch (action.type) {
      case `domain/${params}/REQUEST`:
        return {
          ...state,
          loading: true,
          loaded: false,
        };
      case `domain/${params}/SUCCESS`:
        return {
          ...state,
          loading: false,
          loaded: true,
          data: action.payload,
        };
      case `domain/${params}/FAILURE`:
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
