<div id="header">
	<div class="menu">
		<img src="../assets/header/icons/menu.svg" alt="Hamburger menu icon" />
		<img src="../assets/header/icons/help.svg" alt="Help icon" />
	</div>
	<h1>Wordle</h1>
	<div class="menu">
		<img src="../assets/header/icons/leaderboard.svg" alt="Leaderboard icon" />
		<img src="../assets/header/icons/settings.svg" alt="Settings icon" />
	</div>
</div>

<style>
    @font-face {
        font-family: Karnak;
        src: url("../assets/header/karnak.woff2") format("woff2");
    }
    #header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid lightgrey;
        height: 3.1rem;
        padding: 0 1rem;
    }
    .menu > img {
        padding: .25rem;
    }
    h1 {
        font-family: Karnak;
        font-size: 2.3rem;
    }
</style>