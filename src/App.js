import { BrowserRouter, Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "./components/NavbarComp";
import LeaderBoard from "./components/LeaderBoard";
import Home from "./components/Home";
import Events from "./components/events/Events"
import Problems from "./components/problems/Problems"
import ProblemsEasy from "./components/problems/ProblemsEasy";
import ProblemsMedium from "./components/problems/ProblemsMedium";
import User from "./components/user/User";
import SearchPortfolio from "./components/SearchPortfolio/SearchPortfolio";
import UpdateProfile from "./components/LoggedComponents/UpdateProfile";

import Footer from "./components/Footer";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
      <BrowserRouter>
      <NavbarComp />
      <div style={{height:"100%"}}>
        <Routes>
          <Route
            exact path="/" element={
              <div style={{height:"100%"}}>
                <Home />
                {/* <Footer /> */}
              </div>
            }
          />
          <Route
            path="/problems"
            element={
              <div>
                <Problems />
              </div>
            }
          />
          <Route
            path="/problems/easy"
            element={
              <div style={{height:"100%"}}>
                <ProblemsEasy />
              </div>
            }
          />
          <Route
            path="/problems/medium"
            element={
              <div>
                <ProblemsMedium />
              </div>
            }
          />
          <Route
            exact
            path="/Leaderboard"
            element={
              <div>
                <LeaderBoard />
              </div>
            }
          />
          <Route
            exact
            path="/Events"
            element={
              <div>
                <Events />
              </div>
            }
          />
          <Route
            exact
            path="/searchPortfolio"
            element={
              <SearchPortfolio />
            }
          />
          <Route
            exact
            path="/:email"
            style={{
              "height":"{window.innerHeight} !important",
            }}
            element={
              <div>
                <User />
              </div>
            }
          />
          <Route
            path="/pagenotfound"
            element={
              <PageNotFound />
            }
          />
          <Route
            exact
            path="/updateProfile"
            element={
              <UpdateProfile />
            }
          />
        </Routes>
        </div>
      </BrowserRouter>
   
  );
}

export default App;
