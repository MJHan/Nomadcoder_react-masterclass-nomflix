import { AnimatePresence, motion } from "framer-motion";
import { useHistory, useRouteMatch } from "react-router-dom";
import { styled } from "styled-components";
import { BASE_URL, makeImagePath } from "../utils";
import { IGetResult, MOVIE_CATEGORY, TV_CATEGORY } from "../api";
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
  margin-right: 20px;
`;

const Arrow = styled(motion.svg)`
  fill: ${(props) => props.theme.white.lighter};
  cursor: pointer;
  padding: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
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
  margin-top: 5px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  h4 {
    text-align: center;
    font-size: 18px;
  }
  span {
    font-size: 9px;
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
  data: IGetResult;
  title: string;
  filter?: string;
}
function Slider({ menuId, category, data, title, filter }: ISlider) {
  const [index, setIndex] = useState(0);
  const [isReverse, setReverse] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const history = useHistory();
  /* Set List */
  let dataList = data?.results;
  if (category === MOVIE_CATEGORY.TREND || category === TV_CATEGORY.TREND) {
    dataList = dataList.slice(1);
  }
  const onBoxClicked = (menuId: string, category: string, id: number): void => {
    history.push(`${BASE_URL}/${menuId}/${category}/${id}`);
  };
  const bigMovieMatch = useRouteMatch<{ id: string }>(
    `${BASE_URL}/${menuId}/${category}/:id`
  );
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const increaseIndex = (isReverse: boolean) => {
    if (dataList) {
      if (leaving) return;
      toggleLeaving();
      setReverse(isReverse);
      const totalMovies = dataList.length - 1;
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
          viewBox="0 0 25 25"
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
          viewBox="0 0 25 25"
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
          {dataList.slice(offset * index, offset * (index + 1)).map((item) => (
            <Box
              layoutId={category + item.id}
              key={category + item.id}
              variants={boxVarients}
              whileHover="hover"
              transition={{ type: "tween" }}
              bgphoto={makeImagePath(item.backdrop_path, "w500")}
              onClick={() => onBoxClicked(menuId, category, item.id)}
            >
              <BoxTitle>{item.title ? item.title : item.name}</BoxTitle>
              <Info variants={infoVarients}>
                <span>
                  {category === MOVIE_CATEGORY.UPCOMING
                    ? item.vote_average
                    : ""}
                  {category === TV_CATEGORY.AIRING_TODAY
                    ? item.first_air_date
                    : ""}
                </span>
                <h4>
                  {item.original_title
                    ? item.original_title
                    : item.original_name}
                </h4>
              </Info>
            </Box>
          ))}
        </Row>
      </AnimatePresence>
      <AnimatePresence>
        {bigMovieMatch ? (
          <Pop
            menuId={menuId}
            category={category}
            id={Number(bigMovieMatch?.params.id)}
            data={data as IGetResult}
          ></Pop>
        ) : null}
      </AnimatePresence>
    </SliderWrapper>
  );
}

export default Slider;
