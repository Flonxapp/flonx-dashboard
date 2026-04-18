import React from "react";
import { Navigate } from "../../Navigate";
import { FiEye, FiDownload } from "react-icons/fi";
import QRCode from "react-qr-code"; // optional if you want dynamic QR
import BarProfileIco from "../../components/icon/BarProfileIco";
import ProfileIcon from "../../components/icon/ProfileIcon";
import { Link, useParams } from "react-router-dom";
import { useGetSingleBartenderQuery } from "../redux/api/manageShiftApi";

const ShiftDetails = () => {
 
  const venue = {
    name: "15 March 2026",
    owner: "22 March 2026",
    email: "5:00 PM",
    contact: "5:00 PM",
    location: "Austin, Texas, USA",
    rate: "$250.55",
  };

  return (
    <div className="p-3 h-[87vh] overflow-auto">
      <Navigate title="Manage Shifts" />

      {/* Venue Details */}
      <div className="mt-6 border text-white border-[#2A2448] rounded-xl  space-y-3">
        <div className="border-b border-[#2A2448] italic p-3">
          <h1>About Shift </h1>
        </div>

        <div className="grid p-3 grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400 italic">Requested On</p>
            <p>{venue.name}</p>
          </div>
          <div>
            <p className="text-gray-400 italic">Shift Date</p>
            <p>{venue.owner}</p>
          </div>
          <div>
            <p className="text-gray-400 italic">Shift Start Time</p>
            <p>{venue.email}</p>
          </div>
          <div>
            <p className="text-gray-400 italic">Shift End Time</p>
            <p>{venue.contact}</p>
          </div>
          <div>
            <p className="text-gray-400 italic">Shift Rate</p>
            <p>{venue.rate}</p>
          </div>
          <div>
            <p className="text-gray-400 italic">Shift Status</p>
            <button className="bg-[#FFB02033] px-2 mt-1 text-[#FFB020] italic rounded-full ">
              Requested
            </button>
          </div>
        </div>
      </div>

      {/* QR Code Section */}
      <div className="mt-6 border border-[#2A2448] rounded-xl ">
        <div className="border-b border-[#2A2448] italic text-white p-3">
          <h1>Bartender Info </h1>
        </div>
        <div className="p-3 flex items-center text-[#C9C6D6] text-[14px] justify-between">
          <div className="">
            <img
              className="w-[70px] rounded-lg"
              src="https://i.pravatar.cc/150?img=1"
              alt="Bartender"
            />
          </div>
          <div>foisalrk2@gmail.com</div>
          <div>+1 (512) 555-0199</div>
          <div className="italic">⭐4.4 (112)</div>

          <div className="flex gap-2">
            <Link to={"/dashboard/BartenderShifts/details/1"}>
              <button className="bg-[#822CE71A] p-3 rounded-lg hover:bg-[#3A2B5C]">
                <ProfileIcon></ProfileIcon>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-6 border border-[#2A2448] italic rounded-xl ">
        <div className="border-b border-[#2A2448]  text-white p-3">
          <h1>Shifting Info </h1>
        </div>
        <h1 className="text-white py-2 text-center ">
          Your shift request has not been accepted yet. You will be notified
          once it is confirmed.
        </h1>
      </div>

      {/* Update Details Button */}
      <div className="mt-6">
        <button className="bg-gradient-to-tr w-[185px] from-[#DC3545] to-[#FE4C5D] text-white shadow-md px-3 py-2 rounded-full">
          Dicline Request
        </button>
      </div>
    </div>
  );
};

export default ShiftDetails;
