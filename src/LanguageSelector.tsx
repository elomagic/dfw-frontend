import { useTranslation } from 'react-i18next';
import dayjs from "dayjs";
import './LanguageSelector.css';
import {useState} from "react";
import {toaster} from "./Toaster.ts";
import {Select, SelectContent, SelectItem} from "./components/ui/select.tsx";
// TODO require('dayjs/locale/de')

export default function LanguageSelector() {

    const getStoredLanguage = (): string => {
        const l = localStorage.getItem("language");
        return l ?? "en";
    }

    const [language, setLanguage] = useState<string>(getStoredLanguage());

    const { i18n } = useTranslation();

    const handleChange = (l: string) => {
        setLanguage(l);
        dayjs.locale(l)

        i18n.changeLanguage(l)
            .catch((err) => toaster("Error during language change: " + err.message, 'error'));

        localStorage.setItem("language", l);
    };

    return (
        <Select
            value={language}
            onValueChange={handleChange}
        >
            <SelectContent>
                <SelectItem value={"en"}><img src="flag-us.svg" style={{height: "unset", width: "unset"}} alt='us'/>EN</SelectItem>
                <SelectItem value={"de"}><img src="flag-de.svg" style={{height: "unset", width: "unset"}} alt='de'/>DE</SelectItem>
            </SelectContent>
        </Select>
    );

}