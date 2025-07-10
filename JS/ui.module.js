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
            id,
            title,
            thumbnail,
            description,
            genre,
            platform,
            publisher,
            developer,
            release_date,
            status,
            game_url,
            freetogame_profile_url,
            minimum_system_requirements,
            screenshots,
        } = this.game;

        // System requirements HTML
        let sysReqHtml = '';
        if (minimum_system_requirements) {
            sysReqHtml = `
                <ul class="list-unstyled text-white small mb-2">
                    ${minimum_system_requirements.os ? `<li><strong>OS:</strong> ${minimum_system_requirements.os}</li>` : ''}
                    ${minimum_system_requirements.processor ? `<li><strong>Processor:</strong> ${minimum_system_requirements.processor}</li>` : ''}
                    ${minimum_system_requirements.memory ? `<li><strong>Memory:</strong> ${minimum_system_requirements.memory}</li>` : ''}
                    ${minimum_system_requirements.graphics ? `<li><strong>Graphics:</strong> ${minimum_system_requirements.graphics}</li>` : ''}
                    ${minimum_system_requirements.storage ? `<li><strong>Storage:</strong> ${minimum_system_requirements.storage}</li>` : ''}
                </ul>
            `;
        }

        // Screenshots HTML
        let screenshotsHtml = '';
        if (Array.isArray(screenshots) && screenshots.length > 0) {
            screenshotsHtml = `
                <div class="mb-3">
                    <div class="row g-2">
                        ${screenshots
                            .map(
                                (shot) => `
                                    <div class="col-6 col-md-3">
                                        <img src="${shot.image}" alt="Screenshot" class="img-fluid rounded" />
                                    </div>
                                `
                            )
                            .join('')}
                    </div>
                </div>
            `;
        }

        return `
            <div class="card h-100 bg-transparent" data-id="${id}">
                <img src="${thumbnail}" class="card-img-top object-fit-cover h-100" alt="${title} Thumbnail">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <h3 class="h6 small text-white mb-0">${title}</h3>
                        <span class="badge text-bg-success">${status || 'Unknown'}</span>
                    </div>
                    <p class="card-text small text-center opacity-50 text-white">${description}</p>
                    <div class="mb-2">
                        <span class="badge badge-color">${genre}</span>
                        <span class="badge badge-color">${platform}</span>
                    </div>
                    <ul class="list-unstyled text-white small mb-2">
                        ${publisher ? `<li><strong>Publisher:</strong> ${publisher}</li>` : ''}
                        ${developer ? `<li><strong>Developer:</strong> ${developer}</li>` : ''}
                        ${release_date ? `<li><strong>Release Date:</strong> ${release_date}</li>` : ''}
                    </ul>
                    ${sysReqHtml}
                    ${screenshotsHtml}
                    <div class="d-flex gap-2 mt-2">
                        ${game_url ? `<a href="${game_url}" target="_blank" class="btn btn-primary btn-sm">Play Now</a>` : ''}
                        ${freetogame_profile_url ? `<a href="${freetogame_profile_url}" target="_blank" class="btn btn-outline-light btn-sm">Profile</a>` : ''}
                    </div>
                </div>
            </div>
        `;
    }
}
