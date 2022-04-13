<script>
	import Chart from './LineChart.svelte';
</script>

<div class="grid">
	<div style="width: 33.3%; height: 33.3%"><Chart/></div>
	<div style="width: 66.6%; height: 33.3%"><Chart/></div>
	<div style="width: 33.3%; height: 66.6%"><Chart/></div>
	<div style="width: 66.6%; height: 66.6%"><Chart/></div>
</div>

<style>
	:global(body) {
		padding: 0;
	}

	.grid {
		width: 100vw;
		height: 100vh;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);
	}
