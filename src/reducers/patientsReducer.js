import {GET_PATIENTS} from "../actions/types";

const initialState = {};

const patientsReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_PATIENTS:
    return action.payload;
  default:
    return state;
  }
};

export default patientsReducer;
