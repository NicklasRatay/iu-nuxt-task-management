<template>
    <div class="c-card flex justify-center w-full c-max-h-half">
        <Chart
            type="doughnut"
            :data="chartData"
            :options="chartOptions"
            class="w-1/2 min-w-80"
        />
    </div>
</template>

<script setup lang="ts">
import type { ChartData, ChartOptions } from "chart.js";
import type { Database } from "~/supabase/types";

const chartData = ref<ChartData>();
const chartOptions = ref<ChartOptions>();

const supabase = useSupabaseClient<Database>();
const simpleToast = useSimpleToast();

let getColor: (cssClass: string) => string = () => "";

const loadTasksPerStatus = async () => {
    const { data, error } = await supabase
        .from("vw_all_tasks_per_status")
        .select("*");
    if (error) {
        simpleToast.error(error.message);
        return [];
    }
    return data;
};

const setChartData = (
    statuses: Array<
        Database["public"]["Views"]["vw_all_tasks_per_status"]["Row"]
    >,
): ChartData => {
    return {
        labels: statuses.map((status) => status.status_name), // Use status names as labels
        datasets: [
            {
                data: statuses.map((status) => status.task_count), // Use task counts as data
                backgroundColor: [
                    getColor("--p-orange-300"),
                    getColor("--p-primary-300"),
                    getColor("--p-green-300"),
                ],
                hoverBackgroundColor: [
                    getColor("--p-orange-400"),
                    getColor("--p-primary-400"),
                    getColor("--p-green-400"),
                ],
                borderWidth: 0,
            },
        ],
    };
};

const setChartOptions = (): ChartOptions => {
    const textColor = getColor("--p-text-color");
    return {
        plugins: {
            legend: {
                labels: {
                    color: textColor,
                },
            },
            title: {
                display: true,
                text: "All Tasks per Status",
                color: textColor,
                font: {
                    size: 21,
                    weight: "lighter",
                },
            },
        },
    };
};

onMounted(async () => {
    const documentStyle = getComputedStyle(document.body);
    getColor = (cssClass: string) => documentStyle.getPropertyValue(cssClass);
    const statuses = await loadTasksPerStatus();
    chartData.value = setChartData(statuses);
    chartOptions.value = setChartOptions();
});
</script>
