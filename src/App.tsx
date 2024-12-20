import {useState} from 'react'
import './App.css'
import {
    Box,
    CssBaseline,
    Divider,
    IconButton,
    List,
    styled,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MuiDrawer from '@mui/material/Drawer';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TitleHeader from "./TitleHeader.tsx";
import LanguageSelector from "./LanguageSelector.tsx";
import UserSessionButton from "./UserSessionButton.tsx";
import ThemeModeSelector from './ThemeModeSelector';
import AppMenuItems from "./AppMenuItems.tsx";
import {AuthContextProps, Role} from "./auth/Auth.tsx";
import DashboardView from "./pages/dashboard/DashboardView.tsx";
import {ProtectedRoute} from "./auth/ProtectedRoute.tsx";
import AccountsView from "./pages/adminAccounts/AccountsView.tsx";
import AdminRepositoriesView from "./pages/adminRepositories/AdminRepositoriesView.tsx";
import LicenseIssuesView from "./pages/licenseIssues/LicenseIssuesView.tsx";
import VulnerabilitiesView from "./pages/vulnerabilities/VulnerabilitiesView.tsx";
import AdminLicensesView from "./pages/adminLicenses/AdminLicensesView.tsx";
import SignInView from "./pages/signin/SignInView.tsx";
import {createTheme} from "@mui/material/styles";
import {useAuth} from "./auth/useAuth.ts";
import AboutView from "./pages/commons/AboutView.tsx";
import MyAccountView from "./pages/myAccount/MyAccountView.tsx";
import ChangePasswortView from "./pages/signin/ChangePasswortView.tsx";
import ResetPasswortView from "./pages/signin/ResetPasswortView.tsx";
import CredentialsView from "./pages/credentials/CredentialsView.tsx";
import AdminConfigurationView from "./pages/adminConfiguration/AdminConfigurationView.tsx";
import ComponentsView from "./pages/components/ComponentsView.tsx";
import {ToastContainer} from "react-toastify";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(7),
                },
            }),
        },
    }),
);

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    // const { t } = useTranslation();
    const [open, setOpen] = useState<boolean>("true" !== localStorage.getItem("appbar_closed"));
    const auth: AuthContextProps = useAuth();

    const toggleDrawer = () => {
        localStorage.setItem("appbar_closed", open ? "true": "false");
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <ToastContainer />
            <CssBaseline />
            <BrowserRouter>
                {!auth.isAuthenticated &&
                    <Routes>
                        <Route path='reset-password' element={<ResetPasswortView />}/>
                        <Route path='*' element={<SignInView />}/>
                    </Routes>
                }
                {auth.isAuthenticated &&
                    <Box sx={{display: 'flex', height: '100vh',}}>
                        <AppBar position="absolute" open={open} className='AppBar'>
                            <Toolbar
                                className="AppToolbar"
                                sx={{
                                    pr: '24px', // keep right padding when drawer closed
                                }}
                            >
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={toggleDrawer}
                                    sx={{
                                        marginRight: '36px',
                                        ...(open && {display: 'none'}),
                                    }}
                                >
                                    <MenuIcon/>
                                </IconButton>
                                <Typography
                                    component="h1"
                                    variant="h6"
                                    color="inherit"
                                    noWrap
                                    sx={{flexGrow: 1}}
                                >
                                    <TitleHeader/>
                                </Typography>
                                <LanguageSelector />
                                <ThemeModeSelector />
                                <UserSessionButton />
                            </Toolbar>
                        </AppBar>

                        <Drawer variant="permanent" open={open} className='Drawer'>
                            <Toolbar
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    px: [1],
                                }}
                            >
                                <IconButton onClick={toggleDrawer}>
                                    <ChevronLeftIcon/>
                                </IconButton>
                            </Toolbar>
                            <Divider/>
                            <List component="nav">
                                <AppMenuItems/>
                            </List>
                        </Drawer>

                        <Box
                            component="main"
                            overflow={'auto'}
                            flexGrow={1}
                        >
                            {/* Toolbar is placeholder, otherwise the Container element will be covered by the header. */}
                            <Toolbar />

                            <Routes>
                                <Route path='components'
                                       element={<ProtectedRoute><ComponentsView /></ProtectedRoute>}/>
                                <Route path='license-issues'
                                       element={<ProtectedRoute><LicenseIssuesView /></ProtectedRoute>}/>
                                <Route path='vulnerabilities'
                                       element={<ProtectedRoute><VulnerabilitiesView /></ProtectedRoute>}/>

                                <Route path='admin-licenses'
                                       element={<ProtectedRoute roles={[Role.LICENSE_NAME_MAP_READ, Role.LICENSE_PURL_MAP_READ]}><AdminLicensesView /></ProtectedRoute>}/>
                                <Route path='admin-vulnerabilities'
                                       element={<ProtectedRoute><VulnerabilitiesView /></ProtectedRoute>}/>
                                <Route path='admin-repositories'
                                       element={<ProtectedRoute roles={Role.REPOSITORY_READ}><AdminRepositoriesView /></ProtectedRoute>}/>
                                <Route path='admin-accounts'
                                       element={<ProtectedRoute roles={[Role.USERACCOUNT_READ, Role.USERACCOUNT_GROUP_READ]}><AccountsView /></ProtectedRoute>}/>
                                <Route path='admin-credentials'
                                       element={<ProtectedRoute roles={Role.CREDENTIAL_READ}><CredentialsView /></ProtectedRoute>}/>
                                <Route path='admin-configuration'
                                       element={<ProtectedRoute roles={Role.CONFIGURATION_READ}><AdminConfigurationView /></ProtectedRoute>}/>

                                <Route path='my-account'
                                       element={<MyAccountView />}/>
                                <Route path='change-password'
                                       element={<ProtectedRoute><ChangePasswortView /></ProtectedRoute>}/>

                                <Route path='about'
                                       element={<AboutView />}/>
                                {/*
                                <Route path='dsgvo' element={<ProtectedRoute><DSGVOView /></ProtectedRoute>}/>
                                <Route path='imprint' element={<ProtectedRoute><ImprintView /></ProtectedRoute>}/>
                                */}
                                {/* Default/Fallback routes */}
                                <Route index element={<DashboardView />}/>
                                <Route path='*' element={<DashboardView />}/>
                            </Routes>
                        </Box>
                    </Box>
                }
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
