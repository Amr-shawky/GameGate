// File: JS/index.js
import { UIGames } from './ui.module.js';
// import { fetchGames } from './games.module.js'; لو عامل API logic هناك
// import { UIGameDetails } from './deatails.module.js'; لو محتاج تفاصيل

document.addEventListener('DOMContentLoaded', () => {
  const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?category=shooter';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '959a605f60msh4639c2a29781422p12f2c0jsn8dfa35698361',
      'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };

  const rowContainer = document.querySelector('.row');

  // Add event listeners to all cards after they are rendered
  function addCardEventListeners() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.addEventListener('click', (event) => {
        const gameId = event.currentTarget.getAttribute('data-id');
        console.log(`Game ID: ${gameId}`);
        // Disable scrolling on the body
        document.body.style.overflow = 'hidden';
            document.querySelector('.current-game').style.display = 'block';

        // هنا ممكن تضيف منطق لعرض تفاصيل اللعبة
      });
    });
  }

  async function fetchGames() {
    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (rowContainer) {
        const uiGames = new UIGames(result);
        rowContainer.innerHTML = uiGames.createGameCard().join('');
        addCardEventListeners(); // Add this line
      } else {
        console.error('Container `.row` not found.');
      }
    } catch (error) {
      console.error(error);
    }
  }

  fetchGames();
});



function closeDetails(){
    document.querySelector('.current-game').style.display='none';
    document.body.style.overflow = 'auto';
    console.log("sdf");
    
}

const closeicon = document.querySelector(".fa-xmark");
if (closeicon) {
  closeicon.addEventListener("click", closeDetails);
}