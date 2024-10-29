import {Contrast} from "@mui/icons-material";
import {useColorScheme} from "@mui/material/styles";
import {Button} from "@mui/material";

export default function ModeSwitcher() {

    // TODO Doesn't work > https://mui.com/material-ui/customization/dark-mode/#toggling-color-mode
    const { mode, setMode } = useColorScheme();

    return (
        <div>
            <Button
                variant="text"
                color="inherit"
                style={{textTransform: "none"}}
                sx={{
                    minWidth: "32px",
                    fontSize: "1.2rem"
                }}
                onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
            >
                <Contrast/>
            </Button>
        </div>
    );

};