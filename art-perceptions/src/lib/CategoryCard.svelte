<script lang="ts">
    import { scale } from "svelte/transition";
    import type { GalleryArt } from "./models/GalleryArtModel";
    export let category: string;
    export let gallery: GalleryArt[];

    function exit(object, i) {
        const style = object.target.style;
        const rotateDeg: number = 4 * (-i + 2);
        const translatePx: number = 35 * (-i + 2);
        style.width = "8vw";
        style.paddingLeft = "0vw";
        style.zIndex = 0;
        style.transform =
            "rotate(" +
            rotateDeg.toString() +
            "deg) translate(0," +
            translatePx.toString() +
            "px) scale(1.0)";
        style.boxShadow = "2px 2px 1rem lightgray";
    }

    function over(object, i: number) {
        const style = object.target.style;
        const rotateDeg: number = 4 * (-i + 2);
        const translatePx: number = 35 * (-i + 2);
        style.width = "8vw";
        style.paddingLeft = "8vw";
        style.zIndex = 0;
        style.transform =
            "rotate(" +
            rotateDeg.toString() +
            "deg) translate(0," +
            translatePx.toString() +
            "px) scale(1.3)";
        style.boxShadow = "none";
    }
</script>

<div class="category-card">
    <h2>{category}</h2>
    <div class="collection">
        {#each gallery as art, i (art)}
            <div class="art-display">
                <img
                    src={art.images[0].previewURL}
                    on:mouseover={(t) => over(t, i)}
                    on:mouseout={(t) => exit(t, i)}
                    style="transform: rotate({4 *
                        (-i + 2)}deg) translate(0, {30 *
                        (-i + 2)}px) scale(1.0);"
                />
            </div>
        {/each}
    </div>
    <a href="/survey/{category.replace(/\s+/g, '-').toLowerCase()}">
        Take the surveys!
    </a>
</div>

<style>
    .category-card {
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 20px;
        color: black;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: 0.2s ease;
    }

    .category-card:hover {
        transform: scale(1.04);
    }

    .category-card h2 {
        padding-top: 0.5rem;
        padding-left: 1.5rem;
    }

    .category-card a {
        width: 20%;
        display: block;
        margin-left: auto;
        margin-right: 1.5rem;
        margin-bottom: 1.5rem;
        padding: 0.5rem;
        border-radius: 15px;
        border: none;
        background-color: #3e01b4;
        color: white;
        box-shadow: 0px 2px 5px #3e01b4;
        transition: 0.2s ease;
        text-decoration: none;
        text-align: center;
    }

    .category-card a:hover {
        background: rgba(255, 255, 0, 0);
        color: #3e01b4;
        border: 2px #3e01b4;
        cursor: pointer;
        box-shadow: 0px 0px 10px #3e01b4;
    }

    .collection {
        width: 100%;
        height: 100%;
        /* display: flex; */
        /* justify-content: center; */
        /* align-items: top; */
        padding-top: 8vh;
        padding-left: 5vw;
    }

    .art-display img {
        width: 8vw;
        height: 10vh;
        position: absolute;
        box-shadow: 2px 2px 1rem lightgray;
        transition: ease-out 0.2s;
        z-index: 0;
        object-fit: cover;
        border-radius: 10px;
    }
</style>
