import {SET_LANG} from "./types";

export const setLang = (lang) => ({
  type: SET_LANG,
  payload: {currentLang: lang}
});
