const cover = document.getElementById("cover");
const disc = document.getElementById("disc");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const timer = document.getElementById("timer");
const duration = document.getElementById("duration");
const prev = document.getElementById("prev");
const play = document.getElementById("play");
const next = document.getElementById("next");
const lyrics = document.getElementById("lyrics");

// Toggle play and pause
function playPauseMedia() {
  if (disc.paused) {
    disc.play();
  } else {
    disc.pause();
  }
}

// Update icon
function updatePlayPauseIcon() {
  if (disc.paused) {
    play.classList.remove(
      '  <svg id="play" class="special-btn" xmlns="http://www.w3.org/2000/svg" height="7em" viewBox="0 0 512 512"><style>svg{fill: rgb(113, 41, 92)}</style><path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/></svg>'
    );
    play.classList.add(
      '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#71295c}</style><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>'
    );
  } else {
    play.classList.remove(
      '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#71295c}</style><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>'
    );
    play.classList.add(
      '  <svg id="play" class="special-btn" xmlns="http://www.w3.org/2000/svg" height="7em" viewBox="0 0 512 512"><style>svg{fill: rgb(113, 41, 92)}</style><path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/></svg>'
    );
  }
}

// Update progress bar
function updateProgress() {
  progress.style.width = (disc.currentTime / disc.duration) * 100 + "%";

  let minutes = Math.floor(disc.currentTime / 60);
  let seconds = Math.floor(disc.currentTime % 60);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  timer.textContent = `${minutes}:${seconds}`;
}

// Reset the progress
function resetProgress() {
  progress.style.width = 0 + "%";
  timer.textContent = "0:00";
}

// Go to previous song
function gotoPreviousSong() {
  if (songIndex === 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex = songIndex - 1;
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow) {
    playPauseMedia();
  }
}

// Go to next song
function gotoNextSong(playImmediately) {
  if (songIndex === songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex = songIndex + 1;
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow || playImmediately) {
    playPauseMedia();
  }
}

// Change song progress when clicked on progress bar
function setProgress(ev) {
  const totalWidth = this.clientWidth;
  const clickWidth = ev.offsetX;
  const clickWidthRatio = clickWidth / totalWidth;
  disc.currentTime = clickWidthRatio * disc.duration;
}
// Play/Pause when play button clicked
play.addEventListener("click", playPauseMedia);

// Various events on disc
disc.addEventListener("play", updatePlayPauseIcon);
disc.addEventListener("pause", updatePlayPauseIcon);
disc.addEventListener("timeupdate", updateProgress);
disc.addEventListener("ended", gotoNextSong.bind(null, true));

// Go to next song when next button clicked
prev.addEventListener("click", gotoPreviousSong);

// Go to previous song when previous button clicked
next.addEventListener("click", gotoNextSong.bind(null, false));

// Move to different place in the song
progressContainer.addEventListener("click", setProgress);

// Tab Content
const tabContent = {
  lyrics: `<p>Lyrics</p>`,
  otherAlbums: `<p>Other Albums</p>`,
  relatedArtists: `<p>Related</p>`,
};

// Show Respective Tab Content in explore-tab-content Element on DOM
function showTabContent(tab) {
  const exploreTabContent = document.getElementById("explore-tab-content");
  exploreTabContent.innerHTML = tabContent[tab];
}

const API_KEY = "02b58e9019mshaa3aeabac427d52p144a7bjsn55585636d6a5";
const searchQuery = "Lone Gunman Required";

const geniusOptions = {
  method: "GET",
  url: "https://genius-song-lyrics1.p.rapidapi.com/search/",
  params: {
    q: searchQuery,
    per_page: "10",
    page: "1",
  },
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
  },
};

const spotifyOptions = {
  method: "GET",
  url: "https://spotify23.p.rapidapi.com/search/",
  params: {
    q: searchQuery,
    type: "multi",
    offset: "0",
    limit: "10",
    numberOfTopResults: "5",
  },
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
  },
};

const fetchData = async () => {
  try {
    // Fetch data from Genius API
    const geniusResponse = await axios.request(geniusOptions);
    console.log("Genius API response:", geniusResponse.data);

    // Get the ID of the first song in the search results
    const songId = geniusResponse.data.hits[0].result.id;

    // Fetch the lyrics of the song using its ID
    const lyricsResponse = await axios.get(
      `https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=${songId}`,
      {
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
        },
      }
    );
    console.log("Genius Lyrics API response:", lyricsResponse.data);

    // Fetch data from Spotify API
    const spotifyResponse = await axios.request(spotifyOptions);
    console.log("Spotify API response:", spotifyResponse.data.albums.items[0]);

    // Update the DOM with the fetched data
    const titleElement = document.getElementById("title");
    titleElement.textContent = geniusResponse.data.hits[0].result.title;

    const artistElement = document.getElementById("artist");
    artistElement.textContent =
      geniusResponse.data.hits[0].result.primary_artist.name;

    tabContent.lyrics =
      lyricsResponse.data.lyrics.lyrics.body.html || "<p>No lyrics found</p>";

      
    const imageElement = document.querySelector("#cover-box .one");
    imageElement.src = `${spotifyResponse.data.albums.items[0].data.coverArt.sources[0].url}`;
    tabContent.otherAlbums = spotifyResponse.data.albums.items
      .map(
        (album) =>
          `<div class="other-albums-container"><div><img src="${album.data.coverArt.sources[0].url}" alt="${album.name}"><p>${album.name}</p></div></div>`
      )
      .join("");

    tabContent.relatedArtists = spotifyResponse.data.artists.items
      .map(
        (artist) =>
          `<div class="related-artists-container"><img src="${artist.data.visuals.avatarImage.sources[2].url}" alt="${artist.name}"></div>`
      )
      .join("");

    // Automatically display the Lyrics tab when the page loads
    showTabContent("lyrics");
  } catch (error) {
    console.error(error);
  }
};
fetchData();

let scrollInterval;


function startAutoScroll(scrollSpeed = 5, scrollIntervalTime = 100) {
  const exploreTabContent = document.getElementById("explore-tab-content");
  scrollInterval = setInterval(() => {
    exploreTabContent.scrollBy(0, scrollSpeed);
  }, scrollIntervalTime);
}


startAutoScroll();
