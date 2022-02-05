<script>
    import backspace from "../assets/backspace.svg";
    
    const rows = [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"]
    ];
</script>

<div id="keyboard">
    {#each rows as row}
        <div class="row">
            {#each row as key}
                <button>
                    {#if key === "backspace"}
                        <img src={backspace}>
                    {:else}
                        {key}
                    {/if}
                </button>
            {/each}
        </div>
    {/each}
</div>

<style>
    * {
        --text-size: 1rem;
    }
    button {
        text-transform: uppercase;
        color: black;
        background-color: lightgrey;
        border: none;
        border-radius: 4px;
        font-size: var(--text-size);
        /* ... */
        height: 3.5rem;
        text-align: center;
        margin: .2rem;
        flex: 1 1 0;
    }
    #keyboard {
        display: flex;
        flex-direction: column;
        max-width: 500px;
    }
    .row {
        display: flex;
        justify-content: center;
    }
    button > img {
        height: var(--text-size);
        vertical-align: text-bottom;
    }
</style>