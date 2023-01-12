import { Link, useLocation } from 'react-router-dom';
import css from './TrendList.module.css';

export const TrendList = ({ movies }) => {
  const location = useLocation();
  return (
    <div className={css.wrapper}>
      <ul>
        {movies.map(movie => (
          <li key={movie.id} className={css.movieList}>
            <Link
              to={`/movies/${movie.id}`}
              state={{ from: location }}
              className={css.movieTitle}
            >
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
