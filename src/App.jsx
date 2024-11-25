import { useState } from 'react';

import './App.scss';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';

function moviesFilter(movies, searchQuery) {
  let filteredMovies = [...movies];

  if (searchQuery) {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    filteredMovies = filteredMovies.filter(movie => {
      return (
        movie.title.toLowerCase().includes(normalizedQuery) ||
        movie.description.toLowerCase().includes(normalizedQuery)
      );
    });
  }

  return filteredMovies;
}

export const App = () => {
  const [query, setQuery] = useState('');
  const visibleMovies = moviesFilter(moviesFromServer, query);

  return (
    <div className="page">
      <div className="page-content">
        <div className="box">
          <div className="field">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="search-query" className="label">
              Search movie
            </label>

            <div className="control">
              <input
                type="text"
                id="search-query"
                className="input"
                placeholder="Type search word"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <MoviesList movies={visibleMovies} />
      </div>

      <div className="sidebar">Sidebar goes here</div>
    </div>
  );
};
