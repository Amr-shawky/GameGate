// File: JS/index.js
import{displaygames} from "./games.module.js";

document.addEventListener("DOMContentLoaded", () => {
  const gameDisplay = new displaygames("mmorpg");
  gameDisplay.createGameCard(".row");
});
