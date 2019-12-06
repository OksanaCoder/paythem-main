const initialState = {
  loaded: false,
  loading: false,
  data: [],
};

export default function user(params = '') {
  return (state = initialState, action = {}) => {
    switch (action.type) {
      case `user/${params}/REQUEST`:
        return {
          ...state,
          loading: true,
          loaded: false,
        };
      case `user/${params}/SUCCESS`:
        return {
          ...state,
          loading: false,
          loaded: true,
          data: action.payload,
        };
      case `user/${params}/FAILURE`:
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
