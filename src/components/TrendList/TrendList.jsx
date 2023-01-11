import { Link } from 'react-router-dom';
import css from './TrendList.module.css';

export const TrendList = ({ movies }) => {
  return (
    <div className={css.wrapper}>
      <ul>
        {movies.map(movie => (
          <li key={movie.id} className={css.movieList}>
            <Link to={`/movies/${movie.id}`} className={css.movieTitle}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
