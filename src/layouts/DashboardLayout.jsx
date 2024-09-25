import { NavLink, Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // Install react-icons: npm install react-icons
import Navbar from "../shared/Navbar/Navbar";

function DashboardLayout() {
  return (
    <div>
      <Navbar />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        {/* Toggle Button for Small Devices */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-square btn-primary drawer-button fixed top-4 left-64 lg:hidden"
        >
          {/* Using a hamburger icon */}
          <FaBars className="text-2xl" />
        </label>

        {/* Drawer Content (Main Page) */}
        <div className="drawer-content flex flex-col items-center justify-center">
          <Outlet />
        </div>

        {/* Sidebar */}
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <li>
              <NavLink to="add-pet">Add a pet</NavLink>
            </li>
            <li>
              <NavLink to="my-added-pets">My added pets</NavLink>
            </li>
            <li>
              <NavLink to="adoption-requests">Adoption Request</NavLink>
            </li>
            <li>
              <NavLink to="create-donation-campaign">
                Create Donation Campaign
              </NavLink>
            </li>
            <li>
              <NavLink to="my-donation-campaigns">
                My Donation Campaigns
              </NavLink>
            </li>
            <li>
              <NavLink to="my-donation">My Donation </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
