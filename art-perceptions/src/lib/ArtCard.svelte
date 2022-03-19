<script lang="ts">
    export let index: number;
    export let isPrimary: boolean;
    export let imageURL: string;
</script>

<div
    class="art-card {isPrimary === false ? 'bg' : 'primary'} {index === 0
        ? 'leading'
        : ''} {index === 2 ? 'trailing' : ''}"
>
    <img src={imageURL} alt="{index} Image" />
    <h3>Title</h3>
    <h4>Artist</h4>
</div>

<style>
    .art-card {
        will-change: transform, height, opacity;
        width: 18rem;
        height: 25rem;
        background-color: white;
        border-radius: 25px;
        margin: 0;
        transition: 0.2s ease;
        z-index: 1;
        display: flex;
        flex-direction: column;
        /* position: absolute; */
        padding: 1rem;
    }

    .art-card img {
        border-radius: 20px;
    }

    .art-card.bg {
        transform: scale(0.9);
        filter: brightness(95%);
        box-shadow: 0px 2px 5px lightgray;
    }

    .art-card.bg:hover {
        transform: scale(0.95);
    }

    .art-card.primary {
        transform: scale(1);
        box-shadow: 0px 2px 15px lightgray;
    }
    .art-card.art-card.primary:hover {
        transform: scale(1.05);
    }

    .art-card.leading {
        z-index: 0;
    }

    .art-card.trailing {
        z-index: 0;
    }
</style>
