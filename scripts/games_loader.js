import { games } from "./config.js"

export function getGames() {
  const response = await fetch(
    `https://ayydev-games-api.akunffbya.workers.dev?time=${Date.now()}`
  ).json();
}
