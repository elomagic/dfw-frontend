import {createTheme} from "@mui/material/styles";


const commonTheme = {
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
};

export const defaultTheme = createTheme({
    ...commonTheme,
    colorSchemes: {
        dark: true,
    },
});