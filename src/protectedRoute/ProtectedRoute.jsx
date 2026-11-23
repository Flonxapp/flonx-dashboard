import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useGetProfileQuery } from "../page/redux/api/userApi";
import { logout } from "../page/redux/features/auth/authSlice";
import PageLoader from "../components/PageLoader";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { token } = useSelector((state) => state.logInUser);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const { data: profile, isLoading, isError, error, refetch } =
    useGetProfileQuery(undefined, { skip: !token });

  const role = profile?.data?.user?.role;
  const sessionInvalid =
    !!token &&
    !isLoading &&
    ((isError && (error?.status === 401 || error?.status === 403)) ||
      (!isError &&
        !!profile &&
        allowedRoles.length > 0 &&
        !allowedRoles.includes(role)));

  // invalid session or wrong role: clear the stored token
  useEffect(() => {
    if (sessionInvalid) dispatch(logout());
  }, [sessionInvalid, dispatch]);

  if (!token) {
    return <Navigate to="/login" state={{ path: pathname }} replace />;
  }

  if (isLoading) {
    return <PageLoader fullScreen />;
  }

  // network or server problem: offer a retry instead of a login loop
  if (isError && error?.status !== 401 && error?.status !== 403) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-white bg-[#0F0B1A]">
        <p>Could not load your account. Please check your connection.</p>
        <button
          className="px-4 py-2 rounded-full bg-[#822CE7]"
          onClick={refetch}
        >
          Retry
        </button>
      </div>
    );
  }

  if (sessionInvalid) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
