import React from "react";
import { Navigate } from "../../Navigate";
import { Link, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useGetSingleBartenderQuery } from "../redux/api/manageShiftApi";
import { PageLoader } from "../../components/Loading";

const BartenderDetails = () => {
  const { id } = useParams();

  const { data: bartenderDetails, isLoading } =
    useGetSingleBartenderQuery({ id });

  const bartender = bartenderDetails?.data;

  // ✅ Loading state
  if (isLoading) {
    return (
      <PageLoader></PageLoader>
    );
  }

  return (
    <div className="p-3 h-[87vh] overflow-auto text-white">
      <Navigate title="Manage Shifts" />

      {/* Profile Image */}
      <div className="flex items-center gap-4">
        <img
          src={"https://i.pravatar.cc/150?img=12"}
          alt="Bartender"
          className="w-20 h-20 object-cover rounded-lg"
        />
      </div>

      {/* Details */}
      <div className="mt-6 border border-[#2A2448] rounded-xl">
        <div className="border-b border-[#2A2448] italic p-3">
          <h1>Bartender Details</h1>
        </div>

        <div className="grid p-3 grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400 italic">Name</p>
            <p>{bartender?.name || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-400 italic">Email</p>
            <p>{bartender?.email || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-400 italic">Contact Phone</p>
            <p>{bartender?.phone || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-400 italic">Address</p>
            <p>{bartender?.address || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-400">Primary Bar Skills</p>
            <button className="bg-[#822CE71A] px-2 mt-1 text-[#822CE7] rounded-full">
              N/A
            </button>
          </div>

          <div>
            <p className="text-gray-400 italic">Overall Rating</p>
            <p className="flex items-center gap-1">
              <FaStar className="text-yellow-400" />
              {bartender?.averageRating || 0} (
              {bartender?.totalRatings || 0})
            </p>
          </div>

          <div className="col-span-2">
            <p className="text-gray-400 italic">Location</p>
            <p>
              {bartender?.address}
            </p>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="mt-6">
        <Link to={`/dashboard/ManageShifts/add_request/${bartender?._id}`}>
          <button className="bg-gradient-to-tr w-[185px] from-[#822CE7] to-[#BB82FF] text-white shadow-md px-3 py-2 rounded-full">
            Send Shift Request
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BartenderDetails;