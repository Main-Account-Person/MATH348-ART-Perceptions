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

    body {
        width: 100%;
        margin: 0;
        padding: 0;
        margin-top: -5rem;
    }

    .section-one {
        max-width: 100%;
        height: 1080px;
        overflow: hidden;
        padding-top: 5rem;
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

    .intro-text {
        max-width: 30%;
        min-width: 20rem;
        height: auto;
        color: white;
    }

    .intro-text h1 {
        font-size: 4rem;
        margin: 0;
        padding-top: 12rem;
    }

    .intro-text h4 {
        margin: 0;
        padding: 0;
        font-weight: 500;
    }
</style>
