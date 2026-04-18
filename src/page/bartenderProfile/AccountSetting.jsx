import React from "react";
import { User, Settings, LogOut } from "lucide-react";

import ProfileIcon from "../../components/icon/ProfileIcon";
import SettingIco from "../../components/icon/SettingIco";
import LogoutIco from "../../components/icon/LogoutIco";
import ArrayRightIco from "../../components/icon/ArrayRightIco";
import { Navigate } from "../../Navigate";
import { Link } from "react-router-dom";
import LockIco from "../../components/icon/LockIco";
import DeleteIco from "../../components/icon/DeleteIco";

const AccountSetting = () => {
  return (
    <div className=" px-3">
      <div className="">
        <div className="flex items-center py-4 ">
          <Navigate></Navigate>
          <h1 className="text-[16px] italic text-white font-montserrat">Account Setting </h1>
        </div>

        {/* Account Setting */}
        <Link to={"/dashboard/change_password"}>
          <div className="flex items-center my-2 justify-between bg-[#1A0E2E] rounded-2xl p-3 shadow-lg border border-[#2A2448]">
            <div className="flex items-center gap-3">
              <div className="bg-[#822CE71A] p-2 rounded-lg">
                <LockIco></LockIco>
              </div>
              <span className="text-white text-sm font-medium">
                Change Password
              </span>
            </div>
            <span>
              <ArrayRightIco></ArrayRightIco>
            </span>
          </div>
        </Link>

        {/* Logout */}
        <div className="flex items-center  gap-3 bg-[#EF44441A] rounded-2xl p-3 shadow-lg border border-[#EF44441A]">
          <div className="bg-[#FFFFFF0D] p-2 rounded-lg">
            <DeleteIco></DeleteIco>
          </div>
          <span className="text-[#EF4444] text-sm font-medium">
            Delete Account
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;
