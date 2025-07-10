// File: JS/index.js
import { UIGames, UIGameDetails } from "./ui.module.js";
// import { fetchGames } from './games.module.js'; لو عامل API logic هناك
// import { UIGameDetails } from './deatails.module.js'; لو محتاج تفاصيل

document.addEventListener("DOMContentLoaded", () => {
  const url =
    "https://free-to-play-games-database.p.rapidapi.com/api/games?category=shooter";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "959a605f60msh4639c2a29781422p12f2c0jsn8dfa35698361",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  const rowContainer = document.querySelector(".row");

  // Add event listeners to all cards after they are rendered
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
        document.body.style.overflow = "hidden";
        const currentgame = document.querySelector(".current-game");
        currentgame.style.display = "block";
        // remove d-none
        currentgame.classList.remove("d-none");
        const gameDetailedInfo = document.querySelector(".game-detailed-info");

        // هنا ممكن تضيف منطق لعرض تفاصيل اللعبة
        const uiGameDetails = new UIGameDetails(gamejsoninfo);
        gameDetailedInfo.innerHTML = uiGameDetails.createGameDetailsCard();
        const closeicon = document.querySelector(".fa-xmark");
        if (closeicon) {
          closeicon.addEventListener("click", closeDetails);
        }
      });
    });
  }

  async function fetchGames() {
    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (rowContainer) {
        const uiGames = new UIGames(result);
        rowContainer.innerHTML = uiGames.createGameCard().join("");
        addCardEventListeners(); // Add this line
      } else {
        console.error("Container `.row` not found.");
      }
    } catch (error) {
      console.error(error);
    }
  }

  fetchGames();
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

function closeDetails() {
  document.querySelector(".current-game").style.display = "none";
  document.body.style.overflow = "auto";
  console.log("sdf");
}
