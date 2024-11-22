import { useTranslation } from 'react-i18next';
import dayjs from "dayjs";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {ImageListItem, ListItemText, MenuItem} from "@mui/material";
import './LanguageSelector.css';
import {useState} from "react";
import {enqueueSnackbar} from "notistack";
// TODO require('dayjs/locale/de')

export const getStoredLanguage = (): string => {
    const l = localStorage.getItem("language");
    return l ?? "en";
}

export default function LanguageSelector() {

    const [language, setLanguage] = useState<string>(getStoredLanguage());

    const { i18n } = useTranslation();

    const handleChange = (event: SelectChangeEvent) => {
        const l = event.target.value
        setLanguage(l);
        dayjs.locale(l)

        i18n.changeLanguage(l)
            .catch((err) => enqueueSnackbar("Error during language change: " + err.message, { variant: 'error'} ));

        localStorage.setItem("language", l);
    };

    return (
        <Select
            className="LanguageSelector"
            color="primary"
            value={language}
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