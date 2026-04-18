import React from "react";
import { User, Settings, LogOut } from "lucide-react";

import ProfileIcon from "../../components/icon/ProfileIcon";
import SettingIco from "../../components/icon/SettingIco";
import LogoIco from "../../components/icon/LogoIco";
import ArrayRightIco from "../../components/icon/ArrayRightIco";
import { Navigate } from "../../Navigate";
import { Link } from "react-router-dom";

const BartenderProfile = () => {
  return (
    <div className=" px-3">
      <div className="">
        <div className="flex items-center py-4 ">
          <Navigate></Navigate>
          <h1 className="text-[16px] italic text-white font-montserrat">Profile & setting </h1>
        </div>

        {/* My Profile */}
   <Link to={'/dashboard/myProfile'}>
        <div className="flex items-center justify-between bg-[#1A0E2E] rounded-2xl p-3 shadow-lg border border-[#2A2448]">
          <div className="flex items-center gap-3">
            <div className="bg-[#822CE71A] p-2 rounded-lg">
              <ProfileIcon />
            </div>
            <span className="text-white text-sm font-medium">My Profile</span>
          </div>
          <span>
            <ArrayRightIco></ArrayRightIco>
          </span>
        </div></Link>

        {/* Account Setting */}
     <Link to={'/dashboard/accountSetting'}>
        <div className="flex items-center my-2 justify-between bg-[#1A0E2E] rounded-2xl p-3 shadow-lg border border-[#2A2448]">
          <div className="flex items-center gap-3">
            <div className="bg-[#822CE71A] p-2 rounded-lg">
              <SettingIco />
            </div>
            <span className="text-white text-sm font-medium">
              Account Setting
            </span>
          </div>
          <span>
            <ArrayRightIco></ArrayRightIco>
          </span>
        </div></Link>

        {/* Logout */}
      <Link to={'/login'}>
        <div className="flex items-center  gap-3 bg-[#EF44441A] rounded-2xl p-3 shadow-lg border border-[#EF44441A]">
          <div className="bg-[#FFFFFF0D] p-2 rounded-lg">
            <LogoIco  />
          </div>
          <span className="text-[#EF4444] text-sm font-medium">Log Out</span>
        </div></Link>
      </div>
    </div>
  );
};

export default BartenderProfile;
