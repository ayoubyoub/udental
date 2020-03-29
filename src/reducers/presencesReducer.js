import {GET_PRESENCES} from "../actions/types";

const presencesReducer = (state = {}, action) => {
  switch (action.type) {
  case GET_PRESENCES:
    return action.payload;
  default:
    return state;
  }
};

export default presencesReducer;
