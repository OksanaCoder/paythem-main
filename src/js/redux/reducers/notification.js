import uuidv5 from 'uuid';

const initialState = {
  data: [],
};

export default function notification(params = '') {
  return (state = initialState, action = {}) => {
    switch (action.type) {
      case `notifications/${params}/ADD`:
        return {
          ...state,
          data: [{ ...action.payload, id: uuidv5() }, ...state.data],
        };
      case `notifications/${params}/REMOVE`:
        return {
          ...state,
          data: state.data.filter(item => item.id !== action.payload),
        };
      default:
        return state;
    }
  };
}
