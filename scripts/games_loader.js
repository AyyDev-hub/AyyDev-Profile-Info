import { games } from "./config.js"

export function loadGames() {
  const response = await fetch(
    `https://ayydev-games-api.akunffbya.workers.dev?time=${Date.now()}`
  );
  
  games = await response.json();
}
