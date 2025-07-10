import { UIGames } from "./ui.module.js";
import { detailedgamecls } from "./deatails.module.js";

export class displaygames{

    constructor(type) {
        this.type = type;
    }
    createGameCard(selector) {
        if (!selector) return;
        this.fetchGames(this.type);
        const uiGames = new UIGames(this.games, selector);
        uiGames.createGameCard();
        addCardEventListeners();
    }
    async fetchGames() {
  const url =
    `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${this.type}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "959a605f60msh4639c2a29781422p12f2c0jsn8dfa35698361",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  const rowContainer = document.querySelector(".row");

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (rowContainer) {
      const uiGames = new UIGames(result , rowContainer);
      uiGames.createGameCard();
      addCardEventListeners(); // Add this line
    } else {
      console.error("Container `.row` not found.");
    }
  } catch (error) {
    console.error(error);
  }
}

}

function addCardEventListeners() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", async (event) => {
      const gameId = event.currentTarget.getAttribute("data-id");
      const gamejsoninfo = new detailedgamecls(gameId).fetchGame();
      /*
       */
      console.log(gamejsoninfo);
    // Disable scrolling on the body
    // and make the scroll on the game details div only 
    // i want to make the scroll invisible in the game details div but still allow scrolling by keyboard
    // and mouse wheel
    const gameDetailedInfo = document.querySelector(".game-detailed-info");
    const currentgame = document.querySelector(".current-game");
      
      // هنا ممكن تضيف منطق لعرض تفاصيل اللعبة
      const detailedGame = new detailedgamecls(gameId);
      await detailedGame.createGameDetailsCard(gameDetailedInfo);
      // Wait for the DOM to update before selecting the close icon
      setTimeout(() => {
        const closeicon = document.querySelector(".fa-xmark");
        if (closeicon) {
            closeicon.addEventListener("click", closeDetails);
        } else {
            console.error("Close icon not found.");
        }
    }, 0);
        document.body.style.overflow = "hidden";
    if (gameDetailedInfo) {
        gameDetailedInfo.style.overflowY = "scroll";
        gameDetailedInfo.style.maxHeight = "95vh";
        gameDetailedInfo.style.scrollbarWidth = "none"; // For Firefox
        gameDetailedInfo.style.msOverflowStyle = "none"; // For IE and Edge
        // For Chrome, Safari and Opera
        gameDetailedInfo.style.setProperty("overflow", "scroll");
        gameDetailedInfo.style.setProperty("scrollbar-width", "none");
     
    }

    currentgame.style.display = "block";
    // remove d-none
    currentgame.classList.remove("d-none");
    });
  });
}

function closeDetails() {
  const currentGame = document.querySelector(".current-game");
  if (currentGame) {
    currentGame.style.display = "none";
  }
  document.body.style.overflow = "auto";
}


const navLinks = document.querySelectorAll(".nav-link");
if (navLinks) {
  navLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // من غير ما الصفحة تعمل reload

      // 1. Remove 'active' from all links
      navLinks.forEach(l => l.classList.remove("active"));

      // 2. Add 'active' to the clicked link
      link.classList.add("active");

      // 3. Get the category text
      const category = link.textContent.trim().toLowerCase();

      // 4. Call your game fetch function with the selected category
      const gameDisplayer = new displaygames(category);
      gameDisplayer.fetchGames();
    });
  });
}
