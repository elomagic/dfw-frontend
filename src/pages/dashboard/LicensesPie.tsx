import {Paper} from "@mui/material";
import {useTranslation} from "react-i18next";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import {GridComponent, LegendComponent, TitleComponent, TooltipComponent} from "echarts/components";
import {BarChart, PieChart} from "echarts/charts";
import {CanvasRenderer} from "echarts/renderers";
import {KeyLabelItem} from "../../components/FormSelect.tsx";
import {EChartsOption} from "echarts-for-react";
import {useEffect, useState} from "react";
import {useAuth} from "../../auth/useAuth.ts";
import * as Rest from "../../RestClient.ts"
import {enqueueSnackbar} from "notistack";

// Register the required components
echarts.use(
    [PieChart, TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer, LegendComponent]
);

function createOption(items: KeyLabelItem[]): EChartsOption {
    const dataItems = items.map((i) => { return { value: i.key, name: i.label }});// items.reverse();

    return {
        title: {
            text: 'Licenses Permitted',
            subtext: 'Last 28 days',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: 'License',
                type: 'pie',
                radius: '50%',
                data: { dataItems },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 40,
                        shadowOffsetX: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.75)'
                    }
                }
            }
        ]
    }
}

export default function LicencesPie() {

    const auth = useAuth();
    const { t } = useTranslation();
    const [option, setOption] = useState<EChartsOption|undefined>(undefined);

    useEffect(() => {
        Rest.get(auth, Rest.RestEndpoint.License, "LicensesInUse")
            .then((res) => res.json() )
            .then((json) => json.entities as unknown as KeyLabelItem[])
            .then((data) => {
                setOption(createOption(data))
            })
            .catch((err: Error) => enqueueSnackbar(t("getting-data-failed",  { message: err.message }), { variant: 'error' } ));
    }, [t, auth]);

    return (
        <Paper>
            {option && <ReactEChartsCore
                echarts={echarts}
                option={option}
                notMerge={true}
                lazyUpdate={true}
            />}
        </Paper>
    );
}
