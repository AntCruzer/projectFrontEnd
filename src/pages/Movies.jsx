import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://practiceapp-kxv8.onrender.com/api';

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w342';

function Movies() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [cachedMovies, setCachedMovies] = useState([]);

  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingCached, setIsLoadingCached] = useState(true);
  const [isRefreshingCache, setIsRefreshingCache] = useState(false);
  const [importingTmdbId, setImportingTmdbId] = useState(null);

  const [searchError, setSearchError] = useState('');
  const [cacheError, setCacheError] = useState('');
  const [pageMessage, setPageMessage] = useState('');

  const token = localStorage.getItem('token');

  const cachedTmdbIds = useMemo(() => {
    return new Set(cachedMovies.map((movie) => Number(movie.tmdb_id)));
  }, [cachedMovies]);

  const fetchCachedMovies = async (isManualRefresh = false) => {
    try {
      if (isManualRefresh) {
        setIsRefreshingCache(true);
      } else {
        setIsLoadingCached(true);
      }

      setCacheError('');

      const response = await fetch(`${API_BASE_URL}/movies`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load cached movies');
      }

      setCachedMovies(data);
    } catch (err) {
      setCacheError(err.message);
    } finally {
      if (isManualRefresh) {
        setIsRefreshingCache(false);
      } else {
        setIsLoadingCached(false);
      }
    }
  };

  useEffect(() => {
    fetchCachedMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    const trimmedQuery = searchQuery.trim();
    setPageMessage('');

    if (!trimmedQuery) {
      setSearchError('Enter a movie title to search.');
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      setSearchError('');

      const response = await fetch(
        `${API_BASE_URL}/tmdb/search?query=${encodeURIComponent(trimmedQuery)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Search failed');
      }

      setSearchResults(data.results || []);

      if ((data.results || []).length === 0) {
        setPageMessage('No movies matched your search.');
      }
    } catch (err) {
      setSearchError(err.message);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleImportMovie = async (tmdbId) => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      setImportingTmdbId(tmdbId);
      setPageMessage('');

      const response = await fetch(`${API_BASE_URL}/movies/import`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ tmdbId })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Import failed');
      }

      const importedMovie = data.movie;
      setPageMessage(data.message || 'Movie added to the app.');

      if (importedMovie) {
        setCachedMovies((prevMovies) => {
          const alreadyExists = prevMovies.some(
            (movie) => Number(movie.tmdb_id) === Number(importedMovie.tmdb_id)
          );

          if (alreadyExists) {
            return prevMovies.map((movie) =>
              Number(movie.tmdb_id) === Number(importedMovie.tmdb_id)
                ? importedMovie
                : movie
            );
          }

          return [importedMovie, ...prevMovies];
        });
      } else {
        fetchCachedMovies(true);
      }
    } catch (err) {
      setPageMessage(`Error: ${err.message}`);
    } finally {
      setImportingTmdbId(null);
    }
  };

  const buildPosterUrl = (posterPath) => {
    if (!posterPath) {
      return null;
    }

    return `${TMDB_IMAGE_BASE_URL}${posterPath}`;
  };

  return (
    <section className="movies-page">
      <div className="movies-page-header">
        <h2>Movies</h2>
        <p className="movies-page-intro">
          Search TMDB, then import selected titles into ReelRemind&apos;s local movie cache.
        </p>
      </div>

      <div className="movies-search-panel">
        <form className="movies-search-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="movies-search-input"
            placeholder="Search TMDB for a movie title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button type="submit" className="primary-action-button" disabled={isSearching}>
            {isSearching ? 'Searching...' : 'Search TMDB'}
          </button>

          <button
            type="button"
            className="secondary-action-button"
            onClick={() => fetchCachedMovies(true)}
            disabled={isRefreshingCache}
          >
            {isRefreshingCache ? 'Refreshing...' : 'Refresh Cache'}
          </button>
        </form>

        <p className="movies-helper-text">
          {token
            ? 'You are logged in, so you can search and import movies.'
            : 'You can search and browse cached movies now. Log in when you are ready to import.'}
        </p>

        {searchError && <p className="dashboard-error">Error: {searchError}</p>}

        {pageMessage && (
          <p className={pageMessage.startsWith('Error:') ? 'dashboard-error' : 'movies-success'}>
            {pageMessage}
          </p>
        )}
      </div>

      <div className="movies-content-grid">
        <div className="movies-column">
          <div className="movies-section-header">
            <h3>TMDB Search Results</h3>
          </div>

          {isSearching ? (
            <p className="movies-placeholder-text">Searching TMDB...</p>
          ) : searchResults.length === 0 ? (
            <p className="movies-placeholder-text">
              Search above to find movies you want to add to ReelRemind.
            </p>
          ) : (
            <div className="movies-grid">
              {searchResults.map((movie) => {
                const posterUrl = buildPosterUrl(movie.poster_path);
                const isCached = cachedTmdbIds.has(Number(movie.tmdb_id));
                const isImporting = importingTmdbId === movie.tmdb_id;

                return (
                  <article className="movie-browser-card" key={movie.tmdb_id}>
                    {posterUrl ? (
                      <img
                        src={posterUrl}
                        alt={`${movie.title} poster`}
                        className="movie-browser-poster"
                      />
                    ) : (
                      <div className="movie-browser-poster-placeholder">No Poster</div>
                    )}

                    <div className="movie-browser-content">
                      <h3>{movie.title}</h3>

                      <p className="movie-browser-meta">
                        Release Date: {movie.release_date || 'TBD'}
                      </p>

                      <p className="movie-browser-overview">
                        {movie.overview || 'No overview available.'}
                      </p>

                      <button
                        type="button"
                        className="primary-action-button movie-card-button"
                        disabled={isCached || isImporting}
                        onClick={() => handleImportMovie(movie.tmdb_id)}
                      >
                        {isCached
                          ? 'Already in App'
                          : isImporting
                          ? 'Adding...'
                          : token
                          ? 'Add to App'
                          : 'Login to Add'}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        <div className="movies-column">
          <div className="movies-section-header">
            <h3>Cached Movies in ReelRemind</h3>
          </div>

          {isLoadingCached ? (
            <p className="movies-placeholder-text">Loading cached movies...</p>
          ) : cacheError ? (
            <p className="dashboard-error">Error: {cacheError}</p>
          ) : cachedMovies.length === 0 ? (
            <p className="movies-placeholder-text">
              No movies have been imported yet.
            </p>
          ) : (
            <div className="movies-grid">
              {cachedMovies.map((movie) => {
                const posterUrl = buildPosterUrl(movie.poster_path);

                return (
                  <article className="movie-browser-card" key={movie.id}>
                    {posterUrl ? (
                      <img
                        src={posterUrl}
                        alt={`${movie.title} poster`}
                        className="movie-browser-poster"
                      />
                    ) : (
                      <div className="movie-browser-poster-placeholder">No Poster</div>
                    )}

                    <div className="movie-browser-content">
                      <h3>{movie.title}</h3>

                      <p className="movie-browser-meta">
                        Release Date: {movie.release_date || 'TBD'}
                      </p>

                      <p className="movie-browser-meta">
                        Runtime: {movie.runtime ? `${movie.runtime} min` : 'Unknown'}
                      </p>

                      <p className="movie-browser-meta">
                        TMDB ID: {movie.tmdb_id}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Movies;