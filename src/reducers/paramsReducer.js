import {SET_PARAMS} from "../actions/types";

const initialState = {
  active: false,
  role: null,
  colors: {},
  langs: {}
};

const paramsReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_PARAMS:
    return {
      ...state,
      active: action.payload.active,
      role: action.payload.role,
      colors: action.payload.colors,
      langs: action.payload.langs
    };
  default:
    return state;
  }
};

export default paramsReducer;
