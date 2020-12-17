import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    listItem: {
        margin: 'auto',
        marginTop: "15px",
        textAlign: 'center'
    },
});
const Movie = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.listItem}>
            {
                (props.noOfMovies === 0) ? <span>There are no movies in database </span> : <span>Showing {props.noOfMovies} movies in database</span>
            }
        </div>
    )
};

export default Movie;