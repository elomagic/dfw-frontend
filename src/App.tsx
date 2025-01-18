"use client"

import {useState} from 'react'
import {
    Box,
    CssBaseline, CSSObject,
    Divider,
    IconButton,
    styled, Theme,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MuiDrawer from '@mui/material/Drawer';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TitleHeader from "./TitleHeader.tsx";
import AppMenuItems from "./sidebar/AppMenuItems.tsx";
import {AuthContextProps, Role} from "./auth/Auth.tsx";
import DashboardView from "./pages/dashboard/DashboardView.tsx";
import {ProtectedRoute} from "./auth/ProtectedRoute.tsx";
import AccountsView from "./pages/adminAccounts/AccountsView.tsx";
import AdminProxiesView from "./pages/adminProxies/AdminProxiesView.tsx";
import PolicyViolationsView from "./pages/policyViolations/PolicyViolationsView.tsx";
import VulnerabilitiesView from "./pages/vulnerabilities/VulnerabilitiesView.tsx";
import AdminPatchesView from "./pages/adminPatches/AdminPatchesView.tsx";
import SignInView from "./pages/signin/SignInView.tsx";
import {createTheme, useTheme} from "@mui/material/styles";
import {useAuth} from "./auth/useAuth.ts";
import AboutView from "./pages/commons/AboutView.tsx";
import MyAccountView from "./pages/myAccount/MyAccountView.tsx";
import ChangePasswortView from "./pages/signin/ChangePasswortView.tsx";
import ResetPasswortView from "./pages/signin/ResetPasswortView.tsx";
import CredentialsView from "./pages/credentials/CredentialsView.tsx";
import AdminConfigurationView from "./pages/adminConfiguration/AdminConfigurationView.tsx";
import ComponentsView from "./pages/components/ComponentsView.tsx";
import {ToastContainer} from "react-toastify";
import AdminPolicyView from "./pages/adminPolicies/AdminPoliciesView.tsx";
import AdminLicenseGroupsView from "./pages/adminLicenses/AdminLicenseGroupsView.tsx";

const drawerWidth: number = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    components: {
        MuiInputBase: {
            styleOverrides: {
                root: {
                    fontSize: '0.9rem',
                },
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    fontSize: '0.9rem',
                },
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    fontSize: '0.9rem',
                    padding: '0 10px',
                    height: '40px',
                },
            }
        },
    }
});

function App() {
    const theme = useTheme();
    const [open, setOpen] = useState<boolean>("true" !== localStorage.getItem("sidebar_closed_status"));
    const auth: AuthContextProps = useAuth();

    const handleDrawerOpen = () => {
        localStorage.setItem("sidebar_closed_status", "true");
        setOpen(true);
    };

    const handleDrawerClose = () => {
        localStorage.setItem("sidebar_closed_status", "false");
        setOpen(false);
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
                        <AppBar position="fixed" open={open}>
                            <Toolbar>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerOpen}
                                    edge="start"
                                    sx={[
                                        {
                                            marginRight: 5,
                                        },
                                        open && { display: 'none' },
                                    ]}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Typography
                                    component="div"
                                    variant="h6"
                                    color="inherit"
                                    noWrap
                                    sx={{flexGrow: 1}}
                                >
                                    <TitleHeader/>
                                </Typography>
                            </Toolbar>
                        </AppBar>

                        <Drawer variant="permanent" open={open}>
                            <DrawerHeader>
                                <IconButton onClick={handleDrawerClose}>
                                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                                </IconButton>
                            </DrawerHeader>
                            <Divider/>
                            <AppMenuItems open={open}/>
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
                                <Route path='policy-violations'
                                       element={<ProtectedRoute><PolicyViolationsView /></ProtectedRoute>}/>
                                <Route path='vulnerabilities'
                                       element={<ProtectedRoute><VulnerabilitiesView /></ProtectedRoute>}/>

                                <Route path='admin-patches'
                                       element={<ProtectedRoute roles={[Role.LICENSE_NAME_MAP_READ, Role.LICENSE_PURL_MAP_READ]}><AdminPatchesView /></ProtectedRoute>}/>
                                <Route path='admin-license-groups'
                                       element={<ProtectedRoute roles={Role.LICENSE_GROUP_READ} ><AdminLicenseGroupsView /></ProtectedRoute>}/>
                                <Route path='admin-proxies'
                                       element={<ProtectedRoute roles={Role.PROXY_READ}><AdminProxiesView /></ProtectedRoute>}/>
                                <Route path='admin-policies'
                                       element={<ProtectedRoute roles={Role.POLICY_READ}><AdminPolicyView /></ProtectedRoute>}/>
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
