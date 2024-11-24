'use client'; 

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation'; 

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<any>(null); 
  const [cast, setCast] = useState<any[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter(); 

  useEffect(() => {
    
    const fetchMovieDetails = async () => {
      try {

        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY; 
        
        const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`);
        const movieData = await movieResponse.json();
        setMovie(movieData); 
    
        const castResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`);
        const castData = await castResponse.json();
        setCast(castData.cast); 
      } catch (error) {
        console.error("Error fetching movie details or cast:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetails(); 
    }
  }, [movieId]); 

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found!</div>;
  }

  // Function to go back to the homepage
  const handleBackClick = () => {
    router.push('/');
  };

  return (
    <>
    <div className="movie-details container mx-auto p-4 max-w-5xl">
      <button 
        onClick={handleBackClick}
        className="text-lg font-semibold text-white py-3 px-5 rounded hover:bg-gray-800 mb-8 bg-gray-700"
      >
        ← Back to Home
      </button>

      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-center">{movie.title}</h1>

        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-64 h-auto mb-4 rounded-lg shadow-lg"
        />

        <p className="text-lg text-gray-700 mb-4 text-center">{movie.overview}</p>

       
        <p className="text-sm text-gray-500 mb-4 text-center">Release Date: {movie.release_date}</p>

        <div className="flex justify-center items-center mb-4">
          <span className="text-yellow-400 text-xl">★</span>
          <span className="ml-2 text-lg">{movie.vote_average}</span>
        </div>

        <div className="text-sm text-gray-600 mb-8 text-center">
          <strong>Genres:</strong> 
          {movie.genres?.map((genre: { name: string }) => genre.name).join(", ")}
        </div>
      </div>

      <div className="cast-section">
        <h2 className="text-3xl font-semibold mb-6 text-center">Cast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 justify-items-center">
          {cast.length > 0 ? (
            cast.slice(0, 8).map((actor: any) => (
              <div key={actor.id} className="cast-card bg-white shadow-lg rounded-lg p-4 w-full max-w-xs">
                <img
                  src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                  alt={actor.name}
                  className="w-full h-80 object-cover rounded-t-lg mb-4"
                />
                <div className="cast-info text-center">
                  <p className="text-lg font-semibold text-gray-800">{actor.name}</p>
                  <p className="text-sm text-gray-500">{actor.character}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No cast information available</p>
          )}
        </div>
      </div>
    </div>

    </>
  );
};

export default MovieDetails;
