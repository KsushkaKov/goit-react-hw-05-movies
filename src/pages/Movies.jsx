import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import css from './Movies.module.css';
import { searchMovies } from 'servise/api/appi';
import { TrendList } from 'components/TrendList/TrendList';
import { toast } from 'react-toastify';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchedMovies, setSearchMovies] = useState([]);
  const [error, setError] = useState('');

  const movieName = searchParams.get('query');
  useEffect(() => {
    if (!movieName) return;
    const fetchQuery = async () => {
      setError('');
      try {
        const query = await searchMovies(movieName);
        setSearchMovies(query);
      } catch (error) {
        setError('Something went wrong');
      }
    };
    fetchQuery();
  }, [movieName]);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  const handleSubmit = event => {
    event.preventDefault();
    setSearchParams({ query: event.target.elements.searchMovie.value });

    event.target.reset();
  };
  return (
    <>
      <div className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            name="searchMovie"
            autoFocus
            placeholder="Search movie"
          />
        </form>
      </div>
      {searchedMovies.length > 0 && <TrendList movies={searchedMovies} />}
    </>
  );
};

export default Movies;
