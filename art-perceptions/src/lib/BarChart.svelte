<script lang="ts">
    import { scaleLinear } from "d3-scale";
    export let title: string;
    export let points: { question: string; score: number }[];

    const xTicks = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"];
    const yTicks = [0, 3, 5, 7, 10];
    const padding = { top: 20, right: 15, bottom: 20, left: 25 };

    let width = 500;
    let height = 200;

    function formatMobile(tick) {
        return "'" + tick.toString().slice(-2);
    }

    $: xScale = scaleLinear()
        .domain([0, xTicks.length])
        .range([padding.left, width - padding.right]);

    $: yScale = scaleLinear()
        .domain([0, Math.max.apply(null, yTicks)])
        .range([height - padding.bottom, padding.top]);

    $: innerWidth = width - (padding.left + padding.right);
    $: barWidth = innerWidth / xTicks.length;
    // console.log(points);
</script>

<h3>{title}</h3>

<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
    <svg>
        <!-- y axis -->
        <g class="axis y-axis">
            {#each yTicks as tick}
                <g
                    class="tick tick-{tick}"
                    transform="translate(0, {yScale(tick)})"
                >
                    <line x2="100%" />
                    <text y="-4"
                        >{tick}
                        {tick === 20 ? " per 1,000 population" : ""}</text
                    >
                </g>
            {/each}
        </g>

        <!-- x axis -->
        <g class="axis x-axis">
            {#each points as point, i}
                <g class="tick" transform="translate({xScale(i)},{height})">
                    <text x={barWidth / 2} y="-4"
                        >{width > 380
                            ? point.question
                            : formatMobile(point.question)}</text
                    >
                </g>
            {/each}
        </g>

        <g class="bars">
            {#each points as point, i}
                <rect
                    x={xScale(i) + 2}
                    y={yScale(point.score)}
                    width={barWidth - 4}
                    height={yScale(0) - yScale(point.score)}
                />
            {/each}
        </g>
    </svg>
</div>

<style>
    .chart {
        width: 100%;
        height: 40%;
        max-width: 500px;
        margin: 0 auto;
        background-color: transparent;
    }

    svg {
        position: relative;
        width: 100%;
        height: 200px;
    }

    .tick {
        font-family: Helvetica, Arial;
        font-size: 0.725em;
        font-weight: 200;
    }

    .tick line {
        stroke: green;
        stroke-dasharray: 2;
    }

    .tick text {
        fill: black;
        text-anchor: start;
    }

    .tick.tick-0 line {
        stroke-dasharray: 0;
    }

    .x-axis .tick text {
        text-anchor: middle;
    }

    .bars rect {
        fill: #f29e5a;
        stroke: none;
        opacity: 0.75;
    }
</style>
