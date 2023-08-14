import { styled } from "styled-components";
import { makeImagePath } from "../utils";
import { IGetResult } from "../api";

const BannerWrapper = styled.div<{ bgphoto: string }>`
  height: 100vh;
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

interface IBanner {
  data: IGetResult;
}

function Banner({ data }: IBanner) {
  return (
    <BannerWrapper
      bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}
    >
      <Title>{data?.results[0].title}</Title>
      <Overview>{data?.results[0].overview}</Overview>
    </BannerWrapper>
  );
}

export default Banner;
