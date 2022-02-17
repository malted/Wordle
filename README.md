# Making A Wordle Clone In Svelte

## Header
Let's start off with our first component: the page's header.
The main role of this is to display the game's name, along with some icon buttons for things like settings and help et cetera.

Now let's use it in our component.
To do this, we first need to import the font. To do this, we will use a CSS at-rule. At-rules are CSS statements that instruct CSS how to behave, as opposed to ones that style markup.
```css
@font-face {
    font-family: Karnak;
    src: url("../assets/karnak.woff2") format("woff2");
}
```
Here, `font-family` is the name we give the newly imported font. It could be anything we choose.
Meanwhile, `src` is file that contains the font. We're using two CSS functions here; `url()` simply points the browser to a file location, while `format()`, as the name suggests, gives the browser a hint on what type of font format said file is. While it's not strictly needed, it's good practice to anyway.

<blockquote>
<details>
<summary><b>Couldn't the browser simply infer the file format from the file name's ending?</b></summary>
No! A file extension is just a part of the file name. It doesn't do anything special by itself. On Windows, this is not obvious as the file extension specifies the program to be used to open the file. This is an example of the operating system abstracting information away from the user. TODO: say how this can be unhelpful in teaching people about files, and how GNU/Linux tends to handle this differently.

To demonstrate this point, I could rename a picture from `font.woff2` to `image.png`. This does not affect the file contents and we could still use it as a font in the same way: `src: url("image.png") format("woff2");`

*TL;DR* - A file's name does not guarantee the type of information it contains. This is why the `format()` method is useful for specifying the format of the file explicitly.
</details>
</blockquote>
<br>

