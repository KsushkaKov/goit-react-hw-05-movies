import { useState, useEffect } from 'react';
import css from './SearchForm.module.css';
import { searchMovies } from 'servise/api/appi';
import { TrendList } from 'components/TrendList/TrendList';
import { toast } from 'react-toastify';

export const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedMovies, setSearchMovies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!searchQuery) return;
    const fetchQuery = async () => {
      try {
        const query = await searchMovies(searchQuery);
        setSearchMovies(query);
      } catch (error) {
        setError('Something went wrong');
      }
    };
    fetchQuery();
  }, [searchQuery]);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  const handleSubmit = event => {
    event.preventDefault();
    const queryInput = event.target.elements.searchMovie.value;
    setSearchQuery(queryInput);
    event.target.reset();
  };

  return (
    <>
      <header className={css.Searchbar}>
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
      </header>
      <main>
        <TrendList movies={searchedMovies} />
      </main>
    </>
  );
};
