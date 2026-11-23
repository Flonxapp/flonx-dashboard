import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";

// Layout
import DashboardLayout from "../layout/dashboardLayout/DashboardLayout";

// Owner Pages
const Dashboard = lazy(() => import("../components/Dashboard/Dashboard"));
const Categories = lazy(() => import("../page/CategoriesManagement/Categories"));
const ProductManage = lazy(() => import("../page/product/ProductManage"));
const ManageShifts = lazy(() => import("../page/manageShifts/ManageShifts"));
const Earning = lazy(() => import("../page/earning/Earning"));
const VenueProfile = lazy(() => import("../page/venuwProfile/VenueProfile"));
const ManageProfile = lazy(() => import("../page/manageProfile/ManageProfile"));
const HelpSupport = lazy(() => import("../page/helpSupport/HelpSupport"));
const ProductDetails = lazy(() => import("../page/product/ProductDetails"));
const AddProduct = lazy(() => import("../page/product/AddProduct"));
const EditProduct = lazy(() => import("../page/product/EditProduct"));
const ShiftDetails = lazy(() => import("../page/manageShifts/ShiftDetails"));
const AddManageShift = lazy(() => import("../page/manageShifts/AddManageShift"));
const FindBarthender = lazy(() => import("../page/manageShifts/FindBarthender"));
const BartenderDetails = lazy(() => import("../page/manageShifts/BartenderDetails"));
const UpdateVenyeProfile = lazy(() => import("../page/venuwProfile/UpdateVenyeProfile"));
const UpdateProfile = lazy(() => import("../page/manageProfile/UpdateProfile"));
const UpdatePassword = lazy(() => import("../page/manageProfile/UpdatePassword"));
const Notification = lazy(() => import("../page/Notification/Notification"));

// Admin Pages
const DashboardAdmin = lazy(() => import("../adminRotePage/Dashboard/Dashboard"));
const UserManagement = lazy(() => import("../adminRotePage/UserManagement/UserManagement"));
const Bartenders = lazy(() => import("../adminRotePage/bartenders/Bartenders"));
const UserDetails = lazy(() => import("../adminRotePage/UserManagement/UserDetails"));
const VenueOwner = lazy(() => import("../adminRotePage/venueOwner/VenueOwner"));
const VenueOwnerDetails = lazy(() => import("../adminRotePage/venueOwner/VenueOwnerDetails"));
const LegalCompany = lazy(() => import("../adminRotePage/legalCompany/LegalCompany"));
const AddLegalCompany = lazy(() => import("../adminRotePage/legalCompany/AddLegalCompany"));
const TermsCondition = lazy(() => import("../adminRotePage/terms/TermsCondition"));
const PrivacyPolicy = lazy(() => import("../adminRotePage/privecy/PrivacyPolicy"));
const HelpSupportAdmin = lazy(() => import("../adminRotePage/helpSupport/HelpSupport"));
const HelpSupportDetails = lazy(() => import("../adminRotePage/helpSupport/HelpSupportDetails"));
const EarningAdmin = lazy(() => import("../adminRotePage/earning/Earning"));
const WithdrawRequestsAdmin = lazy(() => import("../adminRotePage/withdrawRequests/WithdrawRequests"));
const ManageProfileAdmin = lazy(() => import("../adminRotePage/manageProfile/ManageProfile"));
const UpdateProfileAdmin = lazy(() => import("../adminRotePage/manageProfile/UpdateProfile"));
const UpdatePasswordAdmin = lazy(() => import("../adminRotePage/manageProfile/UpdatePassword"));
const NotificationAdmin = lazy(() => import("../adminRotePage/Notification/Notification"));

// Auth
const Login = lazy(() => import("../Auth/Login"));
const LoginAdmin = lazy(() => import("../adminAuth/Login"));
const JoinAs = lazy(() => import("../Auth/JoinAs"));
const CompleteProfile = lazy(() => import("../Auth/CompleteProfile"));
const ConnectStripe = lazy(() => import("../Auth/ConnectStripe"));
const ForgetPass = lazy(() => import("../Auth/ForgetPass"));
const Verify = lazy(() => import("../Auth/Verify"));
const ResetPass = lazy(() => import("../Auth/ResetPass"));
const RegisterVerify = lazy(() => import("../Auth/RegisterVerify"));

export const router = createBrowserRouter([
  {
    path: "/",

  
    element: (
      <ProtectedRoute allowedRoles={["venueOwner"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        index: true,
        element: <Dashboard />,
      },

      {
        path: "dashboard/productManagement",
        element: <ProductManage />,
      },
      {
        path: "dashboard/productManagement/details/:id",
        element: <ProductDetails />,
      },
      {
        path: "dashboard/productManagement/add",
        element: <AddProduct />,
      },
      {
        path: "dashboard/productManagement/edit/:id",
        element: <EditProduct />,
      },

      {
        path: "dashboard/ManageShifts",
        element: <ManageShifts />,
      },
      {
        path: "dashboard/ManageShifts/add_request/:id",
        element: <AddManageShift />,
      },
      {
        path: "dashboard/ManageShifts/find_bartender",
        element: <FindBarthender />,
      },
      {
        path: "dashboard/ManageShifts/details/:id",
        element: <ShiftDetails />,
      },
      {
        path: "dashboard/BartenderShifts/details/:id",
        element: <BartenderDetails />,
      },

      {
        path: "dashboard/earning",
        element: <Earning />,
      },
      {
        path: "dashboard/VenueProfile",
        element: <VenueProfile />,
      },
      {
        path: "dashboard/UpdateVenueProfile/:id",
        element: <UpdateVenyeProfile />,
      },

      {
        path: "dashboard/HelpSupport",
        element: <HelpSupport />,
      },
      {
        path: "dashboard/ManageProfile",
        element: <ManageProfile />,
      },
      {
        path: "dashboard/updateProfile",
        element: <UpdateProfile />,
      },
      {
        path: "dashboard/updatePassword",
        element: <UpdatePassword />,
      },
      {
        path: "dashboard/CategoriesManagement/Categories",
        element: <Categories />,
      },
      {
        path: "dashboard/Settings/notification",
        element: <Notification />,
      },
    ],
  },

  // ================= ADMIN =================

  {
    path: "/admin",

    element: (
      <ProtectedRoute allowedRoles={["superAdmin"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        index: true,
        element: <DashboardAdmin />,
      },

      {
        path: "dashboard/UserManagement",
        element: <UserManagement />,
      },
      {
        path: "dashboard/UserManagement/details/:id",
        element: <UserDetails />,
      },

      {
        path: "dashboard/bartenders",
        element: <Bartenders />,
      },

      {
        path: "dashboard/venue_owner",
        element: <VenueOwner />,
      },
      {
        path: "dashboard/venue_owner/details/:id",
        element: <VenueOwnerDetails />,
      },

      {
        path: "dashboard/LegalCompany",
        element: <LegalCompany />,
      },
      {
        path: "dashboard/LegalCompany/add",
        element: <AddLegalCompany />,
      },

      {
        path: "dashboard/earning",
        element: <EarningAdmin />,
      },
      {
        path: "dashboard/withdraw-requests",
        element: <WithdrawRequestsAdmin />,
      },

      {
        path: "dashboard/HelpSupport",
        element: <HelpSupportAdmin />,
      },
      {
        path: "dashboard/HelpSupport/details/:id",
        element: <HelpSupportDetails />,
      },

      {
        path: "dashboard/TermsCondition",
        element: <TermsCondition />,
      },
      {
        path: "dashboard/PrivacyPolicy",
        element: <PrivacyPolicy />,
      },

      {
        path: "dashboard/ManageProfile",
        element: <ManageProfileAdmin />,
      },
      {
        path: "dashboard/updateProfile/:id",
        element: <UpdateProfileAdmin />,
      },
      {
        path: "dashboard/updatePassword",
        element: <UpdatePasswordAdmin />,
      },
      {
        path: "dashboard/Settings/notification",
        element: <NotificationAdmin />,
      },
    ],
  },

  // ================= AUTH =================

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin/login",
    element: <LoginAdmin />,
  },
  {
    path: "/joinAs",
    element: <JoinAs />,
  },
  {
    path: "/completeProfile",
    element: <CompleteProfile />,
  },
  {
    path: "/connectStripe",
    element: <ConnectStripe />,
  },
  {
    path: "/forgot-password",
    element: <ForgetPass />,
  },
  {
    path: "/registerVerify",
    element: <RegisterVerify />,
  },
  {
    path: "/verification",
    element: <Verify />,
  },
  {
    path: "/reset-password",
    element: <ResetPass />,
  },
]);