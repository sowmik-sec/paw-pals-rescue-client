import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import Login from "../pages/auth/Login/Login";
import Signup from "../pages/auth/Signup/Signup";
import NotFound from "../pages/NotFound/NotFound";
import PetStoryPage from "../pages/Home/SuccessStories/PetStoryPage";
import Pets from "../pages/Pets/Pets/Pets";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: `/stories/:id`,
        element: <PetStoryPage />,
      },
      {
        path: `/pets/:category`,
        element: <Pets />,
      },
      {
        path: `/pets`,
        element: <Pets />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
