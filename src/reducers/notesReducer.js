import {GET_NOTES} from "../actions/types";

const initialState = {};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_NOTES:
    return action.payload;
  default:
    return state;
  }
};

export default notesReducer;
