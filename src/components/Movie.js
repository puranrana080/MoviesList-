import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {

  
  return (<>
  
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
    </li>
    <button onClick={()=>props.handleDelete(props.id)} style={{backgroundColor:'yellow' ,color:'black'}}>Delete</button>
    <hr></hr>
  </>
  );
};

export default Movie;
