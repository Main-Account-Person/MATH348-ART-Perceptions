<script lang="ts">
</script>

<div class="NavBar">
    <h1>Art Perceptions</h1>
    <div class="NavigationLinks">
        <a href="https://www.thegundgallery.org/">Home</a>
        <a href="https://www.thegundgallery.org/">Survey</a>
        <a href="https://www.thegundgallery.org/">Results</a>
    </div>
</div>

<style>
    .NavBar {
        background-color: #9575cd;
        margin: 0;
        padding: 0;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        position: sticky;
        top: 0px;
    }

    .NavBar * {
        padding: 0 4rem;
    }

    .NavigationLinks {
        display: flex;
        margin: 0rem;
        justify-content: space-evenly;
        align-items: center;
    }

    .NavigationLinks a {
        padding: 0;
        margin: 0 1rem;
        text-decoration: none;
        color: black;
    }

    .NavigationLinks a:hover {
        color: white;
    }
</style>
