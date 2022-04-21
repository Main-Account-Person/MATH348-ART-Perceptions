<script lang="ts">
	import Chart from './LineChart.svelte';
	responses_no=0;
</script>


<body>
	<div class="section-one">
		<h1>Survey Results</h1>
		<h2>See how results for AI-generated and human-made art compare</h2>
		<p>So far, {responses_no} people have taken the survey.</p>
	</div>
</body>
<!-- <div class="grid">
	<div style="width: 33.3%; height: 33.3%"><Chart/></div>
	<div style="width: 66.6%; height: 33.3%"><Chart/></div>
	<div style="width: 33.3%; height: 66.6%"><Chart/></div>
	<div style="width: 66.6%; height: 66.6%"><Chart/></div>
</div> -->

<style>
:root {
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
				Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.section-one {
		max-width: 100%;
		height: 1080px;
		overflow: hidden;
		padding-top: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-content: center;
		align-items: center;
		background-image: url("../../../images/background.jpeg");
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
}

body {
		width: 100%;
		padding: 100;
		background-color: red;
		color: white;
}

h2 {
		text-align: right;
		color: green;

}

	/* .grid {
		width: 100vw;
		height: 100vh;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);
	} */
</style>
