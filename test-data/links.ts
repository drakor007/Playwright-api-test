const BASE_URL = "https://airportgap.com/api";

const endpoint = (path: string) => `${BASE_URL}${path}`;

export const LINK = {
  existingsAirports: endpoint("/airports"),
  favoritesAirports: endpoint("/favorites"),
  clearAllFavorites: endpoint("/favorites/clear_all"),
};
