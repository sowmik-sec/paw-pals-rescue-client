import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoaderSpinner from "../components/LoaderSpinner/LoaderSpinner";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <LoaderSpinner />;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
}

export default PrivateRoute;
