<script lang="ts">
    import NavigationBar from "$lib/NavigationBar.svelte";
    import Barchart from "$lib/Barchart.svelte";
    import { onMount } from "svelte";
    let responses_no = 10;
    let tellapart_no = 5;

    let surveyResults;
    onMount(async () => {
        const url =
            process.env.NODE_ENV == "development"
                ? "http://localhost:3000/api/survey"
                : "https://math-348-art-perceptions.vercel.app/api/survey";
        surveyResults = await fetch(url).then((res) =>
            res.json().then((json) => json["data"])
        );
        console.log(surveyResults);
    });

    let data = [
        { question: "Q1", score: 5 },
        { question: "Q2", score: 4.6 },
        { question: "Q3", score: 4.4 },
        { question: "Q4", score: 4 },
        { question: "Q5", score: 3 },
        { question: "Q6", score: 2.4 },
        { question: "Q7", score: 2.4 },
        { question: "Q8", score: 8.4 },
    ];

  console.log(obj);

</script>

<body>
    <NavigationBar />
    <div class="section-one">
        <h1>Survey Results</h1>
        <h2>See how results for AI-generated and human-made art compare</h2>
        <p>
            So far, {responses_no} people have taken the survey. Of the {responses_no}
            survey-takers, {tellapart_no} were able to tell between the AI-generated
            and human-generated art pieces.
        </p>
        <div class="chart_1">
            <Barchart points={obj} />
        </div>
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
        height: 1080px;
        overflow: hidden;
        padding-top: 4rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-content: center;
        align-items: center;
        /* background-position: left; */
        /* background-image: url("../../../images/background.jpeg"); */
        /* background-repeat: no-repeat; */
        /* background-size: cover; */
        background: linear-gradient(#f29e5a, purple, #3e01b4 120vh, #340198);
    }

    body {
        margin: 0;
        padding: 0;
    }

    h2 {
        text-align: right;
        color: green;
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
