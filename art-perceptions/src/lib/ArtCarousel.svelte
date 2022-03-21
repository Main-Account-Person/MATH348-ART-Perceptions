<script context="module" lang="ts">
    export async function load({ fetch }) {
        const response = await fetch(
            "https://localhost:3000/api/gallery-results.json"
        );
        const galleryResultsJSON = await response.json();
        return {
            props: { galleryResultsJSON },
        };
    }
</script>

<script lang="ts">
    import ArtCard from "./ArtCard.svelte";
    import { fly } from "svelte/transition";
    import { flip } from "svelte/animate";
    import { onMount } from "svelte";

    var galleryResults = [];

    async function fetchGalleryResults() {
        const response = await fetch(
            "http://localhost:3000/api/gallery-results.json"
        );
        const json = await response.json();
        galleryResults = json["objects"];
        shuffle(galleryResults);
    }

    onMount(async () => {
        fetchGalleryResults();
    });

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    const decrementIndex = () => {
        // galleryResults.unshift(galleryResults.pop());
        galleryResults.push(galleryResults.shift());
        galleryResults = galleryResults;
    };

    const incrementIndex = () => {
        // galleryResults.push(galleryResults.shift());
        galleryResults.unshift(galleryResults.pop());
        galleryResults = galleryResults;
    };
</script>

<div class="art-carousel">
    {#await fetchGalleryResults()}
        <h2>Loading...</h2>
    {:then}
        <div class="chevron left" on:click={decrementIndex}><div /></div>
        {#each galleryResults.slice(0, 3) as imageObject, index (imageObject)}
            <div animate:flip={{ duration: 200 }} class="animation-wrap">
                <div
                    in:fly={{
                        x: index === 0 ? -200 : 200,
                        y: -50,
                        duration: 200,
                    }}
                    class="transition-wrap"
                >
                    <ArtCard
                        {index}
                        isPrimary={index == 1 ? true : false}
                        imageURL={imageObject["Images"][0]["PreviewPath"]}
                    />
                </div>
            </div>
        {/each}
        <div class="chevron right" on:click={incrementIndex}><div /></div>
    {/await}
</div>

<style>
    .art-carousel {
        margin-top: 4rem;
        display: flex;
        align-items: center;
        align-content: center;
    }

    .chevron {
        background: #3e01b4;
        width: 3.5rem;
        height: 3.5rem;
        margin: 0.8rem;
        border-radius: 50%;
        transition: 0.2s ease;
    }

    .chevron div {
        position: relative;
        width: 1rem;
        height: 1rem;
        border-top: 0.4rem solid #f4d3b8;
        border-left: 0.4rem solid #f4d3b8;
        transform: rotate(45deg);
        top: 35%;
        left: 30%;
    }

    .chevron:hover {
        background: #f4d3b8;
    }

    .chevron:hover div {
        border-color: #3e01b4;
    }

    .chevron.right {
        transform: rotate(90deg);
    }

    .chevron.left {
        transform: rotate(-90deg);
    }
</style>
