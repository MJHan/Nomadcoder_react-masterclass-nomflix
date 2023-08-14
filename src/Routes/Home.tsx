import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getMovies,
  IGetMoviesResult,
  MENU_ID,
  MOVIE_CATEGORY,
  MOVIE_SLIDER_TITLE,
} from "../api";
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

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

function Home() {
  const { data: dataLatest, isLoading: isLoadingLatest } =
    useQuery<IGetMoviesResult>([MOVIE_CATEGORY.LATEST], () =>
      getMovies(MOVIE_CATEGORY.LATEST)
    );
  const { data: dataPopular, isLoading: isLoadingPopular } =
    useQuery<IGetMoviesResult>([MOVIE_CATEGORY.POPULAR], () =>
      getMovies(MOVIE_CATEGORY.POPULAR)
    );
  const { data: dataUpcoming, isLoading: isLoadingUpcoming } =
    useQuery<IGetMoviesResult>([MOVIE_CATEGORY.UPCOMING], () =>
      getMovies(MOVIE_CATEGORY.UPCOMING)
    );
  const { data: dataTopRated, isLoading: isLoadingTopRated } =
    useQuery<IGetMoviesResult>([MOVIE_CATEGORY.TOP_RATED], () =>
      getMovies(MOVIE_CATEGORY.TOP_RATED)
    );

  return (
    <Wrapper>
      {isLoadingLatest ||
      isLoadingPopular ||
      isLoadingTopRated ||
      isLoadingUpcoming ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner data={dataLatest as IGetMoviesResult}></Banner>
          <SliderWrapper>
            <Slider
              menuId={MENU_ID.MOVIE}
              category={MOVIE_CATEGORY.LATEST}
              data={dataLatest as IGetMoviesResult}
              title={MOVIE_SLIDER_TITLE.LATEST}
            ></Slider>
            <Slider
              menuId={MENU_ID.MOVIE}
              category={MOVIE_CATEGORY.TOP_RATED}
              data={dataTopRated as IGetMoviesResult}
              title={MOVIE_SLIDER_TITLE.TOP_RATED}
            ></Slider>
            <Slider
              menuId={MENU_ID.MOVIE}
              category={MOVIE_CATEGORY.POPULAR}
              data={dataPopular as IGetMoviesResult}
              title={MOVIE_SLIDER_TITLE.POPULAR}
            ></Slider>
            <Slider
              menuId={MENU_ID.MOVIE}
              category={MOVIE_CATEGORY.UPCOMING}
              data={dataUpcoming as IGetMoviesResult}
              title={MOVIE_SLIDER_TITLE.UPCOMING}
            ></Slider>
          </SliderWrapper>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
