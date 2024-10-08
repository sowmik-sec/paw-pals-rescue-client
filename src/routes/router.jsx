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
import MyDonationCampaign from "../pages/Dashboard/MyDonationCampaign/MyDonationCampaign";
import DonationCampaigns from "../pages/DonationCampaigns/DonationCampaigns";
import DonationDetails from "../pages/DonationCampaigns/DonationDetails";
import AdminRoute from "./AdminRoute";
import Users from "../pages/Dashboard/Users/Users";
import AllDonations from "../pages/Dashboard/AllDonations/AllDonations";
import AllDonationCampaigns from "../pages/Dashboard/AllDonationCampaigns/AllDonationCampaigns";
import MyDonations from "../pages/Dashboard/MyDonations/MyDonations";

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
      {
        path: "/donation-campaigns",
        element: <DonationCampaigns />,
      },
      {
        path: "/donation-details/:id",
        element: (
          <PrivateRoute>
            <DonationDetails />
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
          <AdminRoute>
            <AdoptionRequest />
          </AdminRoute>
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
        path: "/dashboard/my-donations",
        element: (
          <PrivateRoute>
            <MyDonations />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-donation-campaigns",
        element: (
          <PrivateRoute>
            <MyDonationCampaign />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/update-pet/:id",
        element: (
          <PrivateRoute>
            <AddPet />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/users",
        element: (
          <AdminRoute>
            <Users />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-donations",
        element: (
          <AdminRoute>
            <AllDonations />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-donation-campaigns",
        element: (
          <AdminRoute>
            <AllDonationCampaigns />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
