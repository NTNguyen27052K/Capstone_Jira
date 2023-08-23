import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp/SignUp";
import HomeTemplate from "./Template/HomeTemplate/HomeTemplate";
import CreateProject from "./Components/CreateProject/CreateProject";
import Test from "./Template/Test";
import FormSignIn from "./Components/FormSignIn/FormSignIn";
import ProjectManagement from "./Components/ProjectManagement/ProjectManagement";
import UpdateProject from "./Components/UpdateProject/UpdateProject";
import DetailBoard from "./Components/DetailBoard/DetailBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormSignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/project" element={<HomeTemplate />}>
          <Route index element={<CreateProject />} />
          <Route path="createProject" element={<CreateProject />} />
          <Route path="test" element={<Test />} />
          <Route path="projectManagement" element={<ProjectManagement />} />
          <Route
            path="projectManagement/edit/:id"
            element={<UpdateProject />}
          />
          <Route path="projectManagement/board/:id" element={<DetailBoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
