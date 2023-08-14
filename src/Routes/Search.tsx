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
import { useEffect } from "react";

const Wrapper = styled.div`
  margin-top: 30vh;
  background: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;

const SliderWrapper = styled.div`
  height: 100vh;
  top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const SearchingText = styled.div`
  top: -100px;
  height: 20hv;
  color: rgba(255, 255, 255, 0.6);
  font-size: 24px;
  position: relative;
  padding-left: 10px;
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const {
    data: dataSearchMovie,
    isLoading: isLoadingSearchMovie,
    refetch: refetchMovie,
  } = useQuery<IGetResult>([MOVIE_CATEGORY.SEARCH], () =>
    getSearch(MENU_ID.MOVIE, keyword as string)
  );
  const {
    data: dataSearchTv,
    isLoading: isLoadingSearchTv,
    refetch: refetchTv,
  } = useQuery<IGetResult>([TV_CATEGORY.SEARCH], () =>
    getSearch(MENU_ID.TV, keyword as string)
  );

  useEffect(() => {
    refetchMovie();
    refetchTv();
  }, [keyword, refetchMovie, refetchTv]);

  return (
    <Wrapper>
      {isLoadingSearchMovie || isLoadingSearchTv ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <SliderWrapper>
            <SearchingText>Result of Searching : {keyword}</SearchingText>
            <Slider
              menuId={MENU_ID.SEARCH}
              category={MENU_ID.MOVIE}
              data={dataSearchMovie as IGetResult}
              title={MOVIE_SLIDER_TITLE.SEARCH}
            ></Slider>
            <Slider
              menuId={MENU_ID.SEARCH}
              category={MENU_ID.TV}
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
