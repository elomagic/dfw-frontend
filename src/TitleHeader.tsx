import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import { useTranslation } from 'react-i18next';

const getTitleKey = (path: string): string => {
    switch (path) {
        case '/components': return 'components';
        case '/license-issues': return 'license-issues';
        case '/vulnerabilities': return 'vulnerabilities';

        case '/admin-licenses': return 'admin-licenses';
        case '/admin-vulnerabilities': return 'admin-vulnerabilities';
        case '/admin-repositories': return 'admin-repositories';
        case '/admin-accounts': return 'admin-accounts';

        case '/my-account': return 'my-account';
        case '/change-password': return 'change-password';
        case '/reset-password': return 'reset-password';

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
        <span>{t(titleKey)}</span>
    );
}