import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../Services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const[movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
          try {
           const popularMovies = await getPopularMovies();
            setMovies(popularMovies)
          } catch (error) {
            console.log(error);
            setError("Failed to load movie")
          }
          finally{ setLoading(false)}
    }
    loadPopularMovies()
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!searchQuery.trim()) return
    if(loading) return
    setLoading(true)
    try {
      const searchResults = await searchMovies(searchQuery)
      setMovies(searchResults)
    } catch (error) {
       console.log_(error)
       setError("Failed to serch movie")
    }finally{
      setLoading(false)
    }


    setSearchQuery("")
  };
  return (
    <>
        <div className="home">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for movie..."
          className="search-input"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
         
      {error && <div className="error-message">{error}</div>}

      {loading? (<div className="loading">loading...</div>):
        (<div className="movie-grid">
          {movies.map((movie) => (
            movie.title.toLocaleLowerCase().startsWith(searchQuery.toLocaleLowerCase()) &&
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>)
}
      </div>
    </>
  );
}
export default Home;
