import { Outlet, Link, useParams, useLocation } from 'react-router-dom';
import { getMovieDetails } from 'servise/api/appi';
import { useState, useEffect } from 'react';
import css from './MovieDetails.module.css';
import { toast } from 'react-toastify';

const MovieDetails = () => {
  const { movieId } = useParams();

  const location = useLocation();
  const goBackLink = location.state?.from ?? '/';

  const [movieDetails, setMovieDetails] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async () => {
      try {
        const moviesDetail = await getMovieDetails(movieId);
        setError('');
        setMovieDetails(moviesDetail);
      } catch (error) {
        setError('Something went wrong');
      }
    };
    fetchMovie();
  }, [movieId]);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  const {
    poster_path,
    original_title,
    title,
    release_date,
    vote_average,
    overview,
    genres,
  } = movieDetails;
  return (
    <>
      <Link to={goBackLink}>
        <button type="button" className={css.btnGoBack}>
          Go back
        </button>
      </Link>
      <div className={css.movie}>
        <img
          className={css.image}
          src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${poster_path}`}
          alt={original_title}
        />

        <div className={css.movieDescription}>
          <h2 className={css.movieName}>
            {title} ({release_date ? release_date.substring(0, 4) : ''})
          </h2>
          <div className={css.gridContainer}>
            <p className={css.movieItemTitle}>
              User Score:
              {vote_average ? Math.fround(vote_average * 10).toFixed(0) : ''}%
            </p>
            <h3>Overview</h3>
            <p>{overview}</p>

            <h4>Genres</h4>
            <p>{genres ? genres.map(genre => genre.name).join(' ') : ''}</p>
          </div>
        </div>
      </div>
      <p className={css.aboutTitle}>Additional information</p>
      <ul className={css.linkList}>
        <li className={css.linkItem}>
          <Link to="cast" className={css.linkTitle}>
            Cast
          </Link>
        </li>
        <li className={css.linkItem}>
          <Link to="reviews" className={css.linkTitle}>
            Reviews
          </Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default MovieDetails;
