import i18n from "i18next";
import {reactI18nextModule} from "react-i18next";
// My language resources
const resources = {
  EN: {translation: {}},
  FR: {translation: {}},
  AR: {translation: {}},
  ES: {translation: {}},
  DE: {translation: {}},
  TR: {translation: {}},
  BR: {translation: {}},
  RU: {translation: {}}
};
// Init
i18n.use(reactI18nextModule).init({
  resources,
  lng: "FR",
  keySeparator: false,
  interpolation: {escapeValue: false}
});
// Export for all others components
export default i18n;
