'use client';

import { useState, useEffect } from "react";
import {Movie } from "@/types"

export default function FavoriteToggle({ response }: { response: string }) {
    const [loading, setLoading] = useState<boolean>(true);

    const [error, setError] = useState<string | null>(null);

    const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

    

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavoriteMovies(storedFavorites);
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <button
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
        </button>
    )
}
