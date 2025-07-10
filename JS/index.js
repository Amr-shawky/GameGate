// File: JS/index.js
import { UIGames, UIGameDetails } from "./ui.module.js";
import{} from "./games.module.js";

document.addEventListener("DOMContentLoaded", () => {
  fetchGames("mmorpg");
});

async function fetchGame(id) {
  const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "959a605f60msh4639c2a29781422p12f2c0jsn8dfa35698361",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

function addCardEventListeners() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", async (event) => {
      const gameId = event.currentTarget.getAttribute("data-id");
      const gamejsoninfo = await fetchGame(gameId);
      /*
       */
      console.log(gamejsoninfo);
    // Disable scrolling on the body
    // and make the scroll on the game details div only 
    // i want to make the scroll invisible in the game details div but still allow scrolling by keyboard
    // and mouse wheel
    document.body.style.overflow = "hidden";
    const gameDetailedInfo = document.querySelector(".game-detailed-info");
    if (gameDetailedInfo) {
        gameDetailedInfo.style.overflowY = "scroll";
        gameDetailedInfo.style.maxHeight = "95vh";
        gameDetailedInfo.style.scrollbarWidth = "none"; // For Firefox
        gameDetailedInfo.style.msOverflowStyle = "none"; // For IE and Edge
        // For Chrome, Safari and Opera
        gameDetailedInfo.style.setProperty("overflow", "scroll");
        gameDetailedInfo.style.setProperty("scrollbar-width", "none");
     
    }
      const currentgame = document.querySelector(".current-game");
      currentgame.style.display = "block";
      // remove d-none
      currentgame.classList.remove("d-none");

      // هنا ممكن تضيف منطق لعرض تفاصيل اللعبة
      const uiGameDetails = new UIGameDetails(gamejsoninfo , gameDetailedInfo);
      uiGameDetails.createGameDetailsCard();
      const closeicon = document.querySelector(".fa-xmark");
      if (closeicon) {
        closeicon.addEventListener("click", closeDetails);
      }
    });
  });
}

function closeDetails() {
  document.querySelector(".current-game").style.display = "none";
  document.body.style.overflow = "auto";
  console.log("sdf");
}

async function fetchGames(type) {
  const url =
    `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${type}`;
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
      fetchGames(category);
    });
  });
}
