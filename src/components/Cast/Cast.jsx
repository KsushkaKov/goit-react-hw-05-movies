import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovieCredits } from 'servise/api/appi';
import { toast } from 'react-toastify';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!movieId) return;
    const fetchCast = async () => {
      try {
        const castDetails = await getMovieCredits(movieId);
        setCast(castDetails);
        setError('');
      } catch (error) {
        setError('Something went wrong');
      }
    };
    fetchCast();
  }, [movieId]);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  return (
    <div>
      <ul>
        {cast.map(({ id, name, character, profile_path }) => {
          return (
            <li key={id}>
              <img
                width={100}
                src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${profile_path}`}
                alt={name}
              />
              <p>{name}</p>
              <p>Character: {character}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Cast;
