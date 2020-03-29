import {GET_SETTINGS} from "../actions/types";

const initialState = {
  civility: null,
  sexe: null,
  villes: null,
  relations: null,
  situations: null,
  jobs: null,
  assurances: null,
  languages: null,
  general: null
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_SETTINGS:
    return {
      ...state,
      civility: action.payload.civility,
      sexe: action.payload.sexe,
      villes: action.payload.villes,
      relations: action.payload.relations,
      situations: action.payload.situations,
      jobs: action.payload.jobs,
      assurances: action.payload.assurances,
      languages: action.payload.languages,
      general: action.payload.general
    };
  default:
    return state;
  }
};

export default settingsReducer;
