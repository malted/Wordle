## Keyboard
Let's make a new component in `/src/lib/`, called `Keyboard.svelte`.
First, we need to define the letters that each key will contain. I'm going to make an array containing three arrays; one for each row of the keyboard.
```js
const rows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"]
];
```
Next, we are going to construct the HTML. Instances like this is when the power of Svelte becomes obvious. We're going to generate the HTML using Svelte's `{#each}` block.
```html
<div id="keyboard">
    {#each rows as row}
        <div class="row">
            {#each row as key}
                <button>
                    {key}
                </button>
            {/each}
        </div>
    {/each}
</div>
```
Here, `row` will be the array in `rows` we are currently on, and `key` will be the current value in `row`.

This will cause our component to look like this:
![An unstyled HTML keyboard with the backspace key labelled as backspace](./assets/keyboard/keyboard-nobackspace.png)

Let's improve that backspace key. I think a backspace icon would work better in place of the word "backspace".
I found one I liked on [Google Icons](https://fonts.google.com/icons?icon.query=backspace) (I chose the `18dp` size).
Download it, then drag the file into the `Files` panel in Replit -
to keep things organised, I put it in `/src/assets`.

Alright! Let's implement it into our keyboard.

First, import the image into the component:
```js
import backspace from "../assets/backspace.svg";
```
We want to put the SVG into the button which would have contained the text "backspace". Let's do this using Svelte's `{#if}` block, like so:
```html
<button>
    {#if key === "backspace"}
        <img src={backspace}>
    {:else}
        {key}
    {/if}
</button>
```
To get the icon centering correctly in the key, we only need a few lines of CSS. To keep things clean, the value used for the button's `font-size` property and the SVG's `height` have been extracted and used as variables.
```css
* {
    --text-size: 1rem;
}
button {
    font-size: var(--text-size);
}
button > img {
    height: var(--text-size);
    vertical-align: text-bottom;
}
```
Now the backspace key is in place, we can style the buttons to make them look like Wordle's. Here we are going to use flexbox, as it's very powerful and enables us to get the results we want easily.

First, let's make the whole keyboard a flexbox. This will allow us to decide what happens to each row on the keyboard.
```css
#keyboard {
    display: flex;
    flex-direction: column;
    max-width: 500px;
}
```
This rule tells the browser to render each row of the keyboard below the last.
If you want to learn more about flexbox, CSS-Tricks has a [great cheatsheet](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

Next, let's look at each row.
We want the keys to be displayed next to each other, from left to right. This can be achieved by setting the `flex-direction` to `row`, but since that is the default option we don't need to include it in our rule. Centering the row with `justify-content` will place the row in the middle of the keyboard as opposed to squashed up against the left edge.
```css
.row {
    display: flex;
    justify-content: center;
}
```
> Notice how I have used a class for the rows and an ID for the whole keyboard? Classes are best used on multiple elements, while ID's are usually used to refer to single elements.

Let's make those 

```css

```



Make the enter and backspace keys the correct width. As they are ✨special✨ keys, they are traditionally 1.5x the width of normal letter keys.
To implement this, we need a way to target them in the CSS. Let's add a utility class to them.
```html
<button class={key === "enter" || key === "backspace" ? "one-and-a-half" : ""}>
    {#if key === "backspace"}
        <img src={backspace}>
    {:else}
        {key}
    {/if}
</button>    
```
If the current key is "enter" or "backspace", the `one-and-a-half` class will be added to the button. If it isn't, the button will remain classless.

Now we can change the width of our special keys. Let's make them grow by 1.5x the amount of the normal keys.
```css
.one-and-a-half {
    flex-grow: 1.5;
}
```

### Final result
![A screenshot of the final styled keyboard](./assets/keyboard/keyboard-final.png)
<br>
![A screenshot of the official Wordle keyboard](./assets/keyboard/keyboard-wordle.png)