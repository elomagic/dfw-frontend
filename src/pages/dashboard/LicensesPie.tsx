"use client"

import {Paper} from "@mui/material";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import {GridComponent, LegendComponent, TitleComponent, TooltipComponent} from "echarts/components";
import {BarChart, PieChart} from "echarts/charts";
import {CanvasRenderer} from "echarts/renderers";
import {KeyLabelItem} from "../../components/FormSelect.tsx";
import {EChartsOption} from "echarts-for-react";
import {useEffect, useState} from "react";

// Register the required components
echarts.use(
    [PieChart, TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer, LegendComponent]
);

function createOption(items: KeyLabelItem[]): EChartsOption {
    const dataItems = items.map((i) => { return { value: i.key, name: i.label }});// items.reverse();

    console.log(dataItems)

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
                data:  [
                    { value: 17, name: 'Apache-2.0' },
                    { value: 12, name: 'MIT' },
                    { value: 10, name: 'BSD-3-Clause' },
                    { value: 9, name: 'BSD-2-Clause' },
                    { value: 8, name: 'EPL-2.0' },
                    { value: 7, name: 'EPL-1.0' }
                ],
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

    const [option, setOption] = useState<EChartsOption|undefined>(undefined);

    /*
    useEffect(() => {
        Rest.get(auth, Rest.RestEndpoint.License, "LicensesInUse")
            .then((res) => res.json() )
            .then((json) => json.entities as unknown as KeyLabelItem[])
            .then((data) => {
                setOption(createOption(data))
            })
            .catch((err: Error) => enqueueSnackbar(t("getting-data-failed",  { message: err.message }), { variant: 'error' } ));
    }, [t, auth]);
    */

    useEffect(() => {
        setOption(createOption([]))
    }, []);

    return (
        <Paper>
            {option && <ReactEChartsCore
                echarts={echarts}
                option={option}
                notMerge={true}
                lazyUpdate={true}
                theme={"dark"}
            />}
        </Paper>
    );
}
