import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import { useTranslation } from 'react-i18next';
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
    const [titleKey, setTitleKey] = useState<string>('');
    const location = useLocation();

    useEffect(() => {
        setTitleKey(getTitleKey(location.pathname));
    }, [location])

    return (
        <div style={{display: "flex"}}>
            <span style={{width: "100%"}}>{t(titleKey)}</span>
        </div>
    );
}