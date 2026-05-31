import { getGames }
from "./games_loader.js";

const WEBHOOK_URL =
    "https://discord.com/api/webhooks/1509877286076153876/3mZG04i2CXJm51U5LCFCtgnoWnrJFnyKiDFMdr2NvyUPtAWsiYzc6OyC-VMrcP935Cry";

const gameSelect =
    document.getElementById(
        "game"
    );

const form =
    document.getElementById(
        "contactForm"
    );

const statusText =
    document.getElementById(
        "status"
    );

let turnstileVerified =
    false;

// ======================
// TURNSTILE CALLBACK
// ======================

window.onload = () => {

    turnstile.render(
        "#turnstile-widget",

        {
            sitekey: "0x4AAAAAADZEfJ_y69ct0l2O",

            callback: () => {

                turnstileVerified = true;

                alert("done)

                //document
                    //.getElementById(
                        //"submitBtn"
                    //)
                    //.disabled = false;
            }
        }
    );
};

// ======================
// LOAD GAMES
// ======================

async function loadGames() {

    try {

        const games =
            await getGames();

        gameSelect.innerHTML =
            `
            <option value="">
                -- Pilih Game --
            </option>
            `;

        games.forEach(game => {

            gameSelect.innerHTML +=

                `
                <option value="${game.title}">
                    ${game.title}
                </option>
                `;
        });

    } catch(err) {

        console.error(err);

        gameSelect.innerHTML =

            `
            <option value="">
                Gagal memuat game
            </option>
            `;
    }
}

loadGames();

// ======================
// SUBMIT
// ======================

form.addEventListener(

    "submit",

    async (e) => {

        e.preventDefault();

        if (
            !turnstileVerified
        ) {

            alert(
                "Silakan verifikasi bahwa Anda bukan robot."
            );

            return;
        }

        statusText.textContent =
            "Mengirim...";

        try {

            const action =
                document
                .getElementById(
                    "action"
                )
                .value;

            const game =
                document
                .getElementById(
                    "game"
                )
                .value;

            const name =
                document
                .getElementById(
                    "name"
                )
                .value;

            const email =
                document
                .getElementById(
                    "email"
                )
                .value;

            const message =
                document
                .getElementById(
                    "message"
                )
                .value;

            const imageFile =
                document
                .getElementById(
                    "image"
                )
                .files[0];

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

            if (imageFile) {

                formData.append(

                    "files[0]",

                    imageFile
                );
            }

            await fetch(

                WEBHOOK_URL,

                {

                    method: "POST",

                    body: formData
                }
            );

            statusText.textContent =
                "Berhasil dikirim!";

            form.reset();

            turnstileVerified =
                false;

            document
                .getElementById(
                    "submitBtn"
                )
                //.disabled = true;

        } catch(err) {

            console.error(err);

            statusText.textContent =
                "Gagal mengirim.";
        }
    }
);
