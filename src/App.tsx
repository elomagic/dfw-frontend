import {useState} from 'react'
import './App.css'
import {Box, Divider, extendTheme, IconButton, List, styled, ThemeProvider, Toolbar, Typography} from "@mui/material";
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MuiDrawer from '@mui/material/Drawer';
import {BrowserRouter} from "react-router-dom";
import TitleHeader from "./TitleHeader.tsx";
import LanguageSelector from "./LanguageSelector.tsx";
import UserSessionButton from "./UserSessionButton.tsx";
import ThemeModeSelector from './ThemeModeSelector';
import AppMenuItems from "./AppMenuItems.tsx";

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

const mdTheme = extendTheme({});

function App() {
    // const { t } = useTranslation();
    const [open, setOpen] = useState<boolean>("true" !== localStorage.getItem("appbar_closed"));
    //  TODO
    const [authenticated] = useState<boolean>(true);

    const toggleDrawer = () => {
        localStorage.setItem("appbar_closed", open ? "true": "false");
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={mdTheme} defaultMode='dark'>
            <BrowserRouter>
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

                    {authenticated &&
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
                    }
                </Box>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
