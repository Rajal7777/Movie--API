import "../css/Favourite.css"
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";

function Favourites() {
    const { favourites} = useMovieContext();

    if (Favourites){
        return (
            <div className="favourites">
                <h2>Your Favourites</h2>
            <div className="movie-grid">
          {favourites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
        ))}
        </div>
        </div>
        );
    }

    return <div className="favourite-empty">
        <h2>NO Favourite Movies</h2>
        <p>Start adding movie to your favourite</p>
    </div>
}
export default Favourites;