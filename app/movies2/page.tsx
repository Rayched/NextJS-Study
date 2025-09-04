"use client"

import { useEffect, useState } from "react";
import { I_Movies } from "../movies/page";

export default function MoviesIIPage(){
    const [isLoading, setLoading] = useState(true);
    const [Movies, setMovies] = useState<I_Movies[]>([]);

    const GetMovieData = async() => {
        const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";
        const MovieData = await(await(
            await fetch(API_URL)
        ).json());

        setMovies(MovieData);
        setLoading(false);
    }

    useEffect(() => {
        GetMovieData();
    }, []);

    return (
        <div>
            <h4>Movies Page / Client Side</h4>
            {
                isLoading ? "Loading..."
                : (
                    <ul>
                        {
                            Movies?.map((data) => {
                                return <li key={data.id}>{data.title}</li>
                            })
                        }
                    </ul>
                )
            }
        </div>
    );
}