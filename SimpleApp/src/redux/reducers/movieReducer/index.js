const initialState = {
  isLoading: false,
  dataNowPlaying: [],
  dataPopular: [],
  dataSimilar: [],
  dataCarousel: [],
  allGenre: [],
  dataMovieDetails: [],
  genre: [],
  dataCast: [],
  dataSearch: [],
  error: [],
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MOVIE_NOW_PLAYING':
      return {
        ...state,
        isLoading: true,
      };
    case 'GET_MOVIE_NOW_PLAYING_SUCCESS':
      return {
        ...state,
        isLoading: false,
        dataNowPlaying: action.data,
        dataCarousel: action.data,
      };
    case 'GET_MOVIE_NOW_PLAYING_FAILED':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case 'GET_MOVIE_POPULAR':
      return {
        ...state,
        isLoading: true,
      };
    case 'GET_MOVIE_POPULAR_SUCCESS':
      return {
        ...state,
        isLoading: false,
        dataPopular: action.data,
      };
    case 'GET_MOVIE_POPULAR_FAILED':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case 'GET_SIMILAR_MOVIE':
      return {
        ...state,
        isLoading: true,
      };
    case 'GET_SIMILAR_MOVIE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        dataSimilar: action.data,
      };
    case 'GET_SIMILAR_MOVIE_FAILED':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case 'GET_MOVIE_GENRE':
      return {
        ...state,
        isLoading: true,
      };
    case 'GET_MOVIE_GENRE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        allGenre: action.data,
      };
    case 'GET_MOVIE_GENRE_FAILED':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case 'GET_MOVIE_DETAILS':
      return {
        ...state,
        isLoading: true,
      };
    case 'GET_MOVIE_DETAILS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        dataMovieDetails: action.data,
        genre: action.genre,
      };
    case 'GET_MOVIE_DETAILS_FAILED':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case 'GET_CAST':
      return {
        ...state,
        isLoading: true,
      };
    case 'GET_CAST_SUCCESS':
      return {
        ...state,
        isLoading: false,
        dataCast: action.data,
      };
    case 'GET_CAST_FAILED':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case 'SEARCH_MOVIE':
      return {
        ...state,
        isLoading: true,
      };
    case 'SEARCH_MOVIE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        dataSearch: [...new Set([...state.dataSearch, ...action.data])],
      };
    case 'SEARCH_MOVIE_FAILED':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default movieReducer;
