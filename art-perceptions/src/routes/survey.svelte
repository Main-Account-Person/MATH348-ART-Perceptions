<script lang="ts">
    import NavigationBar from "../lib/NavigationBar.svelte";
    import ArtCarousel from "../lib/ArtCarousel.svelte";
</script>

<svelte:head>
    <title>Surveys</title>
</svelte:head>

<main>
    <NavigationBar />
    <body class="categories">
        <h1>Add your perceptions.</h1>
        <div class="category-grid">
            <div class="card" />
            <div class="card" />
            <div class="card" />
            <div class="card" />
            <div class="card" />
        </div>
    </body>
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

    .categories {
        max-width: 100%;
        height: 1080px;
        overflow: hidden;
        padding-top: 4rem;
        background-image: url("../../../images/background.jpeg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        flex-direction: column;
        justify-content: top;
        align-items: center;
        color: white;
    }

    .categories h1 {
        font-size: 2.5rem;
        margin: 0;
        padding-top: 8rem;
    }

    .category-grid {
        display: grid;
        width: calc(100% - 10rem);
        height: 100%;
        /* background: blue; */
        grid-template-columns: repeat(3, minmax(15rem, 1fr));
        padding: 5rem;
        /* grid-template-rows: repeat(autofit, minmax(250px, 1fr)); */
        /* grid-template-columns: repeat(autofit, minmax(250px, 1fr)); */
        /* grid-gap: rem; */
        column-gap: 2rem;
        row-gap: 3rem;
        justify-content: center;
        justify-self: center;
    }

    .card {
        width: 100%;
        height: 100%;
        background: white;
        border-radius: 20px;
    }

</style>
