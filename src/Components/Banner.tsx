import { styled } from "styled-components";
import { BASE_URL, makeImagePath } from "../utils";
import { IGetResult } from "../api";
import { AnimatePresence, motion } from "framer-motion";
import { useHistory, useRouteMatch } from "react-router-dom";
import Pop from "./Pop";

const BannerWrapper = styled.div<{ bgphoto: string }>`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
  font-weight: normal;
`;

const ButtonWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-start;
`;

const Button = styled.div`
  width: 150px;
  height: 40px;
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.black.lighter};
  color: ${(props) => props.theme.white.lighter};
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  vertical-align: middle;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

interface IBanner {
  menuId: string;
  data: IGetResult;
}

function Banner({ menuId, data }: IBanner) {
  const history = useHistory();
  const bannerMovieMatch = useRouteMatch<{ id: string }>(
    `${BASE_URL}/${menuId}/banner/:id`
  );
  const onButtonClicked = (menuId: string, id: number): void => {
    history.push(`${BASE_URL}/${menuId}/banner/${id}`);
  };
  return (
    <BannerWrapper
      bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}
    >
      <Title>
        {data?.results[0].title
          ? data?.results[0].title
          : data?.results[0].name}
      </Title>
      <Overview>
        {data?.results[0].overview.slice(0, 160)}..{data?.results[0].id}.
      </Overview>
      <ButtonWrapper>
        <Button onClick={() => onButtonClicked(menuId, data?.results[0].id)}>
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z"
              fill="currentColor"
            ></path>
          </svg>
          상세 정보
        </Button>
      </ButtonWrapper>
      <AnimatePresence>
        {bannerMovieMatch ? (
          <Pop menuId={menuId} category="banner" id={data?.results[0].id}></Pop>
        ) : null}
      </AnimatePresence>
    </BannerWrapper>
  );
}

export default Banner;
