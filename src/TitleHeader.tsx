import * as React from "react";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {Dialog, DialogContent, DialogContentText, DialogTitle, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import './TitleHeader.css';

const getTitleKey = (path: string): string => {
    switch (path) {
        case '':
        case '/': return 'app.title';
        case '/chart': return 'statistics';
        case '/game': return 'enter-game';
        case '/scan-game': return 'import-game';
        case '/games': return 'games';
        case '/my-profile': return 'my-account';
        case '/about': return 'about';
        default: return 'app.title';
    }
}

export default function TitleHeader() {
    const { t } = useTranslation();
    const theme = useTheme();
    const [titleKey, setTitleKey] = useState<string>('');
    const [open, setOpen] = useState(false);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const location = useLocation();

    useEffect(() => {
        setTitleKey(getTitleKey(location.pathname));
    }, [location])

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenPlaystore = () => {
        window.open("https://play.google.com/", '_blank');
    }

    const handleOpenAppleAppStore = () => {
        window.open("https://apps.apple.com/de/app/apple-store/", '_blank');
    }

    return (
        <React.Fragment>
            <div style={{display: "flex"}}>
                <span style={{width: "100%"}}>{t(titleKey)}</span>
                {/*<Chip color="secondary" label={t("get-the-app")} onClick={handleClickOpen}/>*/}
            </div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {t("download-smartphone-app")}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {/*<span>Hi. We are planning to provide in the future an app for the most popular smartphones to make it easier to record bowling matches.</span>*/}
                        <div className="download-app-button">
                            <div style={{backgroundImage: "url(assets/download-iphone-app.webp"}} onClick={handleOpenAppleAppStore}/>
                            <div style={{backgroundImage: "url(assets/download-android-app.webp"}} onClick={handleOpenPlaystore}/>
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}