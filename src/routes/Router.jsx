import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/dashboardLayout/DashboardLayout";
import Dashboard from "../components/Dashboard/Dashboard";
import UserManagement from "../page/UserManagement/UserManagement";



import Profile from "../page/Settings/Profile";
import TermsCondition from "../page/Settings/TermsCondition";
import FAQ from "../page/Settings/FAQ";
import PrivacyPolicy from "../page/Settings/PrivacyPolicy";
import Categories from "../page/CategoriesManagement/Categories";
import Subcategory from "../page/CategoriesManagement/Subcategory";

import ForgetPass from "../Auth/ForgetPass";
import Verify from "../Auth/Verify";
import ResetPass from "../Auth/ResetPass";
import Notification from "../page/Notification/Notification";
import About from "../page/Settings/About";
import Login from "../Auth/Login";
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
import UpdateVenyeProfile from "../page/venuwProfile/UpdateVenyeProfile";
import UpdateProfile from "../page/manageProfile/UpdateProfile";
import UpdatePassword from "../page/manageProfile/UpdatePassword";
import FindBarthender from "../page/manageShifts/FindBarthender";
import BartenderDetails from "../page/manageShifts/BartenderDetails";
import JoinAs from "../Auth/JoinAs";
import CompleteProfile from "../Auth/CompleteProfile";
import ConnectStripe from "../Auth/ConnectStripe";
import RegisterVerify from "../Auth/RegisterVerify";
import MyShifts from "../page/myShift/MyShifts";

import MyProfile from "../page/bartenderProfile/MyProfile";

import ProtectedRoute from "../protectedRoute/ProtectedRoute";



export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute><DashboardLayout></DashboardLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/dashboard/UserManagement",
        element: <UserManagement></UserManagement>,
      },
     {
        path: "/dashboard/productManagement",
        element: <ProductManage></ProductManage>,
      },

       {
        path: "/dashboard/shifts",
        element: <MyShifts></MyShifts>
      },
     {
        path: "/dashboard/VenueProfile",
        element: <VenueProfile></VenueProfile>,
      },
      {
        path: "/dashboard/productManagement/details/:id",
        element: <ProductDetails></ProductDetails>  ,
      },
      {
        path: "/dashboard/ManageShifts",
        element: <ManageShifts></ManageShifts>,
      },
        {
        path: "/dashboard/ManageShifts/add_request/:id",
        element: <AddManageShift></AddManageShift>,
      },
      {
        path: "/dashboard/ManageShifts/find_bartender",
        element: <FindBarthender></FindBarthender>,
      },
      {

        path: "/dashboard/ManageShifts/details/:id",
        element: <ShiftDetails></ShiftDetails>,
      },
        {

        path: "/dashboard/BartenderShifts/details/:id",
        element: <BartenderDetails></BartenderDetails>,
      },
      {
        path: "/dashboard/productManagement/add",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "/dashboard/productManagement/edit/:id",
        element: <EditProduct></EditProduct>,
      },
       {
        path: "/dashboard/earning",
        element: <Earning></Earning>,
      },
      
        {
        path: "/dashboard/myProfile",
        element: <MyProfile></MyProfile>
      },
   
      {
        path: "/dashboard/UpdateVenueProfile/:id",
        element: <UpdateVenyeProfile></UpdateVenyeProfile>,
      },
      {
        path: "/dashboard/HelpSupport",
        element: <HelpSupport></HelpSupport>,
      },
      {
        path: "/dashboard/ManageProfile",
        element: <ManageProfile></ManageProfile>,
      },


  {
        path: "/dashboard/updateProfile",
        element: <UpdateProfile></UpdateProfile>,
      },


        {
        path: "/dashboard/updatePassword",
        element: <UpdatePassword> </UpdatePassword>,
      },





      {
        path: "/dashboard/CategoriesManagement/Categories",
        element: <Categories></Categories>,
      },
      {
        path: "/dashboard/CategoriesManagement/Categories",
        element: <Categories></Categories>,
      },
      {
        path: "/dashboard/CategoriesManagement/Subcategory",
        element: <Subcategory></Subcategory>,
      },
     
      {
        path: "/dashboard/Settings/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/Settings/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/Settings/notification",
        element: <Notification></Notification>,
      },
      {
        path: "/dashboard/Settings/Terms&Condition",
        element: <TermsCondition></TermsCondition>,
      },
      {
        path: "/dashboard/Settings/FAQ",
        element: <FAQ></FAQ>,
      },
      {
        path: "/dashboard/Settings/aboutUs",
        element: <About></About>,
      },
      {
        path: "/dashboard/Settings/PrivacyPolicy",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },
    ],
  },

  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/joinAs",
    element: <JoinAs></JoinAs>,
  },
   {
    path: "/completeProfile",
    element: <CompleteProfile></CompleteProfile>,
  },
   {
    path: "/connectStripe",
    element: <ConnectStripe></ConnectStripe>,
  },
  {
    path: "/forgot-password",
    element: <ForgetPass></ForgetPass>,
  },
   {
    path: "/registerVerify",
    element: <RegisterVerify></RegisterVerify>,
  },
  {
    path: "/verification",
    element: <Verify></Verify>,
  },
  {
    path: "/reset-password",
    element: <ResetPass></ResetPass>,
  },
]);
