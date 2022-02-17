<script>
    import Header from "./lib/Header.svelte"
    import Board from "./lib/Grid.svelte"
    import Keyboard from "./lib/Keyboard.svelte";
</script>

<main>
    <Header />
    <Board />
    <Keyboard />
</main>

<style>
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
