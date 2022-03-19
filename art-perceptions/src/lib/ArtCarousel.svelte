<script lang="ts">
    import ArtCard from "./ArtCard.svelte";
    import { slide, fly } from "svelte/transition";
    import { flip } from "svelte/animate";
import { each } from "svelte/internal";
    // let index: number = 0;
    let list = [
        "./images/ab0.jpeg",
        "./images/ab1.jpeg",
        "./images/ab2.jpeg",
        "./images/ab3.jpeg",
        "./images/ab4.jpeg",
    ];

    const decrementIndex = () => {
        // list.unshift(list.pop());
        list.push(list.shift());
        list = list;
    };

    const incrementIndex = () => {
        // list.push(list.shift());
        list.unshift(list.pop());
        list = list;
    };
</script>

<div class="art-carousel">
    <div class="chevron left" on:click={decrementIndex}><div /></div>
        {#each list.slice(0, 3) as imageURL, index (imageURL)}
            <div animate:flip="{{duration: 200}}" class="animation-wrap">
                <div in:fly="{{x: index === 0 ? -200 : 200, y: -50, duration: 200}}" class="transition-wrap">
                    <ArtCard
                    {index}
                    isPrimary={index == 1 ? true : false}
                    {imageURL}
                />
                </div>
            </div>
        {/each}
    <div class="chevron right" on:click={incrementIndex}><div /></div>
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
