<script>
    const rowLength = 5;
    const rowNum = 6;
</script>

<div id="board">
    {#each Array(rowNum) as _, row}
        <div class="row">
            {#each Array(rowLength) as _, key}
                <div class="slot">
                    <p class="letter">{key}</p>
                </div>
            {/each}
        </div>
    {/each}
</div>

<style>
    #board {
        display: flex;
        flex-direction: column;
    }
    .row {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .slot {
        border: 2px solid lightgrey;
        margin: .15rem;
        box-sizing: border-box;
        aspect-ratio: 1 / 1;
        width: 3.9rem;
        position: relative;
    }
    .letter {
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        font-size: 2rem;
        text-transform: uppercase;
    }
</style>