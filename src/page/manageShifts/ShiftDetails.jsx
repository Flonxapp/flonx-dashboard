import React from "react";
import { Navigate } from "../../Navigate";
import ProfileIcon from "../../components/icon/ProfileIcon";
import { Link, useParams } from "react-router-dom";
import {
  useDeclinedShiftRequestMutation,
  useGetSingleShiftsQuery,
  useUpdateShiftRequestMutation,
} from "../redux/api/manageShiftApi";

import { message } from "antd";

const ShiftDetails = () => {
  const { id } = useParams();

  const { data: singleShiftData, isLoading } = useGetSingleShiftsQuery({ id });

  const [updateShiftRequest, { isLoading: rejectLoading }] =
    useDeclinedShiftRequestMutation();

  const shift = singleShiftData?.data;

  const handleDecline = async () => {
    try {
      const res = await updateShiftRequest({
        id: shift?._id,
    
      }).unwrap();
      console.log(res);


      message.success(res?.message || "Shift request declined successfully!");
    } catch (err) {
      console.log(err);
      message.error(err?.data?.message || "Failed to decline request!");
    }
  };

  if (isLoading) return <div className="text-white p-5">Loading...</div>;

  return (
    <div className="p-3 h-[87vh] overflow-auto">
      <Navigate title="Manage Shifts" />

      {/* About Shift */}
      <div className="mt-6 border text-white border-[#2A2448] rounded-xl space-y-3">
        <div className="border-b border-[#2A2448] italic p-3">
          <h1>About Shift</h1>
        </div>

        <div className="grid p-3 grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400 italic">Requested On</p>
            <p>{new Date(shift?.createdAt).toLocaleDateString()}</p>
          </div>

          <div>
            <p className="text-gray-400 italic">Shift Date</p>
            <p>{new Date(shift?.startDateTime).toLocaleDateString()}</p>
          </div>

          <div>
            <p className="text-gray-400 italic">Shift Start Time</p>
            <p>{new Date(shift?.startDateTime).toLocaleTimeString()}</p>
          </div>

          <div>
            <p className="text-gray-400 italic">Shift End Time</p>
            <p>{new Date(shift?.endDateTime).toLocaleTimeString()}</p>
          </div>

          <div>
            <p className="text-gray-400 italic">Shift Rate</p>
            <p>$0</p>
          </div>

          <div>
            <p className="text-gray-400 italic">Shift Status</p>
            <button
              className={`px-2 mt-1 italic rounded-full ${
                shift?.status === "Requested"
                  ? "bg-[#FFB02033] text-[#FFB020]"
                  : "bg-green-500/20 text-green-400"
              }`}
            >
              {shift?.status}
            </button>
          </div>
        </div>
      </div>

      {/* Bartender Info */}
      <div className="mt-6 border border-[#2A2448] rounded-xl">
        <div className="border-b border-[#2A2448] italic text-white p-3">
          <h1>Bartender Info</h1>
        </div>

        <div className="p-3 flex items-center text-[#C9C6D6] text-[14px] justify-between">
          <img
            className="w-[70px] rounded-lg"
            src={
              shift?.bartender?.profile_image ||
              "https://i.pravatar.cc/150?img=1"
            }
            alt="Bartender"
          />

          <div>{shift?.bartender?.email}</div>
          <div>{shift?.bartender?.phone}</div>
          <div className="italic">⭐ {shift?.avgRating || 0}</div>

          <div>
            <Link
              to={`/dashboard/BartenderShifts/details/${shift?.bartender?._id}`}
            >
              <button className="bg-[#822CE71A] p-3 rounded-lg hover:bg-[#3A2B5C]">
                <ProfileIcon />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Info Message */}
      <div className="mt-6 border border-[#2A2448] italic rounded-xl">
        <div className="border-b border-[#2A2448] text-white p-3">
          <h1>Shifting Info</h1>
        </div>

        <h1 className="text-white py-2 text-center">
          {shift?.status === "Requested"
            ? "Your shift request has not been accepted yet."
            : "Shift already processed."}
        </h1>
      </div>

      {/* ✅ Decline Button (ONLY when Requested) */}
      {shift?.status === "Requested" && (
        <div className="mt-6">
          <button
            onClick={handleDecline}
            disabled={rejectLoading}
            className="bg-gradient-to-tr w-[185px] from-[#DC3545] to-[#FE4C5D] text-white shadow-md px-3 py-2 rounded-full disabled:opacity-70"
          >
            {rejectLoading ? "Processing..." : "Decline Request"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ShiftDetails;
