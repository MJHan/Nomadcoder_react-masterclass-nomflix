import { useLocation } from "react-router-dom";
import {
  IGetResult,
  MENU_ID,
  MOVIE_CATEGORY,
  MOVIE_SLIDER_TITLE,
  TV_CATEGORY,
  TV_SLIDER_TITLE,
  getSearch,
} from "../api";
import { useQuery } from "react-query";
import Slider from "../Components/Slider";
import { styled } from "styled-components";

const Wrapper = styled.div`
  margin-top: 30vh;
  background: black;
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

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  console.log("Keyword", keyword);

  const { data: dataSearchMovie, isLoading: isLoadingSearchMovie } =
    useQuery<IGetResult>([MOVIE_CATEGORY.SEARCH], () =>
      getSearch(MENU_ID.MOVIE, keyword as string)
    );
  const { data: dataSearchTv, isLoading: isLoadingSearchTv } =
    useQuery<IGetResult>([TV_CATEGORY.SEARCH], () =>
      getSearch(MENU_ID.TV, keyword as string)
    );

  return (
    <Wrapper>
      {isLoadingSearchMovie || isLoadingSearchTv ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <SliderWrapper>
            <Slider
              menuId={MENU_ID.SEARCH}
              category={MOVIE_CATEGORY.SEARCH}
              data={dataSearchMovie as IGetResult}
              title={MOVIE_SLIDER_TITLE.SEARCH}
            ></Slider>
            <Slider
              menuId={MENU_ID.SEARCH}
              category={TV_CATEGORY.SEARCH}
              data={dataSearchTv as IGetResult}
              title={TV_SLIDER_TITLE.SEARCH}
            ></Slider>
          </SliderWrapper>
        </>
      )}
    </Wrapper>
  );
}

export default Search;
