
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles({
    table: {
        
    },
    container: {
        width: "50%",
        border: "1px solid black",
        margin: "auto",
        marginTop: "15px"
    },
    button: {
        marginLeft: "25px",
    }, 
    icon: {
        marginLeft: "25px",
        paddingTop: "5px",
        cursor: "pointer"
    }
  });

const MoviesList = (props) => {
    const classes = useStyles();

    return (
        <TableContainer className={classes.container} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell align="right">Genre</TableCell>
                        <TableCell align="right">Stock&nbsp;(g)</TableCell>
                        <TableCell align="right">Rate&nbsp;(g)</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {props.moviesToShow.map((movie) => (
                    <TableRow key={movie._id} id={movie._id}>
                        <TableCell component="th" scope="row">
                            {movie.title}
                        </TableCell>
                        <TableCell align="right">{movie.genre.name}</TableCell>
                        <TableCell align="right">{movie.numberInStock}</TableCell>
                        <TableCell align="right">
                            {movie.dailyRentalRate}
                        </TableCell>
                        <TableCell align="right">
                            {movie.liked ? <FavoriteIcon className={classes.icon} onClick={() => props.onLike(movie)}/> : 
                                    <FavoriteBorderIcon className={classes.icon} onClick={() => props.onLike(movie)}/>}
                        </TableCell>
                        <TableCell align="right">
                            <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                className={classes.button}
                                onClick={() => props.onDelete(movie)}                            
                            >
                                Delete
                            </Button>
                        </TableCell>                        
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default MoviesList;