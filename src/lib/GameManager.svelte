<!-- 
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
</script> -->