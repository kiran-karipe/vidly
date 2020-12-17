import './App.css';
import { getMovies } from './services/fakeMovieService';
import { useState, useEffect } from 'react';
import MoviesList from './components/MoviesList';
import Movie from './components/Movie';
import Pagination from '@material-ui/lab/Pagination';
import { paginate } from './utils/paginate';

function App() {
  const moviesMock = getMovies();
  const [movies, setMovies] = useState([]);
  const [noOfMovies, setLength] = useState(0);
  const [paginationCount, setPaginationCount] = useState(0);
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLength(moviesMock.length);
    setMovies(moviesMock);
    setPaginationCount(Math.ceil(moviesMock.length / 4));
    const filteredMovies = paginate(moviesMock, currentPage, 4);
    setMoviesToShow(filteredMovies);
  }, []);

  const handleDelete = movie => {
    if (movies.indexOf(movie) > -1) {
      const tempMovies = [...movies];
      tempMovies.splice(movies.indexOf(movie), 1);
      setMovies(tempMovies);
      setLength(tempMovies.length);
      const filteredMovies = paginate(tempMovies, currentPage, 4);
      setMoviesToShow(filteredMovies);
      setPaginationCount(Math.ceil(tempMovies.length / 4));
    }
  }

  const handleLike = movie => {
    const allMovies = movies.map((item) => {
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
    setMovies(allMovies);
    const filteredMovies = paginate(allMovies, currentPage, 4);
    setMoviesToShow(filteredMovies);
  }

  const handlePagination = (e, value) => {
    const allMovies = [...movies];
    const filteredMovies = paginate(allMovies, value, 4);
    setMoviesToShow(filteredMovies);
    setCurrentPage(value);
  };

  return (
    <div className="App">
      <Movie noOfMovies={noOfMovies}/>
      {noOfMovies > 0 && <MoviesList moviesToShow={moviesToShow} onDelete={handleDelete} onLike={handleLike}/>}
      {noOfMovies > 0 && <Pagination className="pagination" count={paginationCount} variant="outlined" shape="rounded" onChange={handlePagination}/>}
    </div>
  );
}

export default App;
