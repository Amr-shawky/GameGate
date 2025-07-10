// File: JS/ui.module.js

export class UIGames {
  constructor(games) {
    this.games = games;
  }

  createGameCard() {
    return this.games.map((game) => {
      const { id, title, thumbnail, short_description, genre, platform } = game;

      return `
        <div class="col">
          <div data-id="${id}" class="card h-100 bg-transparent" role="button">
            <div class="card-body">
              <figure class="position-relative">
                <img class="card-img-top object-fit-cover h-100" src="${thumbnail}" alt="${title} Thumbnail" />
                <figcaption>
                  <div class="hstack justify-content-between">
                    <h3 class="h6 small text-white">${title}</h3>
                    <span class="badge text-bg-primary p-2">Free</span>
                  </div>
                  <p class="card-text small text-center opacity-50 text-white">${short_description}</p>
                </figcaption>
              </figure>
            </div>
            <footer class="card-footer small hstack justify-content-between">
              <span class="badge badge-color">${genre}</span>
              <span class="badge badge-color">${platform}</span>
            </footer>
          </div>
        </div>
      `;
    });
  }
}
/*
details example

id:452
title:"Call Of Duty: Warzone"
thumbnail:"https://www.freetogame.com/g/452/thumbnail.jpg"
status:"Live"
short_description:"A standalone free-to-play battle royale and modes accessible via Call of Duty: Modern Warfare."
description:"Call of Duty: Warzone is both a standalone free-to-play battle royale and modes accessible via Call of Duty: Modern Warfare. Warzone features two modes — the general 150-player battle royle, and “Plunder”. The latter mode is described as a “race to deposit the most Cash”. In both modes players can both earn and loot cash to be used when purchasing in-match equipment, field upgrades, and more. Both cash and XP are earned in a variety of ways, including completing contracts. An interesting feature of the game is one that allows players who have been killed in a match to rejoin it by winning a 1v1 match against other felled players in the Gulag. Of course, being a battle royale, the game does offer a battle pass. The pass offers players new weapons, playable characters, Call of Duty points, blueprints, and more. Players can also earn plenty of new items by completing objectives offered with the pass."
game_url:"https://www.freetogame.com/open/call-of-duty-warzone"
genre:"Shooter"
platform:"Windows"
publisher:"Activision"
developer:"Infinity Ward"
release_date:"2020-03-10"
freetogame_profile_url:"https://www.freetogame.com/call-of-duty-warzone"
minimum_system_requirements:
    os:"Windows 7 64-Bit (SP1) or Windows 10 64-Bit"
    processor:"Intel Core i3-4340 or AMD FX-6300"
    memory:"8GB RAM"
    graphics:"NVIDIA GeForce GTX 670 / GeForce GTX 1650 or Radeon HD 7950"
    storage:"175GB HD space"
screenshots:
    0:
        id:1124
        image:"https://www.freetogame.com/g/452/Call-of-Duty-Warzone-1.jpg"
    1:
        id:1125
        image:"https://www.freetogame.com/g/452/Call-of-Duty-Warzone-2.jpg"
    2:
        id:1126
        image:"https://www.freetogame.com/g/452/Call-of-Duty-Warzone-3.jpg"
    3:
        id:1127
        image:"https://www.freetogame.com/g/452/Call-of-Duty-Warzone-4.jpg"
*/

export class UIGameDetails {
  constructor(game) {
    this.game = game;
  }
  createGameDetailsCard() {
    const {
      title,
      thumbnail,
      description,
      genre,
      platform,
      status,
      game_url
    } = this.game;
    return `
        
                   <div class="game">
                <h3 class="text-white pb-3">Details Game</h3>
                <i
                  class="fas fa-xmark position-absolute fs-2 top-0 end-0 m-5 text-white"
                  aria-label="Close"
                  role="button"
                  tabindex="0"
                  onclick="close()"
                ></i>
                <div class="row">
                  <div class="col-4">
                    <img
                      src="${thumbnail}"
                      class="w-100"
                      alt="${title} Thumbnail"
                    />
                  </div>
                  <div class="col-8">
                    <div class="gametype">
                      <h2 class="text-white">
                          <span>Title:</span> ${title}</h2>
                      <p class="text-white pt-0">
                        <span class="fw-bold">Category:</span> <span class="bg-primary2 px-2 rounded-2 text-black">${genre}</span>
                      </p>
                      <p class="text-white">
                        <span class="fw-bold">Platform:</span> <span class="bg-primary2 px-2 rounded-2 text-black">${platform}</span>
                      </p>
                      <p class="text-white">
                        <span class="fw-bold">Status:</span> <span class="bg-primary2 px-2 rounded-2 text-black">${status}</span>
                      </p>
                    </div>
                    <div class="gamedescription">
                      <p class="text-white">
                          ${description}
                      </p>
                    </div>
                    <button class="btn btn-warning bg-transparent">
                      <a
                        href="${game_url}"
                        target="_blank"
                        class="text-decoration-none text-white"
                      >
                        Show Game
                      </a>
                    </button>
                  </div>
                </div>
            </div>
        `;
  }
}
