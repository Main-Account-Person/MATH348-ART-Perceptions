<script lang="ts">
    import NavigationBar from "../lib/NavigationBar.svelte";
    import ArtCarousel from "../lib/ArtCarousel.svelte";
    import CategoryCard from "../lib/CategoryCard.svelte";
    import type { GalleryArt } from "../models/GalleryArtModel";
    // import { galleryResults } from "../stores";
    import artworkJSON from "./api/artwork.json";

    let artwork: GalleryArt = artworkJSON;

    Array.prototype.shuffle = function () {
        return this.sort(() => Math.random() - 0.5);
    };

    function filterCategory(art: GalleryArt, category: string) {
        if (art.category === category) {
            return art;
        }
    }

    let abstractGallery: GalleryArt[] = artwork
        .filter((art) => filterCategory(art, "abstract"))
        .shuffle()
        .slice(0, 5);

    let figurativeGallery: GalleryArt[] = artwork
        .filter((art) => filterCategory(art, "figurative"))
        .shuffle()
        .slice(0, 5);
    let landscapeGallery: GalleryArt[] = artwork
        .filter((art) => filterCategory(art, "landscape"))
        .shuffle()
        .slice(0, 5);
    let stillLifeGallery: GalleryArt[] = artwork
        .filter((art) => filterCategory(art, "still-life"))
        .shuffle()
        .slice(0, 5);
    let portraitGallery: GalleryArt[] = artwork
        .filter((art) => filterCategory(art, "portrait"))
        .shuffle()
        .slice(0, 5);
</script>

<svelte:head>
    <title>Surveys</title>
</svelte:head>

<body>
    <NavigationBar />
    <div class="categories">
        <h1>Add your perceptions.</h1>
        <div class="category-grid">
            <CategoryCard category="Abstract" gallery={abstractGallery} />
            <CategoryCard category="Figurative" gallery={figurativeGallery} />
            <CategoryCard category="Landscape" gallery={landscapeGallery} />
            <CategoryCard category="Still Life" gallery={stillLifeGallery} />
            <CategoryCard category="Portrait" gallery={portraitGallery} />
        </div>
    </div>
</body>

<style>
    :root {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }

    body {
        /*     width: 100%; */
        margin: 0;
        padding: 0;
        /*     padding: 0; */
        /*     margin-top: -5rem; */
    }

    .categories {
        width: 100%;
        margin: 0;
        padding: 0;
        margin-top: -5rem;

        max-width: 100%;
        height: 1080px;
        overflow: hidden;
        padding-top: 4rem;
        /* background-image: url("../../../images/background.jpeg"); */
        /* background-position: center; */
        /* background-repeat: no-repeat; */
        /* background-size: cover; */
        display: flex;
        flex-direction: column;
        justify-content: top;
        align-items: center;
        color: white;
        background: linear-gradient(#f29e5a, purple, #3e01b4 120vh, #340198);
    }

    .categories h1 {
        font-size: 2.5rem;
        margin: 0;
        padding-top: 4rem;
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
