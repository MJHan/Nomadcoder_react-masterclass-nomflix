import { motion } from "framer-motion";
import { Link, useHistory } from "react-router-dom";
import { BASE_URL, makeImagePath } from "../utils";
import { IDetail, MENU_ID, getDetail } from "../api";
import { styled } from "styled-components";
import { useQuery } from "react-query";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 60;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Bigmovie = styled(motion.div)`
  position: absolute;
  width: 50vw;
  height: 75vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: 100px;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
  z-index: 99;
`;

const BigCover = styled.div`
  width: 100%;
  height: 40vh;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding-left: 20px;
`;

const Poster = styled.img`
  width: 200px;
  box-shadow: 8px 16px 16px hsl(0deg 0% 0% / 0.25);
  position: relative;
  top: -40px;
`;
const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  font-size: 46px;
`;

const BigOriginalTitle = styled.h4`
  font-size: 30px;
  font-weight: 500;
  padding-left: 20px;
  padding-bottom: 5px;
  color: ${(props) => props.theme.black.lighter};
  white-space: nowrap;
  text-shadow: 0.5px 0.5px 0.5px rgba(255, 255, 255, 0.3);
`;

const TagLine = styled.h5`
  font-size: 13px;
  align-self: flex-end;
  padding-right: 20px;
  padding-bottom: 20px;
  color: ${(props) => props.theme.white.darker};
`;
const BigOverview = styled.div`
  padding: 20px;
  position: relative;
  color: ${(props) => props.theme.white.lighter};
  display: flex;
  flex-direction: row;
`;

const LeftContents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 230px;
  position: relative;
`;

const RightContents = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-left: 10px;
`;

const Numbers = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  padding-bottom: 10px;
`;

const Rate = styled.span`
  font-size: 20px;
  font-weight: 500;
  color: #03c988;
`;

const ReleaseDate = styled.span`
  font-size: 16px;
`;

const RunningTime = styled.span`
  font-size: 16px;
`;

const Overview = styled.p`
  font-size: 16px;
  height: 25vh;
  overflow: auto;
`;

const Renre = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: flex-end;
`;

const Homepage = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 16px;
  color: ${(props) => props.theme.white.darker};
`;

interface IPop {
  menuId: string;
  category: string;
  id: number;
}

function Pop({ menuId, category, id }: IPop) {
  const history = useHistory();
  const { data: dataDetail, isLoading } = useQuery<IDetail>("dataDetail", () =>
    getDetail(menuId, id)
  );
  // console.log("DETAIL", dataDetail);
  console.log(category + id);
  const onOverlayClick = () => {
    menuId !== MENU_ID.MOVIE
      ? history.push(`${BASE_URL}/${menuId}`)
      : history.push(`${BASE_URL}/`);
  };
  return (
    <>
      <Overlay
        onClick={onOverlayClick}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <Bigmovie
            layoutId={category + id}
            onClick={() => {
              console.log("click!");
            }}
          >
            {dataDetail && (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                      dataDetail.backdrop_path,
                      "w500"
                    )})`,
                  }}
                >
                  <BigTitle>
                    {dataDetail.title ? dataDetail.title : dataDetail.name}
                  </BigTitle>
                  <BigOriginalTitle>
                    {dataDetail.original_title
                      ? dataDetail.original_title
                      : dataDetail.original_name}
                  </BigOriginalTitle>
                  <TagLine>{dataDetail.tagline}</TagLine>
                </BigCover>

                <BigOverview>
                  <LeftContents>
                    <Poster
                      src={makeImagePath(dataDetail.poster_path, "w200")}
                    />
                  </LeftContents>
                  <RightContents>
                    <Numbers>
                      <Rate>
                        {Math.round(dataDetail.vote_average * 10) / 10}
                      </Rate>
                      <ReleaseDate>
                        {dataDetail.release_date
                          ? dataDetail.release_date.slice(0, 4)
                          : dataDetail.last_air_date?.slice(0, 4)}
                      </ReleaseDate>
                      <RunningTime>
                        {dataDetail.runtime ? dataDetail.runtime + "분 " : ""}
                        {dataDetail.number_of_seasons
                          ? dataDetail.number_of_seasons + "시즌 "
                          : ""}
                        {dataDetail.number_of_episodes
                          ? dataDetail.number_of_episodes + "에피소드 "
                          : ""}
                      </RunningTime>
                      <Renre>
                        {dataDetail.genres.map((genre, idx) =>
                          idx === dataDetail.genres.length - 1
                            ? genre.name
                            : genre.name + ", "
                        )}
                      </Renre>
                    </Numbers>
                    <Overview>{dataDetail.overview}</Overview>
                    <Homepage>
                      {dataDetail.homepage !== "" ? (
                        <a href={dataDetail.homepage} target="_blank">
                          Go Homepage →
                        </a>
                      ) : null}
                    </Homepage>
                  </RightContents>
                </BigOverview>
              </>
            )}
          </Bigmovie>
        )}
      </Overlay>
    </>
  );
}

export default Pop;
