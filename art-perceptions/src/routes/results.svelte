<script lang="ts">
    import NavigationBar from "$lib/NavigationBar.svelte";
    import BarChart from "$lib/BarChart.svelte";
    import { onMount } from "svelte";
    import RadarChart from "$lib/RadarChart.svelte";
    let responses_no = 10;
    let tellapart_no = 5;

    let data = [
        { question: "Q1", score: 0 },
        { question: "Q2", score: 0 },
        { question: "Q3", score: 0 },
        { question: "Q4", score: 0 },
        { question: "Q5", score: 0 },
        { question: "Q6", score: 0 },
        { question: "Q7", score: 0 },
        { question: "Q8", score: 0 },
    ];

    var isLoadingChart: boolean = true;
    var typeResults = [
        [
            // AI-generated
            { axis: "Q1", value: 0 },
            { axis: "Q2", value: 0 },
            { axis: "Q3", value: 0 },
            { axis: "Q4", value: 0 },
            { axis: "Q5", value: 0 },
            { axis: "Q6", value: 0 },
            { axis: "Q7", value: 0 },
            { axis: "Q8", value: 0 },
        ],
        [
            // Human-generated
            { axis: "Q1", value: 0 },
            { axis: "Q2", value: 0 },
            { axis: "Q3", value: 0 },
            { axis: "Q4", value: 0 },
            { axis: "Q5", value: 0 },
            { axis: "Q6", value: 0 },
            { axis: "Q7", value: 0 },
            { axis: "Q8", value: 0 },
        ],
    ];
    var humanResults = [];
    var aiResults = [];

    let surveyResults;
    let numResponses;
    var aiResponses = 0;
    onMount(async () => {
        const url =
            process.env.NODE_ENV == "development"
                ? "http://localhost:3000/api/survey"
                : "https://math-348-art-perceptions.vercel.app/api/survey";
        surveyResults = await fetch(url).then((res) =>
            res.json().then((json) => json["data"])
        );

        numResponses = surveyResults.length;

        for (var response of surveyResults) {
            const responses = response["responses"];
            for (var i = 0; i < 8; i++) {
                data[i]["score"] += responses["q" + (i + 1)];
            }
            if (response["art_id"] >= 8100) {
                aiResponses++;
                aiResults.push(response["responses"]);
            } else {
                humanResults.push(response["responses"]);
            }
        }

        // console.log(aiResults.reduce());

        // for (var i = 1; i < 9; i++) {
        // typ
        // }

        // for (var question of typeResults[0]) {
        // console.log(question);
        aiResults.forEach((res, k) => {
            for (var i = 1; i < 9; i++) {
                typeResults[0][i - 1]["value"] += res["q" + i];
            }
        });
        humanResults.forEach((res, k) => {
            for (var i = 1; i < 9; i++) {
                typeResults[1][i - 1]["value"] += res["q" + i];
            }
        });
        typeResults.forEach((type) => {
            type.forEach((q, i) => {
                switch (i) {
                    case 0:
                        q.axis = "Complexity";
                        break;
                    case 1:
                        q.axis = "Innovation";
                        break;
                    case 2:
                        q.axis = "Sparks Imagination";
                        break;
                    case 3:
                        q.axis = "Visual Appeal";
                        break;
                    case 4:
                        q.axis = "Significance";
                        break;
                    case 5:
                        q.axis = "Skillfulness";
                        break;
                    case 6:
                        q.axis = "Meaningfulness";
                    case 7:
                        q.axis = "Conveyance of Ideas";
                        break;
                    case 8:
                        q.axis = "Artist's Touch";
                        break;
                    default:
                        break;
                }
                q.axis += " (Q" + (i + 1) + ")";
                q.value /= type == 0 ? aiResponses : numResponses - aiResponses;
            });
        });

        for (var i of data) {
            i["score"] /= surveyResults.length;
        }

        isLoadingChart = false;
    });
</script>

<svelte:head>
    <title>Results</title>
</svelte:head>

<body>
    <NavigationBar />
    <div class="section-one">
        <!-- <h2>Survey Results</h2> -->
        <div class="total-results-wrapper">
            <div class="total-results">
                <p>
                    People responded to <b>{numResponses}</b> surveys.
                    <b>{aiResponses}</b> are based on computer-generated artwork
                    and
                    <b>{numResponses - aiResponses}</b> are based on human-generated
                    art.
                </p>

                <BarChart title="Average Responses" points={data} />
            </div>

            <div class="type-results">
                {#if isLoadingChart}
                    Loading...
                {:else}
                    <div class="legend">
                        <b
                            ><em style="color: #f29e5a; font-style: normal;"
                                >AI</em
                            >
                            vs.
                            <em style="color: #3e01b4; font-style: normal;"
                                >Human</em
                            > Artwork Responses</b
                        >
                    </div>
                    <RadarChart data={typeResults} />
                {/if}
            </div>
        </div>
        <!-- <h1>Survey Results</h1> -->
        <!-- <h2>See how results for AI-generated and human-made art compare</h2> -->
        <!-- <p> -->
        <!-- So far, {responses_no} people have taken the survey. Of the {responses_no} -->
        <!-- survey-takers, {tellapart_no} were able to tell between the AI-generated -->
        <!-- and human-generated art pieces. -->
        <!-- </p> -->
        <!-- <div class="chart_1"> -->
        <!-- <Barchart title="Average Results" points={data} /> -->
        <!-- </div> -->

        <!-- <RadarChart data={typeResults} /> -->
    </div>
</body>

<style>
    :root {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }

    .section-one {
        width: 100%;
        margin: 0;
        padding: 0;
        margin-top: -5rem;
        min-height: 1080px;
        overflow: hidden;
        padding-top: 4rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        /* align-content: left; */
        align-items: left;
        /* background-position: left; */
        /* background-image: url("../../../images/background.jpeg"); */
        /* background-repeat: no-repeat; */
        /* background-size: cover; */
        background: linear-gradient(#f29e5a, purple, #3e01b4 120vh, #340198);
        /* padding-bottom: 8rem; */
    }

    body {
        margin: 0;
        padding: 0;
    }

    h2 {
        margin-top: 2rem;
        margin-left: 5rem;
        color: white;
    }

    .total-results-wrapper {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-around;
        gap: 2rem;
        margin-top: 4rem;
        /* width: 100%; */
        margin-left: 5rem;
        margin-right: 5rem;
    }

    .total-results {
        margin: 0;
        display: flex;
        flex-direction: column;
        width: 30rem;
        height: 50%;
        background: white;
        padding: 1rem;
        border-radius: 20px;
        /* margin-left: 5rem; */
    }

    .type-results {
        text-align: center;
        /* width: 100%; */
        /* color: white; */
    }

    .legend {
        background: white;
        padding: 1rem;
        border-radius: 10px;
    }
    .chart_1 {
        width: 100%;
        max-width: 640px;
        height: calc(100% - 4em);
        align-content: left;
        min-height: 280px;
        max-height: 480px;
        margin: 0 auto;
    }

    /* .grid {
		width: 100vw;
		height: 100vh;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);
	} */
</style>
