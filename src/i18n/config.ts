import i18n from 'i18next';
import germanBaseTrans from './locales/locale-de.json';
import englishBaseTrans from './locales/locale-en.json';
import { initReactI18next } from 'react-i18next';
import dayjs from "dayjs";
import 'dayjs/locale/de';

let language = localStorage.getItem("rb.language")
language = language ?? "en";

const germanTrans = {
    ...germanBaseTrans,
};

const englishTrans = {
    ...englishBaseTrans,
};

i18n.use(initReactI18next).init({
    fallbackLng: 'en',
    lng: language,
    ns: ['translations'],
    defaultNS: 'translations',
    resources: {
        de: {
            translations: germanTrans
        },
        en: {
            translations: englishTrans
        }
    }
})
    .then(() => dayjs.locale(language))
    .catch((reason) => console.log(reason));

i18n.languages = ['en', 'de'];

export default i18n;