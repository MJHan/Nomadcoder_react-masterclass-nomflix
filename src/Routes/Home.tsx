import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getMovies,
  IGetResult,
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
  const { data: dataLatest, isLoading: isLoadingLatest } = useQuery<IGetResult>(
    [MOVIE_CATEGORY.LATEST],
    () => getMovies(MOVIE_CATEGORY.LATEST)
  );
  const { data: dataPopular, isLoading: isLoadingPopular } =
    useQuery<IGetResult>([MOVIE_CATEGORY.POPULAR], () =>
      getMovies(MOVIE_CATEGORY.POPULAR)
    );
  const { data: dataUpcoming, isLoading: isLoadingUpcoming } =
    useQuery<IGetResult>([MOVIE_CATEGORY.UPCOMING], () =>
      getMovies(MOVIE_CATEGORY.UPCOMING)
    );
  const { data: dataTopRated, isLoading: isLoadingTopRated } =
    useQuery<IGetResult>([MOVIE_CATEGORY.TOP_RATED], () =>
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
          <Banner data={dataLatest as IGetResult}></Banner>
          <SliderWrapper>
            <Slider
              menuId={MENU_ID.MOVIE}
              category={MOVIE_CATEGORY.LATEST}
              data={dataLatest as IGetResult}
              title={MOVIE_SLIDER_TITLE.LATEST}
            ></Slider>
            <Slider
              menuId={MENU_ID.MOVIE}
              category={MOVIE_CATEGORY.TOP_RATED}
              data={dataTopRated as IGetResult}
              title={MOVIE_SLIDER_TITLE.TOP_RATED}
            ></Slider>
            <Slider
              menuId={MENU_ID.MOVIE}
              category={MOVIE_CATEGORY.POPULAR}
              data={dataPopular as IGetResult}
              title={MOVIE_SLIDER_TITLE.POPULAR}
            ></Slider>
            <Slider
              menuId={MENU_ID.MOVIE}
              category={MOVIE_CATEGORY.UPCOMING}
              data={dataUpcoming as IGetResult}
              title={MOVIE_SLIDER_TITLE.UPCOMING}
            ></Slider>
          </SliderWrapper>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
