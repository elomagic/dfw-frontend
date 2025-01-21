import {createTheme} from "@mui/material/styles";

export const defaultTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#369a22',
        },
        secondary: {
            main: '#f50057',
        },
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
    },
    colorSchemes: {
        dark: true,
    },
});