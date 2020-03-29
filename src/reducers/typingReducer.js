import {GET_TYPING} from "../actions/types";

const initialState = {};

const typingReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_TYPING:
    return action.payload;
  default:
    return state;
  }
};

export default typingReducer;
