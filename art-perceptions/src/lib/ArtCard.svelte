<script lang="ts">
    import type { GalleryArt } from "./models/GalleryArtModel";
    import { ArtCardType } from "./models/ArtCardModel";
    export let index: number;
    export let type: ArtCardType;
    export let galleryObject: GalleryArt;
</script>

<div
    class="art-card {type === 'background'
        ? 'bg'
        : type === 'primary'
        ? 'primary'
        : 'search'} {index === 0 ? 'leading' : ''} {index === 2
        ? 'trailing'
        : ''}"
>
    <img
        src={galleryObject.images[0].previewURL}
        loading="eager"
        alt="{index} Image"
    />
    <div class="info">
        <span>
            <h4>{galleryObject.title}</h4>
            <h5>{galleryObject.artist}</h5>
        </span>

        <span class="links">
            <a href={galleryObject.url} target="_blank">Source</a>
            <a href="/survey/s/{galleryObject.id}">Survey</a>
        </span>
    </div>
</div>

<style>
    @media only screen and (min-width: 1280px) {
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
            padding: 1rem;
        }
    }

    @media only screen and (max-width: 1280px) {
        .art-card {
            will-change: transform, height, opacity;
            width: 15rem;
            height: 22rem;
            background-color: white;
            border-radius: 25px;
            margin: 0;
            transition: 0.2s ease;
            z-index: 1;
            display: flex;
            flex-direction: column;
            padding: 1rem;
        }
    }

    .art-card img {
        border-radius: 20px;
        min-height: 15rem;
        object-fit: cover;
    }

    .art-card .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        color: black;
    }

    .art-card .info * {
        margin: 0;
        padding: 0;
    }

    .art-card .info h4 {
        padding-top: 1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .art-card .info h5 {
        padding-top: 0.5rem;
        font-weight: normal;
    }

    .art-card .info .links {
        display: inline-flex;
        justify-content: space-between;
    }

    .art-card .info a {
        /* width: 35%; */
        background-color: #f4d3b8;
        color: #3e01b4;
        border: none;
        border-radius: 10px;
        padding: 0.5rem;
        text-align: center;
        text-decoration: none;
        transition: 0.2s ease;
    }

    .art-card .info a:hover {
        background-color: #3e01b4;
        color: #f4d3b8;
        cursor: pointer;
    }

    .art-card.bg,
    .search {
        transform: scale(0.9);
        filter: brightness(95%);
        box-shadow: 0px 2px 5px lightgray;
    }

    @media only screen and (max-width: 1024px) {
        .art-card.bg {
            display: none;
            /* margin: -10rem; */
            /* z-index: 0; */
        }
    }

    .art-card.bg:hover,
    .search:hover {
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
