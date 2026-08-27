import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import "./App.css";

import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Courses from "./pages/courses";
import CourseDetails from "./pages/CourseDetails";
import Resources from "./pages/Resources";

import Planner from "./pages/Planner";
import Goals from "./pages/goals";
import Exams from "./pages/Exams";
import Focus from "./pages/Focus";
import Budget from "./pages/Budget";
import ResourceViewer from "./pages/ResourceViewer";
import CourseAI from "./pages/courseAI";



function AppContent() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/auth";

  return (
    <div className="app">

      {!isAuthPage && <Sidebar />}

      <main className="main-content">

        <Routes>

          <Route
            path="/"
            element={
              <Navigate
                to="/auth"
                replace
              />
            }
          />

          <Route
            path="/auth"
            element={<Auth />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/courses"
            element={<Courses />}
          />

          <Route
            path="/courses/:courseId"
            element={<CourseDetails />}
          />

          <Route
            path="/courses/:courseId/resources"
            element={<Resources />}
          />

          <Route
            path="/planner"
            element={<Planner />}
          />

          <Route
            path="/goals"
            element={<Goals />}
          />

          <Route
            path="/exams"
            element={<Exams />}
          />

          <Route
            path="/focus"
            element={<Focus />}
          />

          <Route
            path="/budget"
            element={<Budget />}
          />

          <Route
            path="*"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />
          <Route
  path="/courses/:courseId/resources/:resourceId"
  element={<ResourceViewer />}
/>
<Route
  path="/courses/:courseId/ai"
  element={<CourseAI />}
/>
        </Routes>

      </main>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;