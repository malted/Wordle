import { writable } from "svelte/store";

export const gridContent = writable('');

export const keyboardLetters = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
];

export const colors = {
    correct: "#6aaa64",
    present: "#c9b458",
    absent: "#787c7e",
};
