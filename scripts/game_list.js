import { games } from "./config.js"

function goBack() {
  window.location.href = "../index.html";
}

async function loadGames() {
  const gameshtml = document.getElementById("games");

  try {
    console.log(games);

    // Validasi array
    if (!Array.isArray(games)) {
      gameshtml.innerHTML = "<p>Data game invalid.</p>";
      return;
    }

    gameshtml.innerHTML = "";

    games.forEach(game => {
      gameshtml.innerHTML += `
        <div class="card">
          <img
            src="${game.image}"
            alt="${game.title}"
          >

          <div class="content">
            <h2>${game.title}</h2>

            <p>${game.description}</p>

            <a
              class="btn"
              href="${game.link}"
              target="_blank"
            >
              Play Game
            </a>
          </div>
        </div>
      `;
    });

  } catch (err) {
    console.error(err);

    gameshtml.innerHTML =
      "<p>Gagal mengambil game.</p>";
  }
}

loadGames();
