import {SET_LANG} from "../actions/types";

const initialState = {currentLang: null};

const langReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_LANG:
    return {
      ...state,
      currentLang: action.payload.currentLang
    };
  default:
    return state;
  }
};

export default langReducer;
