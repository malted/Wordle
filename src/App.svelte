<script>
    import Header from "./lib/Header.svelte"
    import Grid from "./lib/Grid.svelte"
    import Keyboard from "./lib/Keyboard.svelte";
</script>

<main>
    <Header />
    <Grid />
    <Keyboard />
</main>

<style>
    :global(:root) {
        --col-correct: rgb(106, 170, 100);
        --col-present: rgb(201, 180, 88);
        --col-absent: rgb(120, 124, 126);
    }
    :global(html, body, #app) {
        margin: 0;
        height: 100%;
    }
    :root {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
        overflow-y: hidden;
    }
    main {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }
</style>
