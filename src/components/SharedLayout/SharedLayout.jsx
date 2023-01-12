import { NavLink, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Loader } from 'components/Loader/Loader';
import styled from 'styled-components';
import css from './SharedLayout.module.css';

const StyledLink = styled(NavLink)`
  color: black;
  &.active {
    color: tomato;
  }
`;
export const SharedLayout = () => {
  return (
    <div className={css.container}>
      <header className={css.header}>
        <nav>
          <StyledLink className={css.link} to="/" end>
            Home
          </StyledLink>
          <StyledLink className={css.link} to="/movies">
            Movies
          </StyledLink>
        </nav>
      </header>
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
