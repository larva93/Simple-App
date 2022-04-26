import {takeLatest, put} from 'redux-saga/effects';
import axios from 'axios';

const API_KEY = '2d4072f5f157d3f471fe122ba024224f';

function* getMovieNowPlaying(action) {
  try {
    const resMovieNowPlaying = yield axios({
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${action.page}`,
    });
    if (resMovieNowPlaying && resMovieNowPlaying.data) {
      yield put({
        type: 'GET_MOVIE_NOW_PLAYING_SUCCESS',
        data: resMovieNowPlaying.data.results,
      });
    }
  } catch (err) {
    yield put({
      type: 'GET_MOVIE_NOW_PLAYING_FAILED',
      error: err.response.data.status_message,
    });
  }
}

function* getMoviePopular(action) {
  try {
    const resMoviePopular = yield axios({
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${action.page}`,
    });
    if (resMoviePopular && resMoviePopular.data) {
      yield put({
        type: 'GET_MOVIE_POPULAR_SUCCESS',
        data: resMoviePopular.data.results,
      });
    }
  } catch (err) {
    yield put({
      type: 'GET_MOVIE_POPULAR_FAILED',
      error: err.response.data.status_message,
    });
  }
}

function* getSimilarMovie(action) {
  try {
    const resSimilarMovie = yield axios({
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${action.id}/similar?api_key=${API_KEY}&language=en-US&page=${action.page}`,
    });
    if (resSimilarMovie && resSimilarMovie.data) {
      yield put({
        type: 'GET_SIMILAR_MOVIE_SUCCESS',
        data: resSimilarMovie.data.results,
      });
    }
  } catch (err) {
    yield put({
      type: 'GET_SIMILAR_MOVIE_FAILED',
      error: err.response.data.status_message,
    });
  }
}

function* getMovieDetails(action) {
  try {
    const resMovieDetails = yield axios({
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${action.id}?api_key=${API_KEY}&language=en-US`,
    });
    if (resMovieDetails && resMovieDetails.data) {
      yield put({
        type: 'GET_MOVIE_DETAILS_SUCCESS',
        data: resMovieDetails.data,
        genre: resMovieDetails.data.genres[0],
      });
    }
  } catch (err) {
    yield put({
      type: 'GET_MOVIE_DETAILS_FAILED',
      error: err.response.data.status_message,
    });
  }
}

function* getCast(action) {
  try {
    const resCast = yield axios({
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${action.id}/credits?api_key=${API_KEY}&language=en-US`,
    });
    if (resCast && resCast.data) {
      yield put({
        type: 'GET_CAST_SUCCESS',
        data: resCast.data.cast,
      });
    }
  } catch (err) {
    yield put({
      type: 'GET_CAST_FAILED',
      error: err.response.data.status_message,
    });
  }
}

function* searchMovie(action) {
  try {
    const resSearch = yield axios({
      method: 'GET',
      url: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${action.value}&page=${action.page}`,
    });
    if (resSearch && resSearch.data) {
      yield put({
        type: 'SEARCH_MOVIE_SUCCESS',
        data: resSearch.data.results,
      });
    }
  } catch (err) {
    yield put({
      type: 'SEARCH_MOVIE_FAILED',
      error: err.response.data.status_message,
    });
  }
}

function* getMovieGenre() {
  try {
    const resMovieGenre = yield axios({
      method: 'GET',
      url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`,
    });
    if (resMovieGenre && resMovieGenre.data) {
      yield put({
        type: 'GET_MOVIE_GENRE_SUCCESS',
        data: resMovieGenre.data.genres,
      });
    }
  } catch (err) {
    yield put({
      type: 'GET_MOVIE_GENRE_FAILED',
      error: err.response.data.status_message,
    });
  }
}

function* movieSaga() {
  yield takeLatest('GET_MOVIE_NOW_PLAYING', getMovieNowPlaying);
  yield takeLatest('GET_MOVIE_POPULAR', getMoviePopular);
  yield takeLatest('GET_SIMILAR_MOVIE', getSimilarMovie);
  yield takeLatest('GET_MOVIE_DETAILS', getMovieDetails);
  yield takeLatest('GET_CAST', getCast);
  yield takeLatest('SEARCH_MOVIE', searchMovie);
  yield takeLatest('GET_MOVIE_GENRE', getMovieGenre);
}

export default movieSaga;
