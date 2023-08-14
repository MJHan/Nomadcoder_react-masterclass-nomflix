import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getTrend,
  getResults,
  IGetResult,
  MENU_ID,
  TV_CATEGORY,
  TV_SLIDER_TITLE,
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

function Tv() {
  const { data: dataTrend, isLoading: isLoadingTrend } = useQuery<IGetResult>(
    [TV_CATEGORY.TREND],
    () => getTrend(MENU_ID.TV, "week")
  );
  const { data: dataLatest, isLoading: isLoadingLatest } = useQuery<IGetResult>(
    [TV_CATEGORY.LATEST],
    () => getResults(MENU_ID.TV, TV_CATEGORY.LATEST)
  );
  const { data: dataPopular, isLoading: isLoadingPopular } =
    useQuery<IGetResult>([TV_CATEGORY.POPULAR], () =>
      getResults(MENU_ID.TV, TV_CATEGORY.POPULAR)
    );
  const { data: dataAiringToday, isLoading: isLoadingAiringToday } =
    useQuery<IGetResult>([TV_CATEGORY.AIRING_TODAY], () =>
      getResults(MENU_ID.TV, TV_CATEGORY.AIRING_TODAY)
    );
  const { data: dataTopRated, isLoading: isLoadingTopRated } =
    useQuery<IGetResult>([TV_CATEGORY.TOP_RATED], () =>
      getResults(MENU_ID.TV, TV_CATEGORY.TOP_RATED)
    );

  return (
    <Wrapper>
      {isLoadingTrend ||
      isLoadingLatest ||
      isLoadingPopular ||
      isLoadingTopRated ||
      isLoadingAiringToday ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner menuId={MENU_ID.TV} data={dataTrend as IGetResult}></Banner>
          <SliderWrapper>
            <Slider
              menuId={MENU_ID.TV}
              category={TV_CATEGORY.TREND}
              data={dataTrend as IGetResult}
              title={TV_SLIDER_TITLE.TREND}
            ></Slider>
            <Slider
              menuId={MENU_ID.TV}
              category={TV_CATEGORY.LATEST}
              data={dataLatest as IGetResult}
              title={TV_SLIDER_TITLE.LATEST}
            ></Slider>
            <Slider
              menuId={MENU_ID.TV}
              category={TV_CATEGORY.TOP_RATED}
              data={dataTopRated as IGetResult}
              title={TV_SLIDER_TITLE.TOP_RATED}
            ></Slider>
            <Slider
              menuId={MENU_ID.TV}
              category={TV_CATEGORY.POPULAR}
              data={dataPopular as IGetResult}
              title={TV_SLIDER_TITLE.POPULAR}
            ></Slider>
            <Slider
              menuId={MENU_ID.TV}
              category={TV_CATEGORY.AIRING_TODAY}
              data={dataAiringToday as IGetResult}
              title={TV_SLIDER_TITLE.AIRING_TODAY}
            ></Slider>
          </SliderWrapper>
        </>
      )}
    </Wrapper>
  );
}
export default Tv;
