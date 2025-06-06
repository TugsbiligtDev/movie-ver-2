
export default async function searchPage({params})  {
    const searchTerm= params.searchTerm
    const res= await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${bbf18a55b60c1ac8ab73d875ce112616}query=${searchTerm}&language=en-US&page=1&include+adult=false`)
    const data = await res.json()
    const results= data.results
  return (
    <div>page</div>
  )
}

