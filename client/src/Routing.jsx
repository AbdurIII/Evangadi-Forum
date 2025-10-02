import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home/Home";
import Question from "./pages/Question/Question";
import HowItWorks from "./pages/HowItWorks/HowItWorks";
import Answer from "./pages/Answer/Answer";
function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Landing />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/question" element={<Question />} />
        <Route path="/home/answers/:questionId" element={<Answer />} />
      </Route>
    </Routes>
  );
}

export default Routing;
