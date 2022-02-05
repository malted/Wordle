<script>
    import backspace from "../assets/backspace.svg";
    
    const rows = [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"],
    ]
</script>

<div id="keyboard">
    {#each rows as row}
        <div class="row">
            {#each row as key}
                {#if key === "a"}
                    <div class="half"></div>
                {/if}
                <button class={key === "enter" || key === "backspace" ? "one-and-a-half" : ""}>
                    {#if key === "backspace"}
                        <img src={backspace}>
                    {:else}
                        {key}
                    {/if}
                </button>
                {#if key === "l"}
                    <div class="half"></div>
                {/if}
            {/each}
        </div>
    {/each}
</div>

<style>
    * {
        --text-size: 1rem;
    }
    #keyboard { /* The whole keyboard */
        display: flex;
        flex-direction: column;
        max-width: 500px;
    }
    .row { /* Each keyboard row */
        display: flex;
        justify-content: center;
    }
    button { /* Each key */
        text-transform: uppercase;
        color: black;
        background-color: lightgrey;
        border: none;
        border-radius: 4px;
        font-size: var(--text-size);
        
        height: 3.5rem;
        text-transform: uppercase;
        text-align: center;
        margin: .2rem;

        flex: 1 1 0;

        /* Stops double tap to zoom in on mobile devices */
        touch-action: manipulation; 
    }
    .half {
        flex-grow: .5;
    }
    .one-and-a-half {
        flex-grow: 1.5;
    }
    button > img { /* The backspace icon */
        height: var(--text-size);
        vertical-align: text-bottom;
    }
</style>