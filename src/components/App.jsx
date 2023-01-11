import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import { SharedLayout } from './SharedLayout/SharedLayout';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = lazy(() => import('pages/HomePage'));
const MovieDetails = lazy(() => import('pages/MovieDetails'));
const Movies = lazy(() => import('pages/Movies'));
const NotFound = lazy(() => import('pages/NotFound'));
const Cast = lazy(() => import('./Cast/Cast'));
const Reviews = lazy(() => import('./Reviews/Reviews'));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="movies" element={<Movies />} />
        <Route path="movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route path="error" element={<ToastContainer />} />
    </Routes>
  );
};
