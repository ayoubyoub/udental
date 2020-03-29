import {GET_USER, GET_USERS} from "../actions/types";

const initialState = {};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_USER:
    return action.payload;
  default:
    return state;
  }
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_USERS:
    return action.payload;
  default:
    return state;
  }
};
