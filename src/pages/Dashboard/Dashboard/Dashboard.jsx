import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";

function Dashboard() {
  const { user } = useAuth();
  return (
    <div>
      <Helmet>
        <title>Paw Pals Rescue | Dashboard</title>
      </Helmet>
      <h2 className="text-4xl font-bold text-center">
        Welcome{" "}
        <span className="text-orange-500 text-center">{user.displayName}</span>{" "}
        to dashboard
      </h2>
      <h3 className="text-3xl">
        Navigate by the sidebar to necessary fields you have interest in.
      </h3>
    </div>
  );
}

export default Dashboard;
