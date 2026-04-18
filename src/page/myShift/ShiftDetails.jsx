"use client";

import { Link } from "react-router-dom";
import Image1 from "../../assets/header/image.png";
import PaymentIcon from "../../components/icon/PaymentIcon";
import ShopDetailsIco from "../../components/icon/ShopDetailsIco";
import { Navigate } from "../../Navigate";

const Box = ({ title, value }) => (
  <div className="mt-2 bg-[#1A0E2E] rounded-2xl p-4 shadow-lg border border-[#2A2448]">
    <h1 className="text-[#C9C6D6] text-sm mb-2">{title}</h1>
    <p className="text-white text-[14px]">{value}</p>
  </div>
);

const ShiftDetails = () => {
  return (
    <div className="min-h-screen bg-[#0b0618] px-4 pt-6 pb-28 text-white">
      
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
        <Navigate />
        <h1 className="text-[16px] italic font-montserrat">Shift Details</h1>
      </div>
       <Link to={'/dashboard/shifts/venueDetails'}>
        <button className="border flex gap-2 border-[#822CE7] text-[#822CE7] px-4 py-2 rounded-full text-sm">
          <ShopDetailsIco /> Venue Details
        </button></Link>
      </div>

      {/* Image + Title */}
      <div className="py-5">
        <img
          className="w-[90px] h-[90px] object-cover rounded-2xl"
          src={Image1}
          alt="Logo"
        />
        <h2 className="mt-3 text-[20px] italic font-semibold">Copper Alley Bar</h2>
      </div>

      {/* Info Sections */}
      <Box title="Location" value="Austin, Texas, USA" />

      <Box title="Date" value="22, 23 February 2026" />

      <Box title="Time" value="6:00 PM — 11:00 PM" />

      <Box title="Contact Number" value="+1 (212) 555-0148" />

      <Box
        title="Details"
        value="Join us for an evening of networking, live music, and curated drinks. Connect with professionals, entrepreneurs, and creatives in a relaxed rooftop setting."
      />

      {/* Payment Info */}
      <div className="mt-4 bg-[#1A0E2E] rounded-2xl p-4 shadow-lg border border-[#2A2448]">
        <h1 className="text-[#C9C6D6] text-sm mb-3 flex items-center gap-2">
          <PaymentIcon></PaymentIcon> Payment Info
        </h1>

        <div className="flex justify-between items-center">
          <p className="text-gray-400 text-sm">Shift Rate</p>
          <p className="text-white font-semibold">$ 375</p>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className=" w-full px-4 py-4 bg-[#0b0618] flex gap-3">
        
        <button className="w-1/2 py-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium">
          Decline Shift
        </button>

        <button className="w-1/2 py-3 rounded-full bg-gradient-to-br from-[#822CE7] to-[#BB82FF] text-white font-medium">
          Accept Shift
        </button>

      </div>
    </div>
  );
};

export default ShiftDetails;