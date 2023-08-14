import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Home from "./Routes/Home";

const BASE_URL = "/Nomadcoder_react-masterclass-nomflix";
// const BASE_URL= "";

function App() {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route path={[BASE_URL + "/tv", BASE_URL + "/tv/:category/:movieId"]}>
          <Tv />
        </Route>
        <Route path={BASE_URL + "/search"}>
          <Search />
        </Route>
        <Route path={[BASE_URL + "/", BASE_URL + "/movies/:category/:movieId"]}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
