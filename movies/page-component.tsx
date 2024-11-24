'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { request } from "@/lib/request"
import { Movie, RequestResponse } from "@/types"
import MovieCard from "@/components/movie-card"


const MoreMovies = ({ response }: { response: string }) => {
    const movieData: RequestResponse<Movie[]> = JSON.parse(response)
    console.log({ movieData })

    const { ref: sliderRef, inView } = useInView({
        threshold: 0.5
    });

    const [page, setPage] = useState(movieData.page || 1);

    const [movies, setMovies] = useState(movieData.results);

    const [loading, setLoading] = useState(false);

    


    useEffect(() => {
        if (inView) {
            (async () => {
                try {
                    const newPage = page + 1;
                    if (movieData.total_pages > newPage) {
                        setLoading(true)
                        const movies = await request<Movie[]>("/discover/movie", { include_adult: true, include_video: true, page: newPage })
                        setMovies((prevMovies) => prevMovies.concat(movies.results));
                        setPage(movies.page);
                    }
                } catch (error) {
                    console.error('Error fetching more movies:', error);
                } finally {
                    setLoading(false);
                }
            })()
        }
    }, [inView]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4 text-center uppercase">Discover more movies</h1>
            <div
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
            >
                {movies.map((movie, index) => (
                    <MovieCard key={movie.id + index} ref={(movies.length - 1 === index) ? sliderRef : undefined}
                        {...movie} />
                ))}
                {loading && (
                    <div className="flex justify-center items-center w-full py-8">
                        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-transparent border-solid rounded-full border-blue-600"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MoreMovies;

