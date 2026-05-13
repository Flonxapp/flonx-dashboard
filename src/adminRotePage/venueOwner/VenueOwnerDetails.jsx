import React from "react";
import { Navigate } from "../../Navigate";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

import { handleDeleteConfirm } from "../../components/ConfirmDelete";
import { message, Spin } from "antd";
import { useGetSingleVenueOwnerQuery, useUserBlockUnblockMutation } from "../../page/redux/api/admin/userApiAdmin";


const VenueOwnerDetails = () => {
  const { id } = useParams();

  const {
    data: bartenderSingleData,
    isLoading,
  } = useGetSingleVenueOwnerQuery({ id });

  const [blockUnblock, { isLoading: actionLoading }] =
    useUserBlockUnblockMutation();

  const user = bartenderSingleData?.data;

  // ✅ Block / Unblock
  const handleBlockUnblock = async () => {
    const userId = user?.user?._id;
    const isBlocked = user?.user?.isBlocked;

    handleDeleteConfirm({
      title: isBlocked ? "Unblock User" : "Block User",
      content: isBlocked
        ? "Are you sure you want to unblock this user?"
        : "Are you sure you want to block this user?",

      onConfirm: async () => {
        try {
          await blockUnblock(userId).unwrap();
          message.success(
            isBlocked
              ? "Venue Owner unblocked successfully"
              : "Venue Owner blocked successfully"
          );
        } catch (error) {
          message.error("Failed");
        }
      },
    });
  };

  if (isLoading) return <Spin />;

  return (
    <div className="p-3 h-[87vh] overflow-auto">
      <Navigate title="Bartender Details" />

      {/* Image */}
      <div className="flex items-center gap-4">
        <img
          src={user?.profile_image || "https://i.pravatar.cc/150"}
          alt="Bartender"
          className="w-20 h-20 object-cover rounded-lg"
        />
      </div>

      {/* Details */}
      <div className="mt-6 border text-white border-[#2A2448] rounded-xl space-y-3">
        <div className="border-b italic border-[#2A2448] p-3">
          <h1>Venue Owner Details</h1>
        </div>

        <div className="grid p-3 grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400 italic">Name</p>
            <p>{user?.name || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-400 italic">Email</p>
            <p>{user?.email}</p>
          </div>

          <div>
            <p className="text-gray-400 italic">Contact Phone</p>
            <p>{user?.phone || "N/A"}</p>
          </div>

         
          <div>
            <p className="text-gray-400 italic">Joined On</p>
            <p>
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          <div>
            <p className="text-gray-400 italic">Status</p>
            <span
              className={`px-3 py-1 rounded-full italic text-sm ${
                user?.user?.isBlocked
                  ? "bg-red-500/20 text-red-500"
                  : "bg-green-500/20 text-green-500"
              }`}
            >
              {user?.user?.isBlocked ? "Blocked" : "Active"}
            </span>
          </div>

         
        </div>
      </div>

      {/* Block Button */}
      <div className="mt-6">
        <button
          onClick={handleBlockUnblock}
          disabled={actionLoading}
          className={`w-[185px] px-4 py-3 rounded-full text-white ${
            actionLoading
              ? "bg-[#b879ff]"
              : user?.user?.isBlocked
              ? "bg-red-500"
              : "bg-[#822CE7] hover:bg-[#4a0e8f]"
          }`}
        >
          {actionLoading ? (
            <>
              <Spin size="small" />{" "}
              {user?.user?.isBlocked ? "Unblocking..." : "Blocking..."}
            </>
          ) : user?.user?.isBlocked ? (
            "Unblock User"
          ) : (
            "Block User"
          )}
        </button>
      </div>
    </div>
  );
};

export default VenueOwnerDetails;