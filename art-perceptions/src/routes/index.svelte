<script lang="ts">
    import { flip } from "svelte/animate";
    import { fly, fade } from "svelte/transition";
    import ArtCarousel from "$lib/ArtCarousel.svelte";
    import NavigationBar from "$lib/NavigationBar.svelte";
    import ArtCard from "../lib/ArtCard.svelte";
    import type { GalleryArt } from "../lib/models/GalleryArtModel";
    import { ArtCardType } from "../lib/models/ArtCardModel";
    import { galleryResults } from "../stores";

    var searchText: string;
    var searchResults: GalleryArt[];

    function filterArt(art: GalleryArt) {
        if (
            art.title.toLowerCase().includes(searchText.toLowerCase()) ||
            art.artist.toLowerCase().includes(searchText.toLowerCase()) ||
            art.category.toLowerCase().includes(searchText.toLowerCase())
        ) {
            return art;
        }
    }

    function searchArt() {
        if (searchText) {
            if (searchText.length > 1) {
                searchResults = $galleryResults.filter(filterArt);
            }
        } else {
            scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
            searchResults = [];
        }
    }

    let scrollY: number;
</script>

<svelte:head>
    <title>Art Perceptions</title>
</svelte:head>

<svelte:window bind:scrollY />

<main>
    <NavigationBar />
    <body class="content">
        <div class="section-one">
            <div class="intro-text">
                <h1>AI vs. Human Art</h1>
                <h4>
                    Explore the differences between AI and human-generated art.
                </h4>
                <h4>Add your own perceptions of art to the database.</h4>
            </div>

            <ArtCarousel />

            <div class="search-container">
                <div class="gund-gallery">
                    <h1>Looking for something?</h1>
                    <h4>
                        Search for a specific work of art, artist, or category.
                    </h4>
                </div>
                <label class="searchbar">
                    <input
                        type="text"
                        placeholder="Title, Artist, Category"
                        bind:value={searchText}
                        on:input={searchArt}
                        class="searchbar-input"
                    />
                </label>
                <div class="search-results">
                    {#if searchResults}
                        {#if searchResults.length === 0}
                            <span
                                in:fade={{
                                    duration: 100,
                                }}
                                style="color: white;"
                            >
                                No results found.
                            </span>
                        {:else}
                            {#each searchResults as art, _ (art)}
                                <div
                                    animate:flip={{ duration: 400 }}
                                    in:fly={{
                                        y: -50,
                                        duration: 200,
                                    }}
                                    class="animation-wrap"
                                >
                                    <ArtCard
                                        index={1}
                                        type={ArtCardType.search}
                                        galleryObject={art}
                                    />
                                </div>
                            {/each}
                        {/if}
                    {/if}
                </div>
            </div>
        </div>
    </body>
</main>

<style>
    :root {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }

    .content {
        width: 100%;
        margin: 0;
        padding: 0;
        margin-top: -5rem;
        height: 100%;
    }

    .section-one {
        max-width: 100%;
        min-height: 100vh;
        /* height: 1080px; */
        /* overflow: hidden; */
        padding-top: 4rem;
        padding-bottom: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-content: center;
        align-items: center;
        background: linear-gradient(#f29e5a, purple, #3e01b4 120vh, #340198);
        /* background-image: url("../../../images/background.jpeg"); */
        /* background-position: center; */
        /* background-repeat: no-repeat; */
        /* background-size: cover; */
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
        display: flex;
        flex-direction: column;
        max-width: 60%;
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

    .search-container {
        z-index: 3;
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-bottom: 3rem;
    }

    .searchbar {
        position: relative;
        width: 100%;
        max-width: 60%;
        margin-top: 2rem;
        display: flex;
        position: sticky;
        top: 1rem;
        z-index: 3;
    }

    .searchbar:before {
        content: "";
        position: absolute;
        right: 10px;
        top: 0;
        bottom: 0;
        width: 2rem;
        background: url(/images/search-icon.svg) center / contain no-repeat;
    }

    .searchbar-input {
        /* min-width: 55%; */
        /* width: 80%; */
        /* margin-top: 1rem; */
        flex: 1;
        padding: 1rem;
        border-radius: 18px;
        border: 3px solid #3e01b4;
        background-color: rgba(255, 255, 255, 0.9);
        outline: none;
    }

    .searchbar-input:focus {
        border: 3px solid #f29e5a;
    }

    .search-results {
        margin-top: 2rem;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
        column-gap: 1rem;
        row-gap: 3rem;
        justify-items: center;
    }
</style>
