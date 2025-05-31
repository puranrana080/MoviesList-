import React, { useState, useEffect, useCallback } from "react";
import AddMovie from "./components/AddMovie";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsloading(true);
    setError(null);
    try {
      // const response = await fetch("https://swapi.info/api/films");
      const response = await fetch("https://react-movie-http-dcf91-default-rtdb.firebaseio.com/movies.json");
      if (!response.ok) {
        throw new Error("Something went wrong...Retrying");
      }
      const data = await response.json();
      const loadedMovies  =[]
      for(let key in data){
        loadedMovies.push({id:key,title:data[key].title,
openingText:data[key].openingText,
releaseDate:data[key].release_date
        })
      }
      setMovies(loadedMovies);
      setIsloading(false);
      setRetrying(false);
      if (intervalId) {
        clearTimeout(intervalId);
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
  }, [intervalId,retrying]);
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler,movies]);


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
  const addMovie=async(movie)=>{
    console.log("this is the movei",movie)
    const response=await fetch("https://react-movie-http-dcf91-default-rtdb.firebaseio.com/movies.json",{
      method:"POST",
      body:JSON.stringify(movie),
        headers:{'Content-Type':'application/json'}
    })
    const data=await response.json()
    console.log(data)

  }

  return (
    <React.Fragment>
       <section><AddMovie  onAddMovie={addMovie}/></section>
      <section>
        <button onClick={() => fetchMoviesHandler()}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
