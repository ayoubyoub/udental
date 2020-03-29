import {GET_CONNECTED} from "../actions/types";

const connectedReducer = (state = {}, action) => {
  switch (action.type) {
  case GET_CONNECTED:
    return action.payload;
  default:
    return state;
  }
};

export default connectedReducer;
