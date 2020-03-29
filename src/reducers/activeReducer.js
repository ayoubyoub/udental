import {ACTIVE_COLOR} from "../actions/types";

const activeReducer = (state = {}, action) => {
  switch (action.type) {
  case ACTIVE_COLOR:
    return {
      ...state,
      color: action.payload
    };
  default:
    return state;
  }
};

export default activeReducer;
