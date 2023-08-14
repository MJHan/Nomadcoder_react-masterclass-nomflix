import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import Slider from "../Components/Slider";
import Banner from "../Components/Banner";

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Home() {
  // const history = useHistory();
  // const bigMovieMatch = useRouteMatch<{ movieId: string }>(
  //   `${BASE_URL}/movies/:movieId`
  // );

  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner data={data as IGetMoviesResult}></Banner>
          <Slider data={data as IGetMoviesResult}></Slider>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
