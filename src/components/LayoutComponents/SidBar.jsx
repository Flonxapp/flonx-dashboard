import dashboard from "../../assets/routerImg/dashboard.png";
import categorie from "../../assets/routerImg/categorie.png";
import create from "../../assets/routerImg/create.png";
import settings from "../../assets/routerImg/settings.png";
import subscription from "../../assets/routerImg/subscription.png";
import user from "../../assets/routerImg/user.png";
import logo from "../../assets/header/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaChevronRight, FaHome } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { logout } from "../../page/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { TbCategory2 } from "react-icons/tb";
import CategoryIco from "../icon/CategoryIco";
import ProductIco from "../icon/ProductIco";
import ShiftsIco from "../icon/ShiftsIco";
import EarningIco from "../icon/EarningIco";
import BarProfileIco from "../icon/BarProfileIco";
import ManageProfileIco from "../icon/ManageProfileIco";
import SupportIco from "../icon/SupportIco";
import DashboardIco from "../icon/DashboardIco";
import LogOutIco from "../icon/LogOutIco";


const items = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <DashboardIco />,
    link: "/",
  },
  {
    key: "categoryManagement",
    label: "Manage Categories",
    icon: <CategoryIco color={'white'}></CategoryIco>,
    link: "/dashboard/CategoriesManagement/Categories",
  },

{
    key: "productManagement",
    label: "Product Management",
    icon: <ProductIco color={'white'}></ProductIco>,
    link: "/dashboard/productManagement",
  },
{
    key: "manageShifts",
    label: "Manage Shifts",
    icon: <ShiftsIco color={'white'}></ShiftsIco>,
    link: "/dashboard/ManageShifts",
  },
{
    key: "earning",
    label: "Earning",
    icon: <EarningIco color={'white'}></EarningIco>,
    link: "/dashboard/earning",
  },

  {
    key: "venueProfile",
    label: "Venue Profile",
    icon: <BarProfileIco color={'white'}></BarProfileIco>,
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
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [expandedKeys, setExpandedKeys] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const contentRef = useRef({});
  const dispatch = useDispatch();

  useEffect(() => {
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
      setSelectedKey(
        activeParent.children
          ? activeParent.children.find((child) => child.link === currentPath)
              ?.key || activeParent.key
          : activeParent.key
      );

      if (activeParent.children && !expandedKeys.includes(activeParent.key)) {
        setExpandedKeys([...expandedKeys, activeParent.key]);
      }
    }
  }, [location]);

  const onParentClick = (key) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  // Logout Function
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="custom-sidebar h-[100vh] bg-[#0F0B1A] text-white border-r border-[#2A2448] flex flex-col justify-between">
  
  {/* Top: Logo + Menu */}
  <div>
    <div className="custom-sidebar-logo py-8 flex justify-center">
      <img src={logo} alt="Logo" className="w-[130px]" />
    </div>

    <div className="menu-items overflow-auto px-2">
      {items.map((item) => (
        <div key={item.key}>
          <Link
            to={item.link}
            className={`my-4 py-[10px] px-4 flex items-center cursor-pointer ${
              selectedKey === item.key
                ? "bg-gradient-to-tr from-[#822CE7] to-[#BB82FF] text-white shadow-md mx-3 rounded-lg"
                : "hover:bg-gradient-to-tr hover:from-[#822CE7] mx-3 rounded-lg"
            }`}
            onClick={(e) => {
              if (item.children) {
                e.preventDefault();
                onParentClick(item.key);
              } else {
                setSelectedKey(item.key);
              }
            }}
          >
            <span className="w-5 mr-2 text-lg">{item.icon}</span>
            <span className="w-full">{item.label}</span>

            {item.children && (
              <FaChevronRight
                className={`ml-auto text-[10px] transition-transform duration-300 ${
                  expandedKeys.includes(item.key) ? "rotate-90" : ""
                }`}
              />
            )}
          </Link>

          {item.children && (
            <div
              className="ml-6 mx-2 overflow-hidden transition-all duration-300"
              style={{
                maxHeight: expandedKeys.includes(item.key)
                  ? `${contentRef.current[item.key]?.scrollHeight}px`
                  : "0",
              }}
              ref={(el) => (contentRef.current[item.key] = el)}
            >
              {item.children.map((child) => (
                <Link
                  key={child.key}
                  to={child.link}
                  className={`p-2 flex items-center ${
                    selectedKey === child.key
                      ? "text-red-500"
                      : "hover:bg-gradient-to-r hover:from-[#470e0e]"
                  }`}
                  onClick={() => setSelectedKey(child.key)}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>

  {/* Bottom: Logout Button */}
  <div className="mx-4 mb-4">
    <div className="border-[#EF4444] bg-[#dc354621] rounded-xl w-full p-3 border">
      <button
        onClick={handleLogout}
        className="flex items-center text-white text-start rounded-md w-full"
      >
        <span className="text-2xl">
          <LogOutIco></LogOutIco>
        </span>
        <span className="ml-3">Log Out</span>
      </button>
    </div>
  </div>
</div>
  );
};

export default SidBar;