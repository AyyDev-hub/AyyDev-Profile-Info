export async function getGames() {
  const response = await fetch(
    `https://ayydev-games-api.akunffbya.workers.dev?time=${Date.now()}`
  );
  
  return await response.json()
}
