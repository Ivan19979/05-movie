import { Movie } from "./Movie";

function Movies(props) {
  const { movies = [], type, page, totalResults } = props;
  return (
    <div>
      <div className="movies">
        {!movies.length ? (
          <h5>{type} not found!</h5>
        ) : (
          movies.map((movie) => <Movie key={movie.imdbID} {...movie} />)
        )}
      </div>
      {page < totalResults ? (
        <button
          onClick={props.moreArrow}
          className="btn grey lighten-5 movies-btn"
        >
          More <span>&#10549;</span>
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export { Movies };
