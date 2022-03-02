<script>
    import { keyboardLetters } from "./store.js";
</script>

<div id="keyboard">
    {#each keyboardLetters as row}
        <div class="row">
            {#each row as key}
                {#if key === "a"}
                    <div class="half"></div>
                {/if}
                <button class={key === "Enter" || key === "Backspace" ? "one-and-a-half" : ""}>
                    {#if key === "Backspace"}
                        <img src="../assets/keyboard/backspace.svg" alt="Backspace icon">
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
    #keyboard {
        display: flex;
        flex-direction: column;
        align-self: center;
        width: 100%;
        max-width: 30rem;
    }
    .row {
        display: flex;
        justify-content: center;
    }
    button {
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