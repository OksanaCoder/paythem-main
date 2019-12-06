const initialState = {
  loaded: false,
  loading: false,
  data: [],
};

export default function games(params = '') {
  return (state = initialState, action = {}) => {
    switch (action.type) {
      case `game/${params}/REQUEST`:
        return {
          ...state,
          loading: true,
          loaded: false,
        };
      case `game/${params}/SUCCESS`:
        return {
          ...state,
          loading: false,
          loaded: true,
          data: action.payload,
        };
      case `game/${params}/FAILURE`:
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
