import { motion } from "framer-motion";
import { Link, useHistory } from "react-router-dom";
import { BASE_URL, makeImagePath } from "../utils";
import { IDetail, MENU_ID, getDetail } from "../api";
import { styled } from "styled-components";
import { useQuery } from "react-query";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
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

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 1);
  }
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
  font-family: Helvetica, sans-serif;
  font-size: 30px;
  font-weight: 500;
  padding-left: 20px;
  padding-bottom: 5px;
  color: ${(props) => props.theme.black.lighter};
  white-space: nowrap;
  text-shadow: 0.5px 0.5px 1px rgba(255, 255, 255, 0.2);
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
  padding-left: 15px;
`;

const Numbers = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;
`;

const Rate = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #03c988;
  letter-spacing: -1px;
`;

const ReleaseYear = styled.span`
  font-size: 16px;
  font-weight: 500;
  border-style: solid;
  border-color: #03c988;
  border-width: 2px;
  border-radius: 5px;
  padding: 2px;
`;

const RunningTime = styled.span`
  font-size: 16px;
  letter-spacing: -1px;
`;

const Overview = styled.p`
  font-size: 16px;
  height: 25vh;
  overflow: auto;
  &::-webkit-scrollbar {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 5px;
  }
`;

const Renre = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: flex-end;
`;

const ReleaseDate = styled.div`
  padding-bottom: 5px;
  font-size: 16px;
  font-weight: 500;
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
    menuId === MENU_ID.SEARCH ? getDetail(category, id) : getDetail(menuId, id)
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
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onOverlayClick}
      >
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <Bigmovie layoutId={category + id}>
            {dataDetail && (
              <>
                <CloseButton onClick={onOverlayClick}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="X"
                    role="button"
                    aria-label="close"
                  >
                    <title id="preview-modal-70035914">close</title>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.5858 12L2.29291 3.70706L3.70712 2.29285L12 10.5857L20.2929 2.29285L21.7071 3.70706L13.4142 12L21.7071 20.2928L20.2929 21.7071L12 13.4142L3.70712 21.7071L2.29291 20.2928L10.5858 12Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </CloseButton>
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
                      <ReleaseYear>
                        {dataDetail.release_date
                          ? dataDetail.release_date.slice(0, 4)
                          : dataDetail.last_air_date?.slice(0, 4)}
                      </ReleaseYear>
                      <Rate>
                        ⭐️ {Math.round(dataDetail.vote_average * 10) / 10}
                      </Rate>
                      <RunningTime>
                        {dataDetail.runtime ? dataDetail.runtime + " 분 " : ""}
                        {dataDetail.number_of_seasons
                          ? dataDetail.number_of_seasons + " 시즌 | "
                          : ""}
                        {dataDetail.number_of_episodes
                          ? dataDetail.number_of_episodes + " 에피소드 "
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
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <ReleaseDate>
                        {dataDetail.first_air_date
                          ? "First Air Date : " + dataDetail.first_air_date
                          : null}
                        {dataDetail.release_date
                          ? "Release Date : " + dataDetail.release_date
                          : null}
                      </ReleaseDate>
                      <Homepage>
                        {dataDetail.homepage !== "" ? (
                          <a href={dataDetail.homepage} target="_blank">
                            Go Homepage →
                          </a>
                        ) : null}
                      </Homepage>
                    </div>
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
