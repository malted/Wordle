<script>
    const rowLength = 5;
    const rowNum = 6;
</script>

<div id="grid-container">
    <table>
        {#each Array(rowNum) as _, row}
            <tr>
                {#each Array(rowLength) as _, tile}
                <td>
                    <p class="letter">
                        <!-- {gridContent[row][tile] ?? "\xa0"} -->
                        {tile} <!-- For debugging -->
                    </p>
                </td>
                {/each}
            </tr>
        {/each}
    </table>
</div>

<style>
    #grid-container {
        height: 100%;
        display: flex;
    }
    table {
        border-spacing: .3rem;
        text-align: center;
        margin: auto;
        height: 100%;
        max-height: 25rem;
        max-width: 34.375rem;
    }
    td {
        border: 2px solid lightgrey;
        padding: 0;
        margin: 0;
    }
    td.correct {
        background-color: var(--col-correct);
    }
    .td.present {
        background-color: var(--col-present);
    }
    .td.absent {
        background-color: var(--col-absent);
    }
    .letter {
        margin: 0;
        padding: 0;
        font-size: 2rem;
        text-transform: uppercase;
    }
    @media (max-height: 600px) {
        .letter {
            font-size: 1rem;
        }
    }
</style>