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
import PetDetails from "../pages/Pets/PetDetails/PetDetails";
import PrivateRoute from "./PrivateRoute";
import AddPet from "../pages/Dashboard/AddPet/AddPet";
import AdoptionRequest from "../pages/Dashboard/AdoptionRequest/AdoptionRequest";
import CreateDonationCampaign from "../pages/Dashboard/CreateDonationCampaign/CreateDonationCampaign";
import MyAddedPets from "../pages/Dashboard/MyAddedPets/MyAddedPets";
import MyDonation from "../pages/Dashboard/MyDonation/MyDonation";
import MyDonationCampaign from "../pages/Dashboard/MyDonationCampaign/MyDonationCampaign";

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
        element: (
          <PrivateRoute>
            <Pets />
          </PrivateRoute>
        ),
      },
      {
        path: `/pets`,
        element: (
          <PrivateRoute>
            <Pets />
          </PrivateRoute>
        ),
      },
      {
        path: "/pets/details/:id",
        element: (
          <PrivateRoute>
            <PetDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add-pet",
        element: (
          <PrivateRoute>
            <AddPet />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/adoption-requests",
        element: (
          <PrivateRoute>
            <AdoptionRequest />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/create-donation-campaign",
        element: (
          <PrivateRoute>
            <CreateDonationCampaign />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-added-pets",
        element: (
          <PrivateRoute>
            <MyAddedPets />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-donation",
        element: (
          <PrivateRoute>
            <MyDonation />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-donation-campaign",
        element: (
          <PrivateRoute>
            <MyDonationCampaign />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
