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



const navlink = document.querySelectorAll(".nav-link");
// When click on any nav, call fetchGames with the nav link's text content as the parameter
if (navlink) {
  navlink.forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      console.log(event);
      fetchGames(link.textContent.trim().toLowerCase());
    });
  });
}