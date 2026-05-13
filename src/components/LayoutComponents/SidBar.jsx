import logo from "../../assets/header/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, useMemo } from "react";
import { FaChevronRight } from "react-icons/fa";
import { useDispatch } from "react-redux";

import CategoryIco from "../icon/CategoryIco";
import ProductIco from "../icon/ProductIco";
import ShiftsIco from "../icon/ShiftsIco";
import EarningIco from "../icon/EarningIco";
import BarProfileIco from "../icon/BarProfileIco";
import ManageProfileIco from "../icon/ManageProfileIco";
import SupportIco from "../icon/SupportIco";
import DashboardIco from "../icon/DashboardIco";
import LogOutIco from "../icon/LogOutIco";
import TermsIco from "../icon/TermsIco";
import PrivecyIco from "../icon/PrivecyIco";
import LegalIco from "../icon/LegalIco";

import { useGetProfileQuery } from "../../page/redux/api/userApi";
import { logout } from "../../page/redux/features/auth/authSlice";

/* ---------------- ADMIN ITEMS ---------------- */
const adminItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <DashboardIco />,
    link: "/admin",
  },
  {
    key: "userManagement",
    label: "Users",
    icon: <CategoryIco color={"white"} />,
    link: "/admin/dashboard/UserManagement",
  },
  {
    key: "bartenderManagement",
    label: "Bartenders",
    icon: <ProductIco color={"white"} />,
    link: "/admin/dashboard/bartenders",
  },
  {
    key: "venueOwnerManagement",
    label: "Venue Owners",
    icon: <ShiftsIco color={"white"} />,
    link: "/admin/dashboard/venue_owner",
  },
  {
    key: "earning",
    label: "Earning",
    icon: <EarningIco color={"white"} />,
    link: "/admin/dashboard/earning",
  },
  {
    key: "helpSupport",
    label: "Help & Support",
    icon: <SupportIco />,
    link: "/admin/dashboard/HelpSupport",
  },
  {
    key: "termsCondition",
    label: "Terms & Condition",
    icon: <TermsIco />,
    link: "/admin/dashboard/TermsCondition",
  },
  {
    key: "privacyPolicy",
    label: "Privacy Policy",
    icon: <PrivecyIco />,
    link: "/admin/dashboard/PrivacyPolicy",
  },
  {
    key: "legalCompany",
    label: "Legal & Company Info",
    icon: <LegalIco />,
    link: "/admin/dashboard/LegalCompany",
  },
  {
    key: "manageProfile",
    label: "Manage Profile",
    icon: <ManageProfileIco />,
    link: "/admin/dashboard/ManageProfile",
  },
];

/* ---------------- VENUE OWNER ITEMS ---------------- */
const venueOwnerItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <DashboardIco />,
    link: "/",
  },
  {
    key: "categoryManagement",
    label: "Manage Categories",
    icon: <CategoryIco color={"white"} />,
    link: "/dashboard/CategoriesManagement/Categories",
  },
  {
    key: "productManagement",
    label: "Product Management",
    icon: <ProductIco color={"white"} />,
    link: "/dashboard/productManagement",
  },
  {
    key: "manageShifts",
    label: "Manage Shifts",
    icon: <ShiftsIco color={"white"} />,
    link: "/dashboard/ManageShifts",
  },
  {
    key: "earning",
    label: "Earning",
    icon: <EarningIco color={"white"} />,
    link: "/dashboard/earning",
  },
  {
    key: "venueProfile",
    label: "Venue Profile",
    icon: <BarProfileIco color={"white"} />,
    link: "/dashboard/VenueProfile",
  },
  {
    key: "manageProfile",
    label: "Manage Profile",
    icon: <ManageProfileIco />,
    link: "/dashboard/ManageProfile",
  },
  {
    key: "helpSupport",
    label: "Help & Support",
    icon: <SupportIco />,
    link: "/dashboard/HelpSupport",
  },
];

const SidBar = () => {
  const { data: adminProfile, isLoading: profileLoading } =
    useGetProfileQuery();

  const role = adminProfile?.data?.user?.role;

  const items = useMemo(() => {
    if (role === "superAdmin") return adminItems;
    if (role === "venueOwner") return venueOwnerItems;
    return [];
  }, [role]);

  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [expandedKeys, setExpandedKeys] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const contentRef = useRef({});

  /* ---------------- ACTIVE MENU ---------------- */
  useEffect(() => {
    if (!items.length) return;

    const currentPath = location.pathname;

    let activeParent = null;

    items.forEach((item) => {
      if (item.link === currentPath) {
        activeParent = item;
      } else if (
        item.children &&
        item.children.some((child) => child.link === currentPath)
      ) {
        activeParent = item;
      }
    });

    if (activeParent) {
      setSelectedKey(activeParent.key);
    }
  }, [location.pathname, items]);

  const onParentClick = (key) => {
    setExpandedKeys((prev) =>
      prev.includes(key)
        ? prev.filter((item) => item !== key)
        : [...prev, key]
    );
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (profileLoading) return null;

  return (
    <div className="custom-sidebar h-[100vh] bg-[#0F0B1A] text-white border-r border-[#2A2448] flex flex-col justify-between">

      {/* TOP */}
      <div>
        <div className="py-8 flex justify-center">
          <img src={logo} alt="Logo" className="w-[130px]" />
        </div>

        <div className="menu-items overflow-auto px-2">
          {items.map((item) => (
            <div key={item.key}>
              <Link
                to={item.link}
                className={`my-3 py-2 px-4 flex items-center rounded-lg ${
                  selectedKey === item.key
                    ? "bg-gradient-to-tr from-[#822CE7] to-[#BB82FF]"
                    : "hover:bg-[#2a2448]"
                }`}
                onClick={() => setSelectedKey(item.key)}
              >
                <span className="mr-2">{item.icon}</span>
                <span className="w-full">{item.label}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="mx-4 mb-4">
        <div className="border-[#EF4444] bg-[#dc354621] rounded-xl p-3 border">
          <button
            onClick={handleLogout}
            className="flex items-center w-full text-white"
          >
            <LogOutIco />
            <span className="ml-3">Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidBar;