import { motion, useScroll } from "framer-motion";
import { useHistory } from "react-router-dom";
import { BASE_URL, makeImagePath } from "../utils";
import { IGetMoviesResult } from "../api";
import { styled } from "styled-components";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const Bigmovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

interface IPop {
  movieId: number;
  data: IGetMoviesResult;
}

function Pop({ movieId, data }: IPop) {
  const { scrollY } = useScroll();
  const history = useHistory();
  const onOverlayClick = () => history.push(`${BASE_URL}/`);

  const clickedMovie =
    movieId && data?.results.find((movie) => movie.id === +movieId);
  return (
    <>
      <Overlay
        onClick={onOverlayClick}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Bigmovie style={{ top: scrollY.get() + 100 }} layoutId={"" + movieId}>
          {clickedMovie && (
            <>
              <BigCover
                style={{
                  backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                    clickedMovie.backdrop_path,
                    "w500"
                  )})`,
                }}
              />
              <BigTitle>{clickedMovie.title}</BigTitle>
              <BigOverview>{clickedMovie.overview}</BigOverview>
            </>
          )}
        </Bigmovie>
      </Overlay>
    </>
  );
}

export default Pop;
