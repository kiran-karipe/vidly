import './App.css';
import { getMovies } from './services/fakeMovieService';
import { useState, useEffect } from 'react';
import MoviesList from './components/MoviesList';
import Movie from './components/Movie';
import Pagination from '@material-ui/lab/Pagination';

function App() {
  const moviesMock = getMovies();
  const [movies, setMovies] = useState([]);
  const [noOfMovies, setLength] = useState(0);

  useEffect(() => {
    setLength(moviesMock.length);
    setMovies(moviesMock);
  }, []);

  const handleDelete = movie => {
    if (movies.indexOf(movie) > -1) {
      const tempMovies = [...movies];
      tempMovies.splice(movies.indexOf(movie), 1);
      setMovies(tempMovies);
      setLength(tempMovies.length);
    }
  }

  const handleLike = movie => {
    setMovies(
      movies.map((item) => {
        if(item._id === movie._id ) {
          return {
            ...movie,
            liked: !movie.liked,
          }
        }
        else {
          return item;
        }
      })
    );
  }

  return (
    <div className="App">
      <Movie noOfMovies={noOfMovies}/>
      {noOfMovies > 0 && <MoviesList movies={movies} onDelete={handleDelete} onLike={handleLike}/>}
      <Pagination count={10} variant="outlined" shape="rounded" />
    </div>
  );
}

export default App;
