import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMoveis] = useState([]);
  const fetchMoviesHandler = async () => {
    const response = await fetch("https://swapi.info/api/films");
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
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={() => fetchMoviesHandler()}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
