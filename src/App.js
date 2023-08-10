import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp/SignUp";
import HomeTemplate from "./Template/HomeTemplate/HomeTemplate";
import CreateProject from "./Components/CreateProject/CreateProject";
import Test from "./Template/Test";
import FormSignIn from "./Components/FormSignIn/FormSignIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormSignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/projectmanagement" element={<HomeTemplate />}>
          <Route index element={<CreateProject />} />
          <Route path="createProject" element={<CreateProject />} />
          <Route path="test" element={<Test />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
