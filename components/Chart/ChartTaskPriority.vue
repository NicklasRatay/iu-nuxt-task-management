<template>
    <Chart
        type="bar"
        :data="chartData"
        :options="chartOptions"
        class="c-card w-full c-max-h-half"
    />
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
        .from("vw_pending_tasks_per_priority")
        .select("*");
    if (error) {
        simpleToast.error(error.message);
        return [];
    }
    return data;
};

const setChartData = (
    priorities: Array<
        Database["public"]["Views"]["vw_pending_tasks_per_priority"]["Row"]
    >,
): ChartData => {
    return {
        labels: priorities.map((priority) => priority.priority_name), // Use status names as labels
        datasets: [
            {
                data: priorities.map((priority) => priority.task_count), // Use task counts as data
                backgroundColor: [
                    getColor("--p-gray-300"),
                    getColor("--p-primary-300"),
                    getColor("--p-orange-300"),
                    getColor("--p-red-300"),
                ],
                hoverBackgroundColor: [
                    getColor("--p-gray-400"),
                    getColor("--p-primary-400"),
                    getColor("--p-orange-400"),
                    getColor("--p-red-400"),
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
                display: false,
            },
            title: {
                display: true,
                text: "Pending Tasks per Priority",
                color: textColor,
                font: {
                    size: 21,
                    weight: "lighter",
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    display: false,
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
