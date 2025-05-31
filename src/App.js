import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMoveis] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const fetchMoviesHandler = async () => {
    setIsloading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.info/api/film");
      if (!response.ok) {
        throw new Error("Something went wrong...Retrying");
      }
      const data = await response.json();

      const transformedData = data.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          release_date: movieData.release_date,
        };
      });
      setMoveis(transformedData);
      setIsloading(false);
      setRetrying(false);
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    } catch (error) {
      setError(error.message);
      setIsloading(false);
      if (!retrying) {
        setRetrying(true);
        const id = setTimeout(() => {
          fetchMoviesHandler();
        }, 5000);
        setIntervalId(id);
      }
    }
  };

  const cancelRetryingHandler = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setRetrying(false);
    setError("Retry cancelled by user");
  };

  let content = <p>Found No Movies</p>;
  if (isLoading) content = <p>Loading ...</p>;
  if (movies.length > 0) content = <MoviesList movies={movies} />;
  if (error) {
    content = (
      <>
        <p>{error}</p>
        {retrying && (
          <button onClick={() => cancelRetryingHandler()}>Cancel</button>
        )}
      </>
    );
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={() => fetchMoviesHandler()}>Fetch Movies</button>
      </section>
      <section>
       
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
