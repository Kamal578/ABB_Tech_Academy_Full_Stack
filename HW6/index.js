const xhr = new XMLHttpRequest();
xhr.open("GET", "https://ajax.test-danit.com/api/swapi/films", true);
xhr.onload = function () {
  if (xhr.status === 200) {
    const movies = JSON.parse(xhr.responseText);

    // display list of movies
    const moviesList = document.getElementById("movies-list");
    movies.forEach((movie) => {
      const movieItem = document.createElement("li");
      movieItem.innerHTML = `<h2>Episode ${movie.episodeId}: ${movie.name}</h2>
                            <p>${movie.openingCrawl}</p>
                           <div class="characters" id="characters-${movie.id}">
                             Loading characters... <span class="loading">⏳</span>
                           </div>`;
      moviesList.appendChild(movieItem);

      // retrieve characters for each movie
      const charactersDiv = document.getElementById(`characters-${movie.id}`);
      retrieveCharacters(movie.characters, charactersDiv);
    });
  }
};
xhr.send();

// retrieve characters for a movie
function retrieveCharacters(characterUrls, charactersDiv) {
  const characters = [];
  let charactersLoaded = 0;

  characterUrls.forEach((url) => {
    const characterXHR = new XMLHttpRequest();
    characterXHR.open("GET", url, true);
    characterXHR.onload = function () {
      if (characterXHR.status === 200) {
        const character = JSON.parse(characterXHR.responseText);
        characters.push(character.name);
        charactersLoaded++;

        if (charactersLoaded === characterUrls.length)
          charactersDiv.innerHTML = characters.join(", ");
      }
    };
    characterXHR.send();
  });
}
