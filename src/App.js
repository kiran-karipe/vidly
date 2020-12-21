import './App.css';
import { getMovies } from './services/fakeMovieService';
import { getGenres } from './services/fakeGenreService';
import { useState } from 'react';
import MoviesList from './components/MoviesList';
import Movie from './components/Movie';
import Pagination from '@material-ui/lab/Pagination';
import { paginate } from './utils/paginate';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import _ from 'lodash';

function App() {
  const moviesMock = getMovies();
  const movieGenres = getGenres();
  // const [genres, setGenres] = useState(movieGenres);
  const [movies, setMovies] = useState(moviesMock);
  const [noOfMovies, setLength] = useState(moviesMock.length);
  const [paginationCount, setPaginationCount] = useState(Math.ceil(moviesMock.length / 4));
  const [currentPage, setCurrentPage] = useState(1);
  const filteredMovies = paginate(moviesMock, currentPage, 4);
  const [moviesToShow, setMoviesToShow] = useState(filteredMovies);
  const [selectedMenuItemIndex, setSelectedMenuItemIndex] = useState('');

  const handleDelete = movie => {
    if (movies.indexOf(movie) > -1) {
      const tempMovies = [...movies];
      tempMovies.splice(movies.indexOf(movie), 1);
      setMovies(tempMovies);
      setLength(tempMovies.length);
      let filteredMovies = paginate(tempMovies, currentPage, 4);
      if (filteredMovies.length === 0) {
        filteredMovies = paginate(tempMovies, currentPage - 1, 4);
        setCurrentPage(currentPage - 1);
      }
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

  const handleGenres = (genre) => {
    const allMovies = [...movies];
    const genreMovies = _.filter(allMovies, function(movie){
      return movie.genre.name === genre.name && movie;
    });
    setMoviesToShow(genreMovies);
    setPaginationCount(Math.ceil(genreMovies.length / 4));
    setSelectedMenuItemIndex(genre._id);
    setLength(genreMovies.length);
  }

  const handleAllGenres = () => {
    handlePagination(null, 1);
    setPaginationCount(Math.ceil(movies.length / 4));
    setSelectedMenuItemIndex('');
    setLength(movies.length);
  }

  return (
    <div className="App">
      <Paper className="paper">
        <MenuList>
          <MenuItem className="allGenres" onClick={handleAllGenres} selected={!selectedMenuItemIndex}>All Genres</MenuItem>
          {movieGenres.map((genre) => {
            const selectedGenre = genre._id === selectedMenuItemIndex ? true : false;
            return <MenuItem key={genre._id} onClick={() => handleGenres(genre)} selected={selectedGenre}>{genre.name}</MenuItem>;
          })}
        </MenuList>
      </Paper>
      <div className="moviesContainer">
        <Movie noOfMovies={noOfMovies}/>
        {noOfMovies > 0 && <MoviesList moviesToShow={moviesToShow} onDelete={handleDelete} onLike={handleLike}/>}
        {noOfMovies > 0 && <Pagination className="pagination" count={paginationCount} variant="outlined" shape="rounded" onChange={handlePagination} page={currentPage}/>}
      </div>
    </div>
  );
}

export default App;
