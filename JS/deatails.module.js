import { UIGameDetails } from "./ui.module.js";
export class detailedgamecls {
  constructor(id) {
    this.id = id;
  }
  async createGameDetailsCard(selector) {
    if (!selector) return;
    const gamejsoninfo = await this.fetchGame();
    if (!gamejsoninfo) return;
    const uiGameDetails = new UIGameDetails(gamejsoninfo, selector);
    uiGameDetails.createGameDetailsCard();
    const closeicon = document.querySelector(".fa-xmark");
    if (closeicon) {
      closeicon.addEventListener("click", this.closeDetails.bind(this));
    }
  }
  async fetchGame() {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${this.id}`;
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

  closeDetails() {
    // Implement your logic to close the details card, e.g.:
    const detailsCard = document.querySelector(".game-details-card");
    if (detailsCard) {
      detailsCard.remove();
    }
  }
}
