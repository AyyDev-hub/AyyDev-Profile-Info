// =====================================
// API GAME LIST
// =====================================

const GAME_API =
    "https://ayydev-games-api.akunffbya.workers.dev";

// =====================================
// DISCORD WEBHOOK
// =====================================

const WEBHOOK_URL =
    "https://discord.com/api/webhooks/1509877286076153876/3mZG04i2CXJm51U5LCFCtgnoWnrJFnyKiDFMdr2NvyUPtAWsiYzc6OyC-VMrcP935Cry";

// =====================================
// ELEMENT
// =====================================

const gameSelect =
    document.getElementById("game");

const form =
    document.getElementById("contactForm");

const statusText =
    document.getElementById("status");
    
// =====================================
// BOT CHECK
// =====================================
    
let turnstileVerified = false;

async function turnstileSuccess() {

    turnstileVerified = true;

    document
        .getElementById(
            "submitBtn"
        )
        //.disabled = false;
}

// =====================================
// LOAD GAMES
// =====================================

async function loadGames(){

    try {

        const response =
            await fetch(
                `${GAME_API}?time=${Date.now()}`
            );

        const games =
            await response.json();

        gameSelect.innerHTML =
            `
            <option value="">
                -- Pilih Game --
            </option>
            `;

        games.forEach(game => {

            gameSelect.innerHTML += `

                <option value="${game.title}">

                    ${game.title}

                </option>
            `;
        });

    } catch(err) {

        console.error(err);

        gameSelect.innerHTML =
            `
            <option>
                Gagal memuat game
            </option>
            `;
    }
}

// =====================================
// SUBMIT FORM
// =====================================

form.addEventListener(
    "submit",
    async (e) => {

    e.preventDefault();

    if (!turnstileVerified) {

        alert(
            "Silakan verifikasi bahwa Anda bukan robot terlebih dahulu."
        );

        return;
    }

    statusText.innerText =
        "Mengirim...";

    try {

        // =========================
        // GET VALUES
        // =========================

        const action =
            document.getElementById("action")
            .value;

        const game =
            document.getElementById("game")
            .value;

        const name =
            document.getElementById("name")
            .value;

        const email =
            document.getElementById("email")
            .value;

        const message =
            document.getElementById("message")
            .value;

        const imageFile =
            document.getElementById("image")
            .files[0];

        // =========================
        // FORM DATA
        // =========================

        const formData =
            new FormData();

        formData.append(

            "payload_json",

            JSON.stringify({

                content:

        `📩 CONTACT US

🎯 Aksi:
${action}

🎮 Game:
${game}

👤 Nama:
${name}

📧 Email:
${email}

💬 Pesan:
${message}`
            })
        );

        // =========================
        // ATTACH IMAGE
        // =========================

        if (imageFile) {

            formData.append(

                "files[0]",

                imageFile
            );
        }

        // =========================
        // SEND WEBHOOK
        // =========================

        await fetch(

            WEBHOOK_URL,

            {

                method: "POST",

                body: formData
            }
        );

        statusText.innerText =
            "Berhasil dikirim!";

        form.reset();

    } catch(err) {

        console.error(err);

        statusText.innerText =
            "Gagal mengirim.";
    }
});

// =====================================
// START
// =====================================

loadGames();