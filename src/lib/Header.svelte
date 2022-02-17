<script>
    import help from "../assets/header/help.svg";
    import leaderboard from "../assets/header/leaderboard.svg";
    import menu from "../assets/header/menu.svg";
    import settings from "../assets/header/settings.svg";
</script>

<div id="header">
    <div class="menu">
        <img src={menu}>
        <img src={help}>
    </div>
    <h1>Wordle</h1>
    <div class="menu">
        <img src={leaderboard}>
        <img src={settings}>
    </div>
</div>

<style>
    @font-face {
        font-family: Karnak;
        src: url("../assets/karnak.woff2") format("woff2");
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
        font-weight: 700;
        font-size: 37px;
        line-height: 100%;
        letter-spacing: 0.01em;
    }
</style>