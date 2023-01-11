import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovieReviews } from 'servise/api/appi';
import { toast } from 'react-toastify';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!movieId) return;
    const fetchReviews = async () => {
      try {
        const review = await getMovieReviews(movieId);
        setReviews(review);
        setError('');
      } catch (error) {
        setError('Something went wrong');
      }
    };
    fetchReviews();
  }, [movieId]);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  return (
    <div>
      {reviews?.length === 0 && (
        <p>We don't have any reviews for this movies</p>
      )}
      <ul>
        {reviews.map(({ id, author, content }) => {
          return (
            <li key={id}>
              <p>Author: {author}</p>
              <p>{content}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Reviews;
