import LicencesPie from "./LicensesPie.tsx";
import {Grid, GridItem} from "../../components/Grids.tsx";

export default function DashboardView() {

    return (
        <Grid>
            <GridItem size={4}>
                { /* TODO Counter > License in triage */ }
                <LicencesPie />
            </GridItem>
            <GridItem size={4}>
                <LicencesPie />
            </GridItem>
            <GridItem size={4}>
                <LicencesPie />
            </GridItem>

            <GridItem size={6}>
                { /* TODO Chart > Blocked By Vulnerability score */ }
            </GridItem>
            <GridItem size={6}>
                { /* TODO Chart > Blocked By License Violation */ }
            </GridItem>
        </Grid>
    );
}
