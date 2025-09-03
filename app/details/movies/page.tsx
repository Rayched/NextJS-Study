"use client"

import { useEffect, useState } from "react";

interface I_Movies {
    "adult": boolean;
    "backdrop_path": string;
    "genre_ids": number[];
    "id": number;
    "original_language": string;
    "original_title": string;
    "overview": string;
    "popularity": number;
    "poster_path": string;
    "release_date": string;
    "title": string;
    "video": false;
    "vote_average": number;
    "vote_count": number;
};

function MoviesPage(){
    const [isLoading, setLoading] = useState(true);
    const [Movies, setMovies] = useState<I_Movies[]>([]);

    const GetMovieData = async() => {
        const MovieData = await(await(
            await fetch("https://nomad-movies.nomadcoders.workers.dev/movies")
        ).json());

        setMovies(MovieData);
        setLoading(false);
    };

    useEffect(() => {
        GetMovieData();
    }, []);

    return (
        <div>
            <h4>Movie's Data</h4>
            {   
                isLoading ? "Loading..."
                : (<ul>
                    {
                        Movies?.map((movieData) => {
                            return <li key={movieData.id}>{movieData.title}</li>
                        })
                    }
                </ul>)
            }
        </div>
    );
};

export default MoviesPage;