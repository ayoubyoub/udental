import {GET_MESSAGES, GET_PRIVATE_MESSAGES} from "../actions/types";

const initialState = {};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_MESSAGES:
    return action.payload;
  default:
    return state;
  }
};

export const privateMessagesReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_PRIVATE_MESSAGES:
    return action.payload;
  default:
    return state;
  }
};
