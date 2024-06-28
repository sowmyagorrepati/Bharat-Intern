const apiKey = 'b8438b0a8f85e49248423337bc901d66';
const base_url = "https://api.themoviedb.org/3";
const img_url = "https://image.tmdb.org/t/p/original";

const requests = {
  fetchNetflixOrignals: `${base_url}/discover/tv?api_key=${apiKey}&with_networks=213`,
  fetchNewAndPopular: `${base_url}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${apiKey}`,
  fetchActionMovies: `${base_url}/discover/movie?api_key=${apiKey}&with_genres=28`,
  fetchRomanceMovies: `${base_url}/discover/movie?api_key=${apiKey}&with_genres=10749`,
  fetchTrending: `${base_url}/trending/all/week?api_key=${apiKey}&language=en-US`,
  fetchTeluguMovies: `${base_url}/discover/movie?api_key=${apiKey}&with_original_language=te`,
  fetchHorrorMovies: `${base_url}/discover/movie?api_key=${apiKey}&with_genres=27`,
  fetchComedyMovies: `${base_url}/discover/movie?api_key=${apiKey}&with_genres=35`,
  fetchChineseDramas: `${base_url}/discover/tv?api_key=${apiKey}&with_original_language=zh`,
  fetchHindiMovies: `${base_url}/discover/movie?api_key=${apiKey}&with_original_language=hi`,
  fetchKoreanDramas: `${base_url}/discover/tv?api_key=${apiKey}&with_original_language=ko`,
  fetchTVShows: `${base_url}/discover/tv?api_key=${apiKey}`,
  fetchDocumentaries: `${base_url}/discover/movie?api_key=${apiKey}&with_genres=99`
};


function fetchAndGenerateMovies(section, url, box) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const movies = data.results;
      movies.forEach((movie) => {
        const posterPath = movie.poster_path ? `${img_url}${movie.poster_path}` : './images/fallback.png';
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
          <img src="${posterPath}" alt="${movie.title || movie.name || 'No Title'}">
        `;
        box.appendChild(movieCard);
      });

      const prevBtn = document.querySelector(`.${section} .prev-btn`);
      const nextBtn = document.querySelector(`.${section} .next-btn`);

      const scrollDistance = 300; 

      prevBtn.addEventListener('click', () => {
        box.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
      });

      nextBtn.addEventListener('click', () => {
        box.scrollBy({ left: scrollDistance, behavior: 'smooth' });
      });
    })
    .catch((error) => console.error(error));
}

// Fetch data for each section and generate movie cards
document.addEventListener('DOMContentLoaded', () => {
  fetchAndGenerateMovies('sec1', requests.fetchNetflixOrignals, document.querySelector('.sec1 .box'));
  fetchAndGenerateMovies('sec2', requests.fetchNewAndPopular, document.querySelector('.sec2 .box'));
  fetchAndGenerateMovies('sec3', requests.fetchActionMovies, document.querySelector('.sec3 .box'));
  fetchAndGenerateMovies('sec4', requests.fetchRomanceMovies, document.querySelector('.sec4 .box'));
  fetchAndGenerateMovies('sec5', requests.fetchTrending, document.querySelector('.sec5 .box'));
  fetchAndGenerateMovies('sec6', requests.fetchTeluguMovies, document.querySelector('.sec6 .box'));
  fetchAndGenerateMovies('sec7', requests.fetchHorrorMovies, document.querySelector('.sec7 .box'));
  fetchAndGenerateMovies('sec8', requests.fetchComedyMovies, document.querySelector('.sec8 .box'));
  fetchAndGenerateMovies('sec9', requests.fetchChineseDramas, document.querySelector('.sec9 .box'));
  fetchAndGenerateMovies('sec10', requests.fetchHindiMovies, document.querySelector('.sec10 .box'));
  fetchAndGenerateMovies('sec11', requests.fetchKoreanDramas, document.querySelector('.sec11 .box'));
  fetchAndGenerateMovies('sec12', requests.fetchTVShows, document.querySelector('.sec12 .box'));
  fetchAndGenerateMovies('sec13', requests.fetchDocumentaries, document.querySelector('.sec13 .box'));

  document.querySelectorAll('.navbar .left-tabs a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const offset = targetElement.offsetTop - document.querySelector('.navbar').offsetHeight;
        window.scrollTo({
          top: offset,
          behavior: 'smooth'
        });
      }
    });
  });

  // Navbar scroll behavior
  const navbar = document.querySelector('.navbar');
  const navbarHeight = navbar.offsetHeight;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
});
