<script>
    import help from "../assets/header/icons/help.svg";
    import leaderboard from "../assets/header/icons/leaderboard.svg";
    import menu from "../assets/header/icons/menu.svg";
    import settings from "../assets/header/icons/settings.svg";
</script>

<div id="header">
	<div class="menu">
		<img src="{menu}" alt="Hamburger menu icon" />
		<img src="{help}" alt="Help icon" />
	</div>
	<h1>Wordle</h1>
	<div class="menu">
		<img src="{leaderboard}" alt="Leaderboard icon" />
		<img src="{settings}" alt="Settings icon" />
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