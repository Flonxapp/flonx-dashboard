import React from "react";
import { Navigate } from "../../Navigate";
import { Link } from "react-router-dom";
import StripeIco from "../../components/icon/StripeIco";
import EditIcon from "../../components/icon/EditIcon";
import { useGetProfileQuery } from "../redux/api/userApi";
import {
  useCreateStripeMutation,
  useUpdateStripeMutation,
} from "../redux/api/stipApi";
import { Spin } from "antd";

const ManageProfile = () => {
  const { data: adminProfile, isLoading: profileLoading } =
    useGetProfileQuery();

  const [connectStripe, { isLoading: connectLoading }] =
    useCreateStripeMutation();
  const [updateStripe, { isLoading: updateLoading }] =
    useUpdateStripeMutation();

  const profile = adminProfile?.data;
  const isStripe = profile?.isStripeAccountConnected;

  // ✅ Connect Stripe
  const handleConnectStripe = async () => {
    try {
      const res = await connectStripe().unwrap();
      const url = res?.data;

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Connect Stripe Error:", error);
    }
  };

  // ✅ Update Stripe
  const handleUpdateStripe = async () => {
    try {
      const res = await updateStripe().unwrap();
      const url = res?.data;

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Update Stripe Error:", error);
    }
  };

  if (profileLoading) return <div className="text-white">Loading...</div>;

  return (
    <div className="p-3 h-[87vh] overflow-auto">
      <Navigate title="Manage Profile" />

      {/* Profile Image */}
      <div className="flex items-center gap-4">
        <img
          src={profile?.profile_image || "https://i.pravatar.cc/150"}
          alt="Profile"
          className="w-20 h-20 object-cover rounded-lg"
        />
      </div>

      {/* Info */}
      <div className="mt-6 border text-white border-[#2A2448] rounded-xl space-y-3">
        <div className="border-b italic border-[#2A2448] p-3">
          <h1>My Information</h1>
        </div>

        <div className="grid p-3 grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400 italic">Full Name</p>
            <p>{profile?.name}</p>
          </div>

          <div>
            <p className="text-gray-400 italic">Email Address</p>
            <p>{profile?.email}</p>
          </div>

          <div>
            <p className="text-gray-400 italic">Contact Number</p>
            <p>{profile?.phone}</p>
          </div>
        </div>
      </div>

      {/* Stripe Section */}
      <div className="mt-6 border border-[#2A2448] rounded-xl">
        <div className="border-b border-[#2A2448] text-white italic p-3">
          <h1>Connected Account</h1>
        </div>

        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`p-4 rounded-xl border ${
                isStripe
                  ? "bg-green-100 border-green-500"
                  : "bg-[#822CE71A] border-[#822CE7]"
              }`}
            >
              <StripeIco />
            </div>

            <div>
              <p className="text-[20px] font-bold text-[#635BFF]">Stripe</p>

              {isStripe ? (
                <p className="text-green-500 text-sm font-semibold">
                  Connected
                </p>
              ) : (
                <p className="text-gray-400 text-sm">Not Connected</p>
              )}
            </div>
          </div>

          {/* Right Action */}
          <div>
            {isStripe ? (
              <button
                onClick={handleUpdateStripe}
                disabled={updateLoading}
                className="bg-[#822CE71A] p-3 rounded-lg hover:bg-[#3A2B5C]"
              >
                {updateLoading ? <Spin size="small" /> : <EditIcon />}
              </button>
            ) : (
              <button
                disabled={connectLoading}
                onClick={handleConnectStripe}
                className={`py-2 rounded-full px-3 text-white flex items-center gap-2 ${
                  connectLoading
                    ? "bg-[#b879ff]"
                    : "bg-[#822CE7] hover:bg-[#4a0e8f]"
                }`}
              >
                {connectLoading ? (
                  <>
                    <Spin size="small" />
                    <span>Connecting...</span>
                  </>
                ) : (
                  "Connect Stripe Account"
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <Link to={"/dashboard/updateProfile"}>
          <button className="bg-gradient-to-tr w-[185px] from-[#822CE7] to-[#BB82FF] text-white px-3 py-2 rounded-full">
            Update Details
          </button>
        </Link>

        <Link to={"/dashboard/updatePassword"}>
          <button className="bg-gradient-to-tr w-[185px] from-[#DC3545] to-[#FE4C5D] text-white px-3 py-2 rounded-full">
            Update Password
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ManageProfile;
