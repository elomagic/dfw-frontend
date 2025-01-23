"use client"

import LicencesPie from "./LicensesPie.tsx";
import {Box, Stack} from "@mui/material";

export const DashboardView = () => {

    return (
        <Box margin={3}>
            <Stack direction="column" sx={{ height: "100%", width: "100%" }}>
                <Stack direction="row" gap={2}>
                    { /* TODO Counter > License in triage */ }
                    <LicencesPie title="DEMO: Licences" subtitle='Last 24h' />
                    <LicencesPie title="DEMO: Licences Permitted" subtitle='Last 28 days'/>
                </Stack>

            </Stack>
        </Box>
    );
}
