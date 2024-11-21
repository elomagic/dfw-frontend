import LicencesPie from "./LicensesPie.tsx";
import Grid from "@mui/material/Grid2";

export default function DashboardView() {

    return (
        <Grid container spacing={2} marginTop={2} marginBottom={2}>
            <Grid size={4}>
                { /* TODO Counter > License in triage */ }
                <LicencesPie />
            </Grid>
            <Grid size={4}>
                <LicencesPie />
            </Grid>
            <Grid size={4}>
                <LicencesPie />
            </Grid>

            <Grid size={6}>
                { /* TODO Chart > Blocked By Vulnerability score */ }
            </Grid>
            <Grid size={6}>
                { /* TODO Chart > Blocked By License Violation */ }
            </Grid>
        </Grid>
    );
}
