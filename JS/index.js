const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?category=shooter';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '959a605f60msh4639c2a29781422p12f2c0jsn8dfa35698361',
		'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

async function fetchGames() {
	try {
		const response = await fetch(url, options);
		const result = await response.json();

		console.log(result);
	} catch (error) {
		console.error(error);
	}
}

fetchGames();