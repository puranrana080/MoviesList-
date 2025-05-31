import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMoveis] = useState([]);
const [isLoading,setIsloading] = useState(false)

  const fetchMoviesHandler = async () => {
    setIsloading(true)
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
    setIsloading(false)
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={() => fetchMoviesHandler()}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length>0 &&  <MoviesList movies={movies} />}
        {!isLoading && movies.length===0 && <p>No Movies</p> }
        {isLoading && movies.length!==0 && <p> Loading...</p> }
      </section>
    </React.Fragment>
  );
}

export default App;
