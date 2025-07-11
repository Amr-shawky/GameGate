// File: JS/ui.module.js

export class UIGames {
  constructor(games , selector) {
    this.games = games;
    this.selector = selector;
  }
  createGameCard() {
    // i want to create a game card for each game in the games array
    // and render them inside the provided selector
    if (!this.selector) return;
    const cardsHTML = this.games.map((game) => {
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
    }).join("");
    this.selector.innerHTML = cardsHTML;
  }
}

export class UIGameDetails {
  constructor(game , selector) {
    this.game = game;
    this.selector = selector;
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
    this.selector.innerHTML = `
                   <div class="game row">
                <h3 class="text-white pb-3">Details Game</h3>
                <div class="row">
                  <div class="col-12 col-md-4">
                    <img
                      src="${thumbnail}"
                      class="w-100"
                      alt="${title} Thumbnail"
                    />
                  </div>
                  <div class="col-12 col-md-8">
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
