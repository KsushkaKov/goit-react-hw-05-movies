import axios from 'axios';

const API_KEY = '?api_key=5cd5057c4af6e141ba56402bbaa2cf00';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export const getTrending = async () => {
  const { data } = await axios.get(`/trending/movie/day${API_KEY}`);
  return data.results.map(({ id, title }) => {
    return {
      id,
      title,
    };
  });
};
export const searchMovies = async inputQuery => {
  const { data } = await axios.get(
    `search/movie${API_KEY}&query=${inputQuery}&language=en-US&page=1`
  );
  return data.results.map(({ id, title }) => {
    return {
      id,
      title,
    };
  });
};
export const getMovieDetails = async movieId => {
  const { data } = await axios.get(
    `/movie/${movieId}${API_KEY}&language=en-US`
  );
  return data;
};

export const getMovieCredits = async movieId => {
  const { data } = await axios.get(
    `/movie/${movieId}/credits${API_KEY}&language=en-US`
  );
  return data.cast.map(({ name, character, profile_path, id }) => {
    return {
      name,
      character,
      profile_path,
      id,
    };
  });
};
export const getMovieReviews = async movieId => {
  const { data } = await axios.get(
    `/movie/${movieId}/reviews${API_KEY}&language=en-US&page=1`
  );
  return data.results.map(({ author, content, id }) => {
    return {
      author,
      content,
      id,
    };
  });
};
