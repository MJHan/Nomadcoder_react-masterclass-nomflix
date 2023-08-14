import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getResults,
  getTrend,
  IGetResult,
  MENU_ID,
  MOVIE_CATEGORY,
  MOVIE_SLIDER_TITLE,
} from "../api";
import Slider from "../Components/Slider";
import Banner from "../Components/Banner";

const Wrapper = styled.div`
  background: black;
  /* padding-bottom: 100px; */
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
  const { data: dataTrend, isLoading: isLoadingTrend } = useQuery<IGetResult>(
    [MOVIE_CATEGORY.TREND],
    () => getTrend(MENU_ID.MOVIE, "week")
  );
  const { data: dataLatest, isLoading: isLoadingLatest } = useQuery<IGetResult>(
    [MOVIE_CATEGORY.LATEST],
    () => getResults(MENU_ID.MOVIE, MOVIE_CATEGORY.LATEST)
  );
  const { data: dataPopular, isLoading: isLoadingPopular } =
    useQuery<IGetResult>([MOVIE_CATEGORY.POPULAR], () =>
      getResults(MENU_ID.MOVIE, MOVIE_CATEGORY.POPULAR)
    );
  const { data: dataUpcoming, isLoading: isLoadingUpcoming } =
    useQuery<IGetResult>([MOVIE_CATEGORY.UPCOMING], () =>
      getResults(MENU_ID.MOVIE, MOVIE_CATEGORY.UPCOMING)
    );
  const { data: dataTopRated, isLoading: isLoadingTopRated } =
    useQuery<IGetResult>([MOVIE_CATEGORY.TOP_RATED], () =>
      getResults(MENU_ID.MOVIE, MOVIE_CATEGORY.TOP_RATED)
    );

  return (
    <Wrapper>
      {isLoadingTrend ||
      isLoadingLatest ||
      isLoadingPopular ||
      isLoadingTopRated ||
      isLoadingUpcoming ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            menuId={MENU_ID.MOVIE}
            data={dataTrend as IGetResult}
          ></Banner>
          <SliderWrapper>
            <Slider
              menuId={MENU_ID.MOVIE}
              category={MOVIE_CATEGORY.TREND}
              data={dataTrend as IGetResult}
              title={MOVIE_SLIDER_TITLE.TREND}
            ></Slider>
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
