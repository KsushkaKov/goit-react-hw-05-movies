import { TrendList } from 'components/TrendList/TrendList';
import { getTrending } from 'servise/api/appi';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Loader } from 'components/Loader/Loader';

const HomePage = () => {
  const [trendMovies, setTrendMovies] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setError('');
      try {
        const movies = await getTrending();
        setError('');
        setTrendMovies(movies);
      } catch (error) {
        setError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  return (
    <div>
      <h1>Trending movies</h1>
      {trendMovies.length > 0 && <TrendList movies={trendMovies} />}
      {isLoading && <Loader />}
    </div>
  );
};

export default HomePage;
