/* =========================
   CONFIG
========================== */

// YouTube API Key
const SUBSCRIBER_COUNTER_API_KEY = "AIzaSyAuEg8dEDLy_Qts1Bq7ZZQxNTpjMvaJnfo";

// Channel ID
const CHANNEL_ID = "UCGDirlA9l0kz9MPuZGVsYMA";

// Subscriber Goal
const SUBSCRIBER_TARGET = 1000;

/* =========================
   BACK BUTTON
========================== */
function goBack() {
    window.location.href = "../index.html";
}

/* =========================
   FORMAT NUMBER
========================== */
function formatNumber(number) {
    return new Intl.NumberFormat("id-ID").format(number);
}

/* =========================
   LOAD CHANNEL DATA
========================== */
async function loadChannelData() {
    try {

        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${CHANNEL_ID}&key=${SUBSCRIBER_COUNTER_API_KEY}`
        );

        const data = await response.json();

        console.log(data);

        // Validate data
        if ( !data.items || !data.items.length ) {
            return;
        }

        const channel = data.items[0];

        /* ======================
           GET DATA
        ======================= */

        // Channel Name
        const channelName = channel.snippet.title;

        // Channel Icon
        const channelIcon = 
            channel.snippet
            .thumbnails
            .high
            .url;

        // Subscriber Count
        const subscriberCount =
            Number(
                channel.statistics
                .subscriberCount
            );

        /* ======================
           CALCULATE PERCENT
        ======================= */
        const percent =
            Math.min(
                (
                    subscriberCount /
                    SUBSCRIBER_TARGET
                ) * 100,
                100
            );

        /* ======================
           UPDATE UI
        ======================= */

        // Update Icon
        document.getElementById(
            "channel-icon"
        ).src = channelIcon;

        // Update Name
        document.getElementById(
            "channel-name"
        ).textContent = channelName;

        // Update Subscribers
        document.getElementById(
            "channel-subs"
        ).textContent = `${formatNumber(subscriberCount)} Subscribers`;

        // Update Progress Width
        document.getElementById(
            "progress-fill"
        ).style.width = `${percent}%`;

        // Update Progress Text
        document.getElementById(
            "progress-text"
        ).textContent =
            `${percent.toFixed(1)}%`;

    } catch(error) {
        console.error(
            "Failed loading channel:",
            error
        );

        // Error UI
        document.getElementById(
            "channel-name"
        ).textContent = "Failed to load";

        document.getElementById(
            "channel-subs"
        ).textContent = "Unable to fetch subscribers";
    }
}

/* =========================
   INIT
========================== */
loadChannelData();