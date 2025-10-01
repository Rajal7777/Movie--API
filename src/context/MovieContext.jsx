import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
    const[favourites, setFavourites] = useState([])
   
    //To get the fav movies stored in local strorage when page loads for 1st time.
    useEffect(()=>{
        const storedFavs = localStorage.getItem("favourites")

        if (storedFavs)  setFavourites(JSON.parse(storedFavs))
    },[])

     useEffect(()=>{
        localStorage.setItem('favourites', JSON.stringify(favourites))
     },[favourites]);

     const addToFavourites = (movie) => {
        setFavourites((prev)      => [...prev, movie])
     }

     const removeFromFavourites = (movieId) => {
           setFavourites(prev => prev.filter(movie => movie.id !== movieId))
     }

     const isFavourite = (movieId) => {
        return favourites.some(movie => movie.id === movieId)
     }

     //to make  value and function available any where (it works like props but it is eassy to use and can be accesed from any where)

     const value = {
        favourites,
        addToFavourites,
        removeFromFavourites,
        isFavourite
     }
    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}