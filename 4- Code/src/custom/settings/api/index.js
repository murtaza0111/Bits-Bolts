// const CORS_URL = "https://cors-anywhere.herokuapp.com/";
const BASE_AUTH_URL = "https://id.twitch.tv/oauth2/token?";
const CLIENT_SECRET = "6o27vdo3bm2u8spoy3ferqs4y16tul";
const GRANT_TYPE = "client_credentials";

// const BASE_URL = "https://api.igdb.com/v4/";

export const CLIENT_ID = "ujh9el8115ve3op75yebrhmwo9hu3e";

export const AUTH_TOKEN_URL = `${BASE_AUTH_URL}client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=${GRANT_TYPE}`;

export const LOGIN_CREDENTIALS_KEY = "LOGIN_CREDENTIALS_KEY";

export const BASE_DATA_URL = `https://www.freetogame.com/api/games`;
const BASE_GAMES_URL = "https://bits-bolts.000webhostapp.com/";
export const GET_ALL_GAMES_URL = BASE_GAMES_URL + "get-games.php";
export const GET_SPECIFIC_GAME_URL = BASE_GAMES_URL + "get-games.php?id=";
export const GAME_DOWNLOAD_LINK = BASE_GAMES_URL+"bits_bolts_game.zip";
// export const BASE_DATA_URL = `${CORS_URL}${BASE_URL}/games?fields=age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;`;

// Custom Server API
// const BASE_SERVER_URL = "http://localhost:3001";
// const BASE_SERVER_API_URL = `${BASE_SERVER_URL}/api`;
// export const GET_ALL_USERS = `${BASE_SERVER_API_URL}/users`;

// export const ADD_USER_API = `${BASE_SERVER_API_URL}/users`;

// export const UPDATE_USER = `${BASE_SERVER_API_URL}/update_users`;

// export const DELETE_USER = `${BASE_SERVER_API_URL}/delete_user`;

//
export const USERS_DATA_KEY = "USERS_DATA_KEY";
export const ADD_USER_KEY = "ADD_USER_KEY";
// USER CART KEY
export const USER_CART_PRODUCTS_KEY = "USER_CART_PRODUCTS_KEY";

export const USER_WISHLIST_PRODUCTS_KEY = "USER_WISHLIST_PRODUCTS_KEY";
