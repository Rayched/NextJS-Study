//movies/[id] page's

async function MovieDetailPage({params, searchParams}){
    const {id} = await params;
    const searchs = await searchParams;

    console.log(`params: ${id}`);
    console.log('searchParams: ', searchs);
    return (
        <div>
            <h3>Movie Detail Page</h3>
            <h4>MovieId: {id}</h4>
            <h4>Region: {searchs.region}</h4>
        </div>
    );
};

export default MovieDetailPage;