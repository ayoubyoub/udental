import {GET_CHANNELS} from "../actions/types";

const initialState = {};

const channelsReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_CHANNELS:
    return action.payload;
  default:
    return state;
  }
};

export default channelsReducer;
