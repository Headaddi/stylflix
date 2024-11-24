'use client'; 

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

const Favorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]); 
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavoriteMovies(storedFavorites);
    setIsHydrated(true); 
  }, []);

  const toggleFavorite = (movie: Movie, event: React.MouseEvent) => {
    event.stopPropagation();

    let updatedFavorites: Movie[];
    const isMovieFavorite = favoriteMovies.some((fav) => fav.id === movie.id);

    if (isMovieFavorite) {
      updatedFavorites = favoriteMovies.filter((fav) => fav.id !== movie.id); 
    } else {
      updatedFavorites = [...favoriteMovies, movie]; 
    }

    setFavoriteMovies(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const isFavorite = (movieId: number) => {
    return favoriteMovies.some((fav) => fav.id === movieId); 
  };

  if (!isHydrated) {
    return <div>Loading...</div>; 
  }

  return (
    <>
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Your Favorite Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {favoriteMovies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card relative flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
          >
      
            <Link href={`/movies/${movie.id}`} passHref>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster w-full h-auto rounded-lg transform transition-all duration-300 ease-in-out hover:scale-105"
              />
            </Link>

           
            <div
              onClick={(e) => toggleFavorite(movie, e)} 
              className={`absolute top-2 right-2 p-2 cursor-pointer rounded-full ${isFavorite(movie.id) ? 'text-red-600' : 'text-white'}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={isFavorite(movie.id) ? 'currentColor' : 'none'}
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <h3 className="text-sm mt-2 font-bold">{movie.title}</h3>
            <p className="text-xs text-gray-500">{movie.release_date}</p>

            {/* Rating */}
            <div className="flex justify-center items-center mt-2">
              <span className="text-yellow-400 text-lg">{renderStars(movie.vote_average)}</span>
              <span className="ml-2 text-sm text-gray-700">{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating / 2);
  const halfStar = rating % 2 >= 1;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {'★'.repeat(fullStars)}
      {halfStar && '☆'}
      {'☆'.repeat(emptyStars)}
    </>
  );
};

export default Favorites;
