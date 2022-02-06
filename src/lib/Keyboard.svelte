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
        --text-size: .8rem;
        --key-margin: .2rem;
    }
    #keyboard { /* The whole keyboard */
        display: flex;
        flex-direction: column;
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
        padding: 0;
        cursor: pointer;
        
        height: 3.5rem;
        text-transform: uppercase;
        text-align: center;
        margin: var(--key-margin);

        flex: 1 1 0;
        
        /* Stops double tap to zoom in on mobile devices */
        touch-action: manipulation; 
    }
    .half {
        --grow-value: .5;
        flex-grow: var(--grow-value);
        margin: calc(var(--key-margin) * var(--grow-value));
    }
    .one-and-a-half {
        --grow-value: 1.5;
        flex-grow: var(--grow-value);
        margin-left: calc(var(--key-margin) * var(--grow-value));
        margin-right: calc(var(--key-margin) * var(--grow-value));
    }
    button > img { /* The backspace icon */
        height: calc(var(--text-size) * 1.5);
        vertical-align: text-bottom;
    }
</style>