export const metadata = {
    title: "Movies",
    description: "'Details/Movies' page"
};

function MoviesLayout({children}: {children: React.ReactNode}){
    return (
        <div>{children}</div>
    );
};

export default MoviesLayout;