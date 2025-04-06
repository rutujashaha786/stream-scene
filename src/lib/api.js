import axios from "axios";

export const ENDPOINT = {
    // auth
    login: "/auth/login",
    signup: "/auth/signup",
    logout: "/auth/logout",
    forgetpassword: "/auth/forgetpassword",
    resetPassword: "/auth/resetPassword",

    //discover
    discoverNowPlaying: "/discover/now-playing",
    discoverTrending: "/discover/trending",
    discoverTopRated: "/discover/top-rated",
    discoverUpcoming: "/discover/upcoming",

    // movies
    fetchActionMovies: `/movies/action`,
    fetchComedyMovies: `/movies/comedy`,
    fetchHorrorMovies: `/movies/horror`,
    fetchRomanceMovies: `/movies/romance`,
    fetchAnimeMovies: `/movies/anime`,

    //tv shows
    fetchActionTvShows: `/tv/action`,
    fetchComedyTvShows: `/tv/comedy`,
    fetchCrimeTvShows: `/tv/crime`,
    fetchDramaTvShows: `/tv/drama`,
    fetchMysteryTvShows: `/tv/mystery`,

    //extra data 
    getMovieDetails: (id) => `/movies/details?id=${id}`,
    getTvShowsDetails: (id) => `/tv/details?id=${id}`,

    //user
    user: "/user",
    addToWishlist: "/user/wishlist",
    getWishlist: "/user/wishlist",

    //payment
    payment: "/payment/order",
    updatePremium: "/payment/update-premium-access",

    // streaming urls
    fetchAllStreamingVideos: `/video`,
}

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export const media = (path) => 
    path 
      ? `https://image.tmdb.org/t/p/original${path}` 
      : '/placeholder-image.jpg'; 

export function getWatchUrl(vidId, mediaType, poster_path) {
    const prefix = mediaType === "tv" ? "tv" : "movies";
    return `${prefix}/watch?id=${vidId}&poster_path=${poster_path}`;
}