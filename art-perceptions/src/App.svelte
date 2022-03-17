<script lang="ts">
    import Content from "./lib/Content.svelte";
    import NavigationBar from "./lib/NavigationBar.svelte";
</script>

<main>
    <!-- <div> -->
    <NavigationBar />
    <Content />
    <!-- </div> -->
</main>

<style>
    :root {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }

    * {
        /* Offset Parent Margin */
        margin: -8px;
    }
</style>
