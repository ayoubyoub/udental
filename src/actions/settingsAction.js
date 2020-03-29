import {has, orderBy} from "lodash";
import {GET_SETTINGS, SETTINGS_STATUS} from "./types";
import {dbSettings} from "../utils/firebase";

export const getSettings = () => (dispatch) => {
  dispatch({
    type: SETTINGS_STATUS,
    payload: true
  });
  dbSettings.on("value", (snapshot) => {
    const civility = has(snapshot.val(), "civility") ? orderBy(snapshot.val().civility, ["id"], ["asc"]) : null;
    const sexe = has(snapshot.val(), "sexe") ? orderBy(snapshot.val().sexe, ["id"], ["asc"]) : null;
    const villes = has(snapshot.val(), "villes") ? orderBy(snapshot.val().villes, ["id"], ["asc"]) : null;
    const relations = has(snapshot.val(), "relations") ? orderBy(snapshot.val().relations, ["id"], ["asc"]) : null;
    const situations = has(snapshot.val(), "situations") ? orderBy(snapshot.val().situations, ["id"], ["asc"]) : null;
    const jobs = has(snapshot.val(), "jobs") ? orderBy(snapshot.val().jobs, ["id"], ["asc"]) : null;
    const assurances = has(snapshot.val(), "assurances") ? orderBy(snapshot.val().assurances, ["id"], ["asc"]) : null;
    const languages = has(snapshot.val(), "languages") ? snapshot.val().languages : null;
    const general = has(snapshot.val(), "general") ? snapshot.val().general : null;
    dispatch({
      type: GET_SETTINGS,
      payload: {
        civility,
        sexe,
        villes,
        relations,
        situations,
        jobs,
        assurances,
        languages,
        general
      }
    });
    dispatch({
      type: SETTINGS_STATUS,
      payload: false
    });
  });
};

export const saveSetting = (id, setting) => () => dbSettings.child(id).update(setting);

export const labelSetting = (id, setting, label) => () => dbSettings
  .child(setting)
  .child(id)
  .update(label);

export const activeSetting = (id, setting, active) => () => dbSettings
  .child(setting)
  .child(id)
  .update(active);

export const deleteSetting = (setting, id) => () => dbSettings
  .child(setting)
  .child(id)
  .remove();

export const generalSetting = (setting) => () => dbSettings.child("general").update(setting);
