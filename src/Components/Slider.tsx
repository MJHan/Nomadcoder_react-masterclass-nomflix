import { AnimatePresence, motion } from "framer-motion";
import { useHistory, useRouteMatch } from "react-router-dom";
import { styled } from "styled-components";
import { BASE_URL, makeImagePath } from "../utils";
import { IGetMoviesResult } from "../api";
import Pop from "./Pop";
import { useState } from "react";

const TitleWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
`;

const SliderTitle = styled.h3`
  font-size: 25px;
`;

const Arrow = styled(motion.svg)`
  fill: ${(props) => props.theme.white.lighter};
  cursor: pointer;
  padding: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  vertical-align: middle;
`;

const SliderWrapper = styled.div`
  position: relative;
  top: -100px;
  height: 250px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center; //이거뭐지??
  height: 170px;
  font-size: 66px;
  border-radius: 5px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const BoxTitle = styled.div`
  font-size: 15px;
  font-weight: 500;
  white-space: pre-wrap;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 5px;
  text-shadow: 3px 4px 7px ${(props) => props.theme.black.darker};
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.veryDark};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const arrowVariants = {
  normal: {
    fillOpacity: 0.5,
  },
  active: {
    fillOpacity: 1,
  },
};

const rowVariants = {
  hidden: (reverse: boolean) => ({
    x: reverse ? -window.innerWidth - 5 : window.innerWidth + 5,
  }),
  visible: {
    x: 0,
    y: 0,
  },
  exit: (reverse: boolean) => ({
    x: reverse ? window.innerWidth + 5 : -window.innerWidth - 5,
  }),
};

const boxVarients = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.2,
      dureation: 0.1,
      type: "tween",
    },
  },
};

const infoVarients = {
  hover: {
    opacity: 0.7,
    transition: {
      delay: 0.2,
      duration: 0.1,
      type: "tween",
    },
  },
};

const offset = 6;

interface ISlider {
  menuId: string;
  category: string;
  data: IGetMoviesResult;
  title: string;
}
function Slider({ menuId, category, data, title }: ISlider) {
  const [index, setIndex] = useState(0);
  const [isReverse, setReverse] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const history = useHistory();
  const onBoxClicked = (menuId: string, category: string, id: number) => {
    history.push(`${BASE_URL}/${menuId}/${category}/${id}`);
  };
  const bigMovieMatch = useRouteMatch<{ id: string }>(
    `${BASE_URL}/${menuId}/${category}/:id`
  );
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const increaseIndex = (isReverse: boolean) => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setReverse(isReverse);
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) =>
        isReverse
          ? prev === 0
            ? maxIndex
            : prev - 1
          : prev === maxIndex
          ? 0
          : prev + 1
      );
    }
  };
  return (
    <SliderWrapper>
      <TitleWrap>
        <SliderTitle>{title}</SliderTitle>
        <Arrow
          variants={arrowVariants}
          initial="normal"
          whileHover="active"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => increaseIndex(true)}
        >
          <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
          <path d="M13.293 7.293 8.586 12l4.707 4.707 1.414-1.414L11.414 12l3.293-3.293-1.414-1.414z" />
        </Arrow>

        <Arrow
          variants={arrowVariants}
          initial="normal"
          whileHover="active"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => increaseIndex(false)}
        >
          <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
          <path d="M9.293 8.707 12.586 12l-3.293 3.293 1.414 1.414L15.414 12l-4.707-4.707-1.414 1.414z" />
        </Arrow>
      </TitleWrap>

      <AnimatePresence
        initial={false}
        onExitComplete={toggleLeaving}
        custom={isReverse}
      >
        <Row
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={isReverse}
          transition={{ tyle: "tween", duration: 0.7 }}
          key={index}
        >
          {data?.results
            // .slice(1)
            .slice(offset * index, offset * (index + 1))
            .map((movie) => (
              <Box
                layoutId={category + movie.id}
                key={category + movie.id}
                variants={boxVarients}
                whileHover="hover"
                transition={{ type: "tween" }}
                bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                onClick={() => onBoxClicked(menuId, category, movie.id)}
              >
                <BoxTitle>{movie.title}</BoxTitle>
                <Info variants={infoVarients}>
                  <h4>{movie.title}</h4>
                </Info>
              </Box>
            ))}
        </Row>
      </AnimatePresence>
      <AnimatePresence>
        {bigMovieMatch ? (
          <Pop
            category={category}
            id={Number(bigMovieMatch?.params.id)}
            data={data as IGetMoviesResult}
          ></Pop>
        ) : null}
      </AnimatePresence>
    </SliderWrapper>
  );
}

export default Slider;