![The original game's header](./guide/assets/header/wordle-header.png)
[Title font download link](https://www.nytimes.com/games/wordle/fonts/karnakcondensed-normal-700.woff2)

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
Next, we are going to construct the HTML. Instances like this is when the power of Svelte becomes clear. We're going to generate the HTML using Svelte's `{#each}` block.
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
![An unstyled HTML keyboard with the backspace key labelled as backspace](./guide/assets/keyboard/keyboard-nobackspace.png)

Let's improve that backspace key. I think a backspace icon would work better in place of the word "backspace".
I found one I liked on [Google Icons](https://fonts.google.com/icons?icon.query=backspace).
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
> **I told you Svelte was powerful!**

To get the icon centering correctly in the key, we only need a few lines of CSS. To keep things clean, the value used for the button's `font-size` property and the SVG's `height` have been extracted and used as variables. Let's also explicitly set the keys' font sizes with the same variable.
```css
* {
    --text-size: 1rem;
}
button {
    font-size: var(--text-size);
}
button > img {
    vertical-align: text-bottom;
    height: var(--text-size);
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
While this won't change how the keyboard looks at the moment, it explicity tells the browser to render each row of the keyboard below the last.
(If you want to learn more about flexbox, CSS-Tricks has a [great cheatsheet](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).)

Next, let's look at each row.
We want the keys to be displayed next to each other, from left to right. This can be achieved by setting the `flex-direction` to `row`, but since that is the default option we don't need to include it in our rule. Centering the row with `justify-content` will place the row in the middle of the keyboard as opposed to squashed up against the left edge.
```css
.row {
    display: flex;
    justify-content: center;
}
```
> **Notice how I have used an ID for the whole keyboard, and a class for the rows? ID's are usually used to refer to single elements, while classes are best used on multiple elements.**

Let's make those buttons look better!

Different operating systems and browsers choose to render default HTML elements - like buttons - differently. Let's remove the default styling on them and make the buttons look the way we want.
```css
button {
    cursor: pointer;
    text-transform: uppercase;
    color: black;
    background-color: lightgrey;
    border: none;
    border-radius: 4px;
    font-size: var(--text-size);
    padding: 0;
}
```
Our keyboard now looks like this:
![The basically-styled keyboard with no gaps between the spaces](./guide/assets/keyboard/keyboard-basic-styling.png)
> **Ok; it's getting better.**

Next let's space things out a bit. The keys are all cramped together - this can be fixed with a simple `margin` on each key. There's also not much space around the letters on each key. While one way to do this would be to introduce a `padding` on the keys, we're going to take a different approach. By leveraging features of flexbox, we can make the keyboard act in a more responsive way across changing screen sizes. Let's add some declarations to the `button` rule we already have.
```css
button {
    /* ... */
    height: 3.5rem;
    text-align: center;
    margin: .2rem;
    flex: 1 1 0;
}
```
The most interesting property here is `flex`. It's a 3-in-1 value pack; bundling `flex-grow`, `flex-shrink` and `flex-basis` properties into a single property. The one we are most interested in is `flex-grow`. This makes each item in the flexbox - i.e. each key - grow to take up the available space. Since our rows' `flex-direction`s are set to `row` - as is default - they grow widthways. This lets the keys grow and shrink to fill the space available to them.

> **Try resizing your viewport!**

Our keyboard in its full width:
![A screenshot of the Replit web preview showing the keyboard taking its full width](./guide/assets/keyboard/keyboard-reactivity-1.png)
The same page, with the viewport resized to show the dynamic resizing in action: 
![A screenshot of the Replit web preview showing the keyboard dynamically resizing to fit the viewport width](./guide/assets/keyboard/keyboard-reactivity-2.png)

> **The concept of reactivity is one of the most important considerations you should have as a web developer. According to data analysis firm Statistica, over half of the internet's traffic in 2021 was from smartphones. By not being mindful of this when developing websites, you could be driving a significant proportion of your users away.**

Our keyboard is looking a bit too ortholinear for my liking. If you count the number of keys on the middle row of your keyboard versus the top, you will find there is one less. Let's account for this in our keyboard by inserting two half-key sized spaces at either end of the row to make up a whole key's width.
We are doing this for two reasons;
* To push the keys on the second row inwards, more accurately mirroring a real world keyboard.
* To introduce an extra key's worth of space to make the middle row keys the same width as the top row keys.

To do this, we are going to insert a div before the "a" key, and one after the "l" key. Then, we can give them a width of half a normal key.
```html
<!-- ... -->
{#each row as key}
    {#if key === "a"}
        <div class="half"></div>
    {/if}
    <button>
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
<!-- ... -->
```
Let's specify the rule in our CSS:
```css
.half {
    flex-grow: .5;
}
```

Good news! We are ever so nearly done. All that's left is to make the enter and backspace keys the correct width.
As they are ✨special✨ keys, they are traditionally 1.5x the width of normal letter keys.
To implement this, we need a way to target them in the CSS. Let's add a utility class to them with a ternary statement.
```html
<button class={key === "enter" || key === "backspace" ? "one-and-a-half" : ""}>
```
If the current key is "enter" or "backspace", the `one-and-a-half` class will be added to the button. If it isn't, the button will remain classless.

Now we can change the width of our special keys. Let's make them grow by 1.5x the amount of the normal keys.
```css
.one-and-a-half {
    flex-grow: 1.5;
}
```
<blockquote>
<details>
<summary><b>Why are some keys bigger than others?</b></summary>
You have a keen eye! Since we have inserted two divs at either end of the row, but we are still applying the same margin as the normal keys, there is an extra keys worth of margin in that row. Luckily, this is a simple fix; just half the margin on these keys.
    
<pre><code>.half {
    flex-grow: .5;
    margin: .1rem;
}
</code></pre>
The same thing is happening with our keys on the bottom row, but in reverse! Instead of halving the margin on our enter and backspace keys, let's increase it by a half.   
<pre><code>.one-and-a-half {
    flex-grow: 1.5;
    margin: .3rem
}
</code></pre>
</details>
</blockquote>
<br>

### A note on touch devices

Navigate to the page on a mobile device. Say you wanted to type a letter twice; the natural thing to do would be to double tap on the corresponding button, right? Although you are wanting this to mean 2 separate taps in quick succession, most mobile browsers will interpret this as a *zoom in* gesture.

Because it is very unlikely that a user who double taps a key is wanting to zoom in, let's disable this feature.

On our main keyboard CSS rule, let's add the following line;
```css
#keyboard {
    /* ... */
    touch-action: manipulation;
}
```

### Closing thoughts - dynamic measurements
Alright. Our keyboard is looking awesome! But - hang on. I have decided that I don't like the size of the text inside the buttons. Seems like a simple fix to change it, right? One would think it would be as simple as changing the `font-size` property on our `button` rule.

However, now that we have made that change, other values that we have decided on based on that font size now look disproportionate. The two that stick out to me the most are the filler divs' margins, and the backspace icon's height. Let's change that.

First, let's define a variable so we can use it in any rule in our component.
```css
* {
    --text-size: .8rem;
    --key-margin: .2rem;
}
```
Next, let's replace our `button`'s margin with this variable.
```css
button {
    /* ... */
    margin: var(--key-margin);
}
```
Finally, we can introduce our dynamic values. We're going to use CSS' powerful `calc` method.
```css
.half {
    /* ... */
    margin: calc(var(--key-margin) * 0.5);
}
.one-and-a-half {
    /* ... */
    margin: calc(var(--key-margin) * 1.5);
}
button > img {
    /* ... */
    height: calc(var(--text-size) * 1.5);
}
```

We don't want to push down our larger buttons though. Not only are we increasing their horizontal margin, we're increasing their vertical one too. We want the vertical margin to stay the same.
![Screenshot of Firefox devtools showing the enter and backspace keys pushed below the other keys on the bottom row](./guide/assets/keyboard/margin-bad-devtools.png)
To do this, we can simply set the left and right margins to our calculated value. The top and bottom margins will cascade down from our button rule, and stay as the value of `--key-margin`.
```css
.one-and-a-half {
    margin-left: calc(var(--key-margin) * 1.5);
    margin-right: calc(var(--key-margin) * 1.5);
}
```
One more thing. Too avoid repeating ourselves and to make it more obious which valuemeans what, we can extract our multiplicand values to a local variable. Our full rules for `.half` and `.one-and-a-half` will now look like this:
```css
.half {
    --grow-value: .5;
    flex-grow: var(--grow-value);
    margin: calc(var(--key-margin) * var(--grow-value));
}
.one-and-a-half {
    --grow-value: 1.5;
    flex-grow: var(--grow-value);;
    margin-left: calc(var(--key-margin) * var(--grow-value));
    margin-right: calc(var(--key-margin) * var(--grow-value));
}
```
![Screenshot of Firefox devtools showing the enter and backspace keys at the same vertical level as the other keys on the bottom row](./guide/assets/keyboard/margin-good-devtools.png)
Perfect!


### Final result
Our keyboard:
![A screenshot of the final styled keyboard](./guide/assets/keyboard/keyboard-final.png)

Wordle keyboard:
![A screenshot of the official Wordle keyboard](./guide/assets/keyboard/keyboard-wordle.png)

I would say that's looking pretty spot on!

Later on, we will be expanding on this keyboard, and making it better than the one in the original game, using features like CSS *pseudo-classes*, and Svelte's `motion` library.
