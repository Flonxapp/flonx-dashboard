import React from "react";
import { Navigate } from "../../Navigate";
import { Link } from "react-router-dom";
import { useGetProfileQuery } from "../../page/redux/api/admin/userApiAdmin";

const ManageProfile = () => {
  const { data: profileData, isLoading } = useGetProfileQuery();
console.log(profileData)
  if (isLoading) return <p>Loading...</p>;

  const profile = profileData?.data;

  return (
    <div className="p-3 h-[87vh] overflow-auto">
      <Navigate title="Manage Profile" />

      <div className="flex items-center gap-4">
        <img
          src={profile?.profile_image || "https://i.pravatar.cc/150?img=1"}
          alt="Profile"
          className="w-20 h-20 object-cover rounded-lg"
        />
      </div>

      {/* Profile Details */}
      <div className="mt-6 border text-white border-[#2A2448] rounded-xl space-y-3">
        <div className="border-b italic border-[#2A2448] p-3">
          <h1>Profile Details</h1>
        </div>

        <div className="grid p-3 grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400 italic">Full Name</p>
            <p>{profile?.name}</p>
          </div>

          <div>
            <p className="text-gray-400 italic">Username</p>
            <p>{profile?.username}</p>
          </div>

          <div>
            <p className="text-gray-400 italic">Email Address</p>
            <p>{profile?.email}</p>
          </div>

          <div>
            <p className="text-gray-400 italic">Role</p>
            <p>{profile?.user?.role}</p>
          </div>
          
          <div>
            <p className="text-gray-400 italic">Address</p>
            <p>{profile?.address}</p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <Link to={`/admin/dashboard/updateProfile/${profile?._id}`}>
          <button className="bg-gradient-to-tr w-[185px] from-[#822CE7] to-[#BB82FF] text-white shadow-md px-3 py-2 rounded-full">
            Update Details
          </button>
        </Link>

        <Link to={"/admin/dashboard/updatePassword"}>
          <button className="bg-gradient-to-tr w-[185px] from-[#DC3545] to-[#FE4C5D] text-white shadow-md px-3 py-2 rounded-full">
            Update Password
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ManageProfile;