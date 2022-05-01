<script lang="ts">
</script>

<div class="NavBar">
    <h1><a href="/">Art Perceptions</a></h1>
    <nav class="NavigationLinks">
        <a href="/">Home</a>
        <a href="/survey">Survey</a>
        <a href="/results">Results</a>
    </nav>
</div>

<style>
    .NavBar {
        background-color: clear;
        margin: 0;
        padding: 0;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        position: sticky;
        top: 0px;
        z-index: 2;
    }

    /* .NavBar * {
        padding: 0 4rem;
    } */

    .NavBar a {
        padding: 0;
        padding-left: 5rem;
        color: white;
        text-decoration: none;
        transition: all 0.2s ease 0s;
    }

    .NavBar a:hover {
        color: #f4d3b8;
    }

    .NavigationLinks {
        display: flex;
        margin: 0rem;
        padding-right: 5rem;
        justify-content: space-evenly;
        align-items: center;
    }

    .NavigationLinks a {
        padding: 0;
        margin: 0 1rem;
        text-decoration: none;
        color: white;
        transition: all 0.2s ease 0s;
    }

    .NavigationLinks a:hover {
        color: #f4d3b8;
    }
</style>
