// const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?category=shooter';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': '959a605f60msh4639c2a29781422p12f2c0jsn8dfa35698361',
// 		'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
// 	}
// };

// async function fetchGames() {
// 	try {
// 		const response = await fetch(url, options);
// 		const result = await response.json();

// 		console.log(result);
// 	} catch (error) {
// 		console.error(error);
// 	}
// }

// fetchGames();
/*
  ! insert this code in the row class for each game in the api response
  *             <div class="col">
              <div data-id="582" class="card h-100 bg-transparent" role="button"
              "="">
              <div class="card-body">
                <figure class="position-relative">
                  <img
                    class="card-img-top object-fit-cover h-100"
                    src="https://www.freetogame.com/g/582/thumbnail.jpg"
                  />
                </figure>

                <figcaption>
                  <div class="hstack justify-content-between">
                    <h3 class="h6 small text-white">Tarisland</h3>
                    <span class="badge text-bg-primary p-2">Free</span>
                  </div>

                  <p class="card-text small text-center opacity-50 text-white">
                    A,cross-platform,MMORPG,developed,by,Level,Infinite,and
                  </p>
                </figcaption>
              </div>

              <footer class="card-footer small hstack justify-content-between">
                <span class="badge badge-color">MMORPG</span>
                <span class="badge badge-color">PC (Windows)</span>
              </footer>
            </div>
          *</div>
*/

document.addEventListener('DOMContentLoaded', () => {
   const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?category=shooter';
   const options = {
       method: 'GET',
       headers: {
           'x-rapidapi-key': '959a605f60msh4639c2a29781422p12f2c0jsn8dfa35698361',
           'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
       }
   };

   // Make sure there is a container with class 'row' in your HTML
   const rowContainer = document.querySelector('.row');

   function createGameCard(game) {
       return `
           <div class="col">
               <div data-id="${game.id}" class="card h-100 bg-transparent" role="button">
                   <div class="card-body">
                       <figure class="position-relative">
                           <img
                               class="card-img-top object-fit-cover h-100"
                               src="${game.thumbnail}"
                               alt="${game.title} Thumbnail"
                           />
                       </figure>
                       <figcaption>
                           <div class="hstack justify-content-between">
                               <h3 class="h6 small text-white">${game.title}</h3>
                               <span class="badge text-bg-primary p-2">Free</span>
                           </div>
                           <p class="card-text small text-center opacity-50 text-white">
                               ${game.short_description}
                           </p>
                       </figcaption>
                   </div>
                   <footer class="card-footer small hstack justify-content-between">
                       <span class="badge badge-color">${game.genre}</span>
                       <span class="badge badge-color">${game.platform}</span>
                   </footer>
               </div>
           </div>
       `;
   }

   async function fetchGames() {
       try {
           const response = await fetch(url, options);
           const result = await response.json();

           if (rowContainer) {
               rowContainer.innerHTML = result.map(createGameCard).join('');
           } else {
               console.error('No container with class "row" found in the HTML.');
           }
       } catch (error) {
           console.error(error);
       }
   }

   fetchGames();
});