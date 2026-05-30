import {getGames} from "./game_loader"

function goBack() {
  window.location.href = "../index.html";
}

async function loadGames() {
  const games = document.getElementById("games");

  try {
    const data = await getGames();

    console.log(data);

    // Validasi array
    if (!Array.isArray(data)) {
      games.innerHTML = "<p>Data game invalid.</p>";
      return;
    }

    games.innerHTML = "";

    data.forEach(game => {
      games.innerHTML += `
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

    games.innerHTML =
      "<p>Gagal mengambil game.</p>";
  }
}

loadGames();
