<script lang="ts">
    import ArtCarousel from "$lib/ArtCarousel.svelte";
    import NavigationBar from "$lib/NavigationBar.svelte";
</script>

<svelte:head>
    <title>Art Perceptions</title>
</svelte:head>

<main>
    <NavigationBar />
    <body>
        <div class="section-one">
            <div class="intro-text">
                <h1>AI vs. Human Art</h1>
                <h4>
                    Explore the differences between AI and human-generated art.
                </h4>
                <h4>Add your own perceptions of art to the database.</h4>
            </div>

            <ArtCarousel />

            <div class="gund-gallery">
                <h1>At the Gund Gallery?</h1>
                <h4>
                    Search for a specific piece of art and add your perception
                    to the database!
                </h4>
            </div>
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

    .section-one {
        max-width: 100%;
        height: 1080px;
        overflow: hidden;
        padding-top: 4rem;
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

    .gund-gallery {
        margin-top: 7rem;
        color: white;
    }

    .gund-gallery h1 {
        font-size: 3rem;
        margin-bottom: 0;
    }

    .gund-gallery h4 {
        margin: 0;
        padding: 0;
        font-weight: 500;
    }
</style>
