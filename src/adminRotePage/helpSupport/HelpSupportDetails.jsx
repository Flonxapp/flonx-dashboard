import React from "react";
import { Navigate } from "../../Navigate";
import { FiEye, FiDownload } from "react-icons/fi";
import QRCode from "react-qr-code"; // optional if you want dynamic QR
import { Link, useParams } from "react-router-dom";

import { use } from "react";
import { message } from "antd";
import { useGetSingleSupportAdminQuery, useUpdateMarkMutation } from "../../page/redux/api/admin/manageApiAdmin";


const HelpSupportDetails = () => {
  const { id } = useParams();
const [updateMark, { isLoading }] = useUpdateMarkMutation();
const handleMarkResolved = async () => {
  try {
    const res = await updateMark({
      id,
      data: { status: "RESOLVED" },
    }).unwrap();
    message.success(res?.message);
  } catch (error) {
    console.log(error);
    message.error(error?.data?.message || "Something went wrong!");
  }
};
  const { data: singleHelpSupport } = useGetSingleSupportAdminQuery({ id });
  const venue = {
    name: "Midnight Lounge",
    owner: "Daniel Roberts",
    reason: "Notification Issue",
    email: "daniel@midnightlounge.com",
    contact: "+1 (512) 555-0199",
    location: "Austin, Texas, USA",
  };

  return (
    <div className="p-3 h-[87vh] overflow-auto">
      <Navigate title="Help & Support" />
      <div className="flex items-center gap-4"></div>
      {/* Venue Details */}
      <div className=" border text-white border-[#2A2448] rounded-xl  space-y-3">
        <div className="border-b italic border-[#2A2448] p-3">
          <h1>Bartender Details </h1>
        </div>

        <div className="grid p-3 grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400 italic">Name</p>
            <p>{singleHelpSupport?.data?.userModel}</p>
          </div>

          <div>
            <p className="text-gray-400 italic">Contact Reason</p>
            <p>{singleHelpSupport?.data?.contactReason}</p>
          </div>
          <div>
            <p className="text-gray-400 italic">Submitted On</p>
            <p>{singleHelpSupport?.data?.createdAt}</p>
          </div>
          <div>
            <p className="text-gray-400 italic">Status</p>
            <button className="bg-[#FFB02033] px-2 mt-1 text-[#FFB020] rounded-full ">
              {singleHelpSupport?.data?.status}
            </button>
          </div>

          <div className="col-span-2">
            <p className="text-gray-400 italic">Message</p>
            <p>{singleHelpSupport?.data?.message}</p>
          </div>
        </div>
      </div>

      {/* Update Details Button */}
      <div className="mt-6">
      <div className="mt-6">
  <button
    onClick={handleMarkResolved}
    disabled={isLoading}
    className={`px-4 py-3 rounded-full text-white flex justify-center items-center gap-2 ${
      isLoading ? "bg-[#b879ff]" : "bg-[#822CE7] hover:bg-[#4a0e8f]"
    }`}
  >
    {isLoading ? (
      <>
        <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
        Updating...
      </>
    ) : singleHelpSupport?.data?.status === "RESOLVED" ? (
      "Solved"
    ) : (
      "Mark as Solved"
    )}
  </button>
</div>
      </div>
    </div>
  );
};

export default HelpSupportDetails;
