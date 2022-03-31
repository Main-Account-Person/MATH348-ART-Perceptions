<script lang="ts">
    import NavigationBar from "../lib/NavigationBar.svelte";
    import Content from "../lib/Content.svelte";
</script>

<svelte:head>
    <title>Survey Title Test</title>
</svelte:head>

<main>
    <NavigationBar />
    <h1>Survey Title Test</h1>
</main>

<style>
    :root {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }

    * {
        /* Offset Parent Margin */
        /* margin: -8px; */
    }
</style>
