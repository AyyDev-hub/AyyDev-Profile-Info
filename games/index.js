<!-- =========================================================
     FILE: /games/index.html
     GAMES PAGE
========================================================= -->
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>AyyDev Games</title>

  <style>

    /* =========================
       RESET
    ========================== */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {

      --bg-color: #0f172a;
      --card-color: #1e293b;

      --primary-color: #3b82f6;
      --primary-hover: #2563eb;

      --text-color: #ffffff;
      --subtext-color: #cbd5e1;

      --soft-color: rgba(255,255,255,0.08);
      --soft-hover: rgba(255,255,255,0.15);

      --border-radius: 16px;
      --transition-speed: 0.2s;
    }

    body {

      font-family: Arial, sans-serif;

      background: var(--bg-color);
      color: var(--text-color);

      min-height: 100vh;

      display: flex;
      justify-content: center;

      padding: 20px;
    }

    /* =========================
       CONTAINER
    ========================== */
    .container {

      width: 100%;
      max-width: 700px;

      background: var(--card-color);

      border-radius: var(--border-radius);

      padding: 32px;

      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }

    /* =========================
       HEADER
    ========================== */
    .games-header {

      display: flex;
      align-items: center;

      gap: 15px;

      margin-bottom: 30px;
    }

    .back-button {

      width: 45px;
      height: 45px;

      border: none;
      border-radius: 12px;

      background: var(--soft-color);
      color: white;

      font-size: 20px;

      cursor: pointer;

      transition: background var(--transition-speed);
    }

    .back-button:hover {
      background: var(--soft-hover);
    }

    .games-title {

      font-size: 28px;
      font-weight: bold;
    }

    /* =========================
       GAMES LIST
    ========================== */
    .games-list {

      display: flex;
      flex-direction: column;

      gap: 20px;
    }

    .card {

      overflow: hidden;

      background: rgba(255,255,255,0.04);

      border-radius: 16px;
    }

    .card img {

      width: 100%;
      height: 220px;

      object-fit: cover;

      display: block;
    }

    .content {
      padding: 18px;
    }

    .content h2 {

      margin-bottom: 10px;

      font-size: 22px;
    }

    .content p {

      color: var(--subtext-color);

      line-height: 1.6;

      margin-bottom: 18px;
    }

    .btn {

      display: inline-block;

      padding: 12px 18px;

      border-radius: 12px;

      background: var(--primary-color);
      color: white;

      text-decoration: none;
      font-weight: bold;

      transition: background var(--transition-speed);
    }

    .btn:hover {
      background: var(--primary-hover);
    }

    /* =========================
       RESPONSIVE
    ========================== */
    @media (max-width: 480px) {

      .container {
        padding: 24px;
      }

      .games-title {
        font-size: 24px;
      }

      .content h2 {
        font-size: 20px;
      }
    }

  </style>
</head>

<body>

  <main class="container">

    <!-- ======================
         HEADER
    ======================= -->
    <section class="games-header">

      <button
        class="back-button"
        onclick="goBack()"
      >
        ❮
      </button>

      <h1 class="games-title">
        AyyDev Games
      </h1>

    </section>

    <!-- ======================
         GAMES LIST
    ======================= -->
    <section
      class="games-list"
      id="games"
    >

      <p>Loading games...</p>

    </section>

  </main>

  <!-- =========================
       SCRIPT
  ========================== -->
  <script>

    function goBack() {

      window.location.href =
        "../index.html";
    }

    async function loadGames() {

      const games =
        document.getElementById("games");

      try {

        const response =
          await fetch(
            `https://ayydev-games-api.akunffbya.workers.dev?time=${Date.now()}`
          );

        const data =
          await response.json();

        console.log(data);

        // Validasi array
        if (!Array.isArray(data)) {

          games.innerHTML =
            "<p>Data game invalid.</p>";

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

                <h2>
                  ${game.title}
                </h2>

                <p>
                  ${game.description}
                </p>

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

      } catch(err) {

        console.error(err);

        games.innerHTML =
          "<p>Gagal mengambil game.</p>";
      }
    }

    loadGames();

  </script>

</body>
</html>
