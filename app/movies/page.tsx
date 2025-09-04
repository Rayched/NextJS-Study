import { title } from "process";
import { useState } from "react";

export interface I_Movies {
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

export const metaData = {
    title: "Movies"
};

export const GetMovieData = async() => {
    const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";
    const MovieData: I_Movies[] = await(await(
        await fetch(API_URL)
    ).json());

    return MovieData;
}

async function MoviesPage(){
    const Movies = await GetMovieData();

    /**
     * 'useState', 'useEffect' 같은 React Hook들은
     * Client Component에서만 동작하므로
     * Server Component인 MoviesPage에서는
     * 동작하지 않는다.
     */

    return (
        <div>
            <h4>Movies Page / Server Side</h4>
            <ul>
                {
                    Movies?.map((data) => {
                        return <li key={data.id}>{data.title}</li>
                    })
                }
            </ul>
        </div>
    );
};

export default MoviesPage;