import { useTranslation } from 'react-i18next';
import dayjs from "dayjs";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {ImageListItem, ListItemText, MenuItem} from "@mui/material";
import './LanguageSelector.css';
import {useState} from "react";
import {toaster} from "./Toaster.ts";
// TODO require('dayjs/locale/de')

export default function LanguageSelector() {

    const getStoredLanguage = (): string => {
        const l = localStorage.getItem("language");
        return l ?? "en";
    }

    const [language, setLanguage] = useState<string>(getStoredLanguage());

    const { i18n } = useTranslation();

    const handleChange = (event: SelectChangeEvent) => {
        const l = event.target.value
        setLanguage(l);
        dayjs.locale(l)

        i18n.changeLanguage(l)
            .catch((err) => toaster("Error during language change: " + err.message, 'error'));

        localStorage.setItem("language", l);
    };

    return (
        <Select
            className="LanguageSelector"
            color="primary"
            value={language}
            variant={"outlined"}
            onChange={handleChange}
        >
            <MenuItem value="en" className="LanguageSelector Item">
                <ImageListItem>
                    <img src="flag-us.svg" style={{height: "unset", width: "unset"}} alt='us'/>
                </ImageListItem>
                <ListItemText primary="en"/>
            </MenuItem>
            <MenuItem value="de" className="LanguageSelector Item">
                <ImageListItem>
                    <img src="flag-de.svg" style={{height: "unset", width: "unset"}} alt='de'/>
                </ImageListItem>
                <ListItemText primary="de"/>
            </MenuItem>

        </Select>
    );

}