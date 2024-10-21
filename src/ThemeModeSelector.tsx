import React from "react";
import {Contrast} from "@mui/icons-material";
import {useColorScheme} from "@mui/material/styles";
import {Button} from "@mui/material";

export default function ModeSwitcher() {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // for server-side rendering
        // learn more at https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
        return null;
    }

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
                onClick={() => setMode(mode === 'light' ? 'dark':'light')}
            >
                <Contrast/>
            </Button>
        </div>
    );
};