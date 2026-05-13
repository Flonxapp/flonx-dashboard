import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";

// Layout
import DashboardLayout from "../layout/dashboardLayout/DashboardLayout";

// Owner Pages
import Dashboard from "../components/Dashboard/Dashboard";
import Categories from "../page/CategoriesManagement/Categories";
import ProductManage from "../page/product/ProductManage";
import ManageShifts from "../page/manageShifts/ManageShifts";
import Earning from "../page/earning/Earning";
import VenueProfile from "../page/venuwProfile/VenueProfile";
import ManageProfile from "../page/manageProfile/ManageProfile";
import HelpSupport from "../page/helpSupport/HelpSupport";
import ProductDetails from "../page/product/ProductDetails";
import AddProduct from "../page/product/AddProduct";
import EditProduct from "../page/product/EditProduct";
import ShiftDetails from "../page/manageShifts/ShiftDetails";
import AddManageShift from "../page/manageShifts/AddManageShift";
import FindBarthender from "../page/manageShifts/FindBarthender";
import BartenderDetails from "../page/manageShifts/BartenderDetails";
import UpdateVenyeProfile from "../page/venuwProfile/UpdateVenyeProfile";
import UpdateProfile from "../page/manageProfile/UpdateProfile";
import UpdatePassword from "../page/manageProfile/UpdatePassword";
import Notification from "../page/Notification/Notification";

// Admin Pages
import DashboardAdmin from "../adminRotePage/Dashboard/Dashboard";
import UserManagement from "../adminRotePage/UserManagement/UserManagement";
import Bartenders from "../adminRotePage/bartenders/Bartenders";
import UserDetails from "../adminRotePage/UserManagement/UserDetails";
import VenueOwner from "../adminRotePage/venueOwner/VenueOwner";
import VenueOwnerDetails from "../adminRotePage/venueOwner/VenueOwnerDetails";
import LegalCompany from "../adminRotePage/legalCompany/LegalCompany";
import AddLegalCompany from "../adminRotePage/legalCompany/AddLegalCompany";
import TermsCondition from "../adminRotePage/terms/TermsCondition";
import PrivacyPolicy from "../adminRotePage/privecy/PrivacyPolicy";
import HelpSupportAdmin from "../adminRotePage/helpSupport/HelpSupport";
import HelpSupportDetails from "../adminRotePage/helpSupport/HelpSupportDetails";
import EarningAdmin from "../adminRotePage/earning/Earning";
import ManageProfileAdmin from "../adminRotePage/manageProfile/ManageProfile";
import UpdateProfileAdmin from "../adminRotePage/manageProfile/UpdateProfile";
import UpdatePasswordAdmin from "../adminRotePage/manageProfile/UpdatePassword";
import NotificationAdmin from "../adminRotePage/Notification/Notification";

// Auth
import Login from "../Auth/Login";
import LoginAdmin from "../adminAuth/Login";
import JoinAs from "../Auth/JoinAs";
import CompleteProfile from "../Auth/CompleteProfile";
import ConnectStripe from "../Auth/ConnectStripe";
import ForgetPass from "../Auth/ForgetPass";
import Verify from "../Auth/Verify";
import ResetPass from "../Auth/ResetPass";
import RegisterVerify from "../Auth/RegisterVerify";

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