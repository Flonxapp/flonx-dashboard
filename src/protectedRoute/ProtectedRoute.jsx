import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useGetProfileQuery } from "../page/redux/api/userApi";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { token } = useSelector((state) => state.logInUser);
  const { pathname } = useLocation();

  const { data: adminProfile, isLoading } = useGetProfileQuery(undefined, {
    skip: !token,
  });

  const role = adminProfile?.data?.user?.role;

  // ✅ No token
  if (!token) {
    return <Navigate to="/login" state={{ path: pathname }} replace />;
  }

  // ✅ Loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // ✅ Role not allowed
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;