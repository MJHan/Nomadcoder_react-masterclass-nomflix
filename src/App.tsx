import { styled } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  width: 50vw;
  gap: 10px;
`;

const Box = styled(motion.div)`
  padding: 0;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  height: 300px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled(motion.button)`
  width: 80px;
  height: 35px;
  font-size: 17px;
  font-weight: 500;
  margin-top: 50px;
  border-radius: 5px;
  border-style: none;
  background-color: white;
`;

const Circle = styled(motion.div)`
  background-color: white;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const box = {
  hover: (custom: string) => ({
    scale: 1.2,
    transformOrigin: custom,
  }),
  exit: (custom: string) => ({
    scale: 0,
    transformOrigin: custom,
  }),
};

const changeDirefction = (direction: string) => {
  if (direction === "1") {
    return "bottom right";
  } else if (direction === "2") {
    return "bottom left";
  } else if (direction === "3") {
    return "top right";
  } else if (direction === "4") {
    return "top left";
  }
};

function App() {
  const [id, setId] = useState<null | string>(null);
  const [clicked, setClicked] = useState(false);

  return (
    <Wrapper>
      <Grid>
        {["1", "2", "3", "4"].map((n) => (
          <Box
            onClick={() => setId(n)}
            key={n}
            layoutId={n}
            custom={changeDirefction(n)}
            variants={box}
            exit="exit"
            whileHover="hover"
          >
            {n === "2" && !clicked ? <Circle layoutId="circle" /> : null}
            {n === "3" && clicked ? <Circle layoutId="circle" /> : null}
          </Box>
        ))}
      </Grid>
      <AnimatePresence>
        {id ? (
          <Overlay
            variants={overlay}
            onClick={() => setId(null)}
            initial="hidden"
            animate="visible"
          >
            <Box
              layoutId={id}
              style={{
                width: 400,
                height: 300,
                backgroundColor: "white",
              }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
      <Button
        onClick={() => setClicked((prev) => !prev)}
        style={{
          scale: clicked ? "1.2" : "1",
          color: clicked ? "tomato" : "blue",
        }}
      >
        Switch
      </Button>
    </Wrapper>
  );
}

export default App;
