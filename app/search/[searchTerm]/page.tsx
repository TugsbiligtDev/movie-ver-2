
export default async function SearchPage({params}: {params: {searchTerm: string}}) {
    const searchTerm = params.searchTerm
    const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${searchTerm}&language=en-US&page=1&include_adult=false`
    )
    const data = await res.json()
    const results = data.results
    
    return (
        <div>page</div>
    )
}


TMDB_API_KEY=bbf18a55b60c1ac8ab73d875ce112616


