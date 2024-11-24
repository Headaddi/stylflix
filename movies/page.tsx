
import PageComponent from "./page-component"
import { request } from "@/lib/request"
import { Movie } from "@/types"



const MoreMovies = async () => {
  // /discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'
  const response = await request<Movie[]>("/discover/movie", { include_adult: true, include_video: true, page: 1 })

  return (
    <PageComponent response={JSON.stringify(response)} />
  );
};

export default MoreMovies;
