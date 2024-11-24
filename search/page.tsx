import Link from 'next/link';
import Rating from "@/components/rating"
import { SSComponentProp, Movie, RequestResponse } from "@/types"
import { request } from "@/lib/request"
import FavoriteToggle from "@/components/favorite-toggle"
import Image from "next/image"

const SearchPage = async ({ searchParams }: SSComponentProp<{}, { query: string }>) => {
  const { query } = await searchParams;

  const { results: movies } = await request<Movie[]>("/search/movie", {
    query: encodeURIComponent(query)
  })

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto p-6 flex-1">
        <h1 className="text-4xl font-semibold text-center mb-6">Search Results for: "{query}"</h1>

        {movies.length === 0 ? (
          <p className="text-center">No movies found for "{query}".</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="movie-card relative flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
              >
         
                <div className="relative movie-poster w-full h-[300px] rounded-lg transform transition-all duration-300 ease-in-out hover:scale-105"
                >
                  <Link href={`/movies/${movie.id}`}>
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className='object-cover'
                      fill
                    />
                  </Link>
                </div>


                <FavoriteToggle movie={movie} />

                <h3 className="text-sm mt-2 font-bold">{movie.title}</h3>
                <p className="text-xs text-gray-500">{movie.release_date}</p>
                <div className="flex justify-center items-center mt-2">
                  <span className="text-yellow-400 text-lg">
                    <Rating rating={movie.vote_average} />
                  </span>
                  <span className="ml-2 text-sm text-gray-700">{movie.vote_average.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
