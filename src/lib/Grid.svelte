
<script>
    import { onMount } from "svelte";
    import { elasticOut } from "svelte/easing";
    import { keyboardLetters, colors } from "./store.js";

    async function ChooseWord() {
        const res = await fetch("wordle-list.malted.dev/choice");
        const json = res.json();
        return json.word;
    }

    const targetWord = ChooseWord();
    
    const rowLength = 5;
    const rowNum = 6;

    let currentRow = 0;
    let currentTile = -1;

    let gridContent = Array.from(Array(rowNum), () => new Array(rowLength));

    let tiles;
    onMount(async () => {
        tiles = document.getElementsByClassName("tile");
    });

    document.addEventListener("keydown", async (event) => {
        console.log(event);
        await KeyPress(event.key);
    })

    async function KeyPress(key) {
        tiles[0].classList.add("flip");
        if (currentRow > rowNum) return;
        if (!keyboardLetters.flat().includes(key)) return;
        
        if (key === "Backspace") {
            gridContent[currentRow][currentTile] = "\xa0"
            if (currentTile >= 0) currentTile--;
            return;
        }

        if (key === "Enter") {
            if (currentTile === rowLength - 1) {
                await CheckWord(gridContent[currentRow].join(''));
            } 
        } else {
            if (currentTile < rowLength - 1) {
                currentTile++;
                gridContent[currentRow][currentTile] = key;
            }
        }
        console.log(currentTile + key);
    }

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    async function CheckWord(word) {       
        const res = await fetch("https://wordle-list.malted.dev/valid?word=" + word);
        const json = await res.json();
        if (!json.valid) {
            alert("Invalid guess");
            return;
        }
        for (let tile = 0; tile < rowLength; tile++) {
            let tileColor;
            if (targetWord[tile] === word[tile]) {
                tileColor = colors.correct;
            } else if (targetWord.includes(word[tile])) {
                tileColor = colors.present;
            } else {
                tileColor = colors.absent;
            }
            const t = (currentRow * rowLength) + tile;
            console.log(currentRow)
            console.log(rowLength)
            console.log(tile)
            console.log(t)
            console.log()
            tiles[t].style.backgroundColor = tileColor;
            tiles[t].style.borderColor = tileColor;
            
            await delay(250);
        }

        currentRow++;
        currentTile = -1;
    }
</script>

<div id="board-container">
    <div id="board">
        {#each Array(rowNum) as _, row}
            {#each Array(rowLength) as _, tile}
                <div class="tile">
                    <p class="letter">
                        {gridContent[row][tile] ?? "\xa0"}
                    </p>
                </div>
            {/each}
        {/each}
    </div>
</div>

<style>
    #board-container {
        display: flex;
        flex-direction: row;
        align-self: center;
        justify-content: center;
        max-width: 30rem;
        height: 100%;
        padding: .5rem;
    }
    #board {
        height: 100%;
        max-height: 400px;
        aspect-ratio: 330/400;
        margin: auto;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: .3rem;
    }
    /* https://css-tricks.com/controlling-css-animations-transitions-javascript/ */
    .tile { 
        border: 2px solid lightgrey;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: scaleY(1);
        transition: transform 0.4s ease;
    }
    .tile.correct {
        background-color: var(--col-correct);
    }
    .letter {
        text-transform: uppercase;
        margin: 0;
        font-size: 2rem;
    }
    @media (max-height: 600px) {
        .letter {
            font-size: 1rem;
        }
    }
</style>