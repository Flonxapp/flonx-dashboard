"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import LocationIco from "../../components/icon/LocationIco";
import CalenderIco from "../../components/icon/CalenderIco";
import image from "../../assets/header/logo.png";
import { Link } from "react-router-dom";
import DetailsIco from "../../components/icon/DetailsIco";

const tabs = ["Shift Requests", "Active", "Upcoming", "Completed"];


const shiftsData = {
  Active: [
    { id: 1, title: "Copper Alley Bar", status: "Active", price: "410.00" },
    { id: 2, title: "Copper Alley Bar", status: "Active", price: "410.00" },
  ],
  Upcoming: [
    { id: 3, title: "Margarita", status: "Upcoming", price: "355.00" },
  ],
  Completed: [
    { id: 4, title: "Night Club", status: "Completed", price: "500.00" },
  ],
  "Shift Requests": [
    { id: 5, title: "Request Bar", status: "Requested", price: "300.00" },
  ],
};

const ShiftCard = ({ item }) => {
  // 🔥 Status color control
  const statusStyle = {
    Active: "bg-green-500/20 text-green-400",
    Upcoming: "bg-[#822CE733] text-[#822CE7]",
    Completed: "bg-[#3D8BFF33] text-[#3D8BFF]",
    Requested: "bg-yellow-500/20 text-yellow-300",
  };

  return (
    <div className="bg-gradient-to-br from-[#1a0f2e] to-[#140a24] rounded-2xl p-3 border border-[#2A2448] shadow-lg">
      
      {/* Top */}
      <div className="flex items-center justify-between">
        <img
          className="w-[60px] h-[60px] object-cover rounded-2xl"
          src={image}
          alt=""
        />

        <span
          className={`text-xs px-3 py-1 rounded-full ${statusStyle[item.status]}`}
        >
          • {item.status}
        </span>
      </div>

      {/* Title */}
      <div className="mt-2">
        <h3 className="text-white text-lg font-semibold">{item.title}</h3>

        <div className="flex items-center text-gray-400 text-[14px] gap-1">
          <LocationIco />
          Austin, Texas, USA
        </div>
      </div>

      {/* Date + Time */}
      <div className="flex items-center justify-between mt-1 text-gray-400 text-sm">
        <div className="flex items-center gap-1">
          <CalenderIco />
          9th Feb 2026
        </div>

        <div className="flex items-center gap-1">
          <Clock size={14} />
          8:30 PM — 2:30 AM
        </div>
      </div>

      <hr className="border border-[#2A2448] my-4" />

      {/* Bottom */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">Shift Rate</p>
          <h2 className="text-white text-xl italic font-bold">
            ${item.price}
          </h2>
        </div>

      <Link to={'/dashboard/shifts/details'}>
        <button className="bg-gradient-to-br from-[#822CE7] to-[#BB82FF] text-white px-5 flex justify-between items-center gap-3 py-2 rounded-full text-sm font-medium hover:opacity-90 transition">
          View Details <DetailsIco></DetailsIco>
        </button></Link>
      </div>
    </div>
  );
};

const MyShifts = () => {
  const [activeTab, setActiveTab] = useState("Active");

  return (
    <div className="p-3">
      
      {/* Tabs */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-sm transition
              ${
                activeTab === tab
                  ? "bg-gradient-to-br from-[#822CE7] to-[#BB82FF] text-white"
                  : "bg-[#1a0f2e] text-gray-300"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="space-y-5">
        {shiftsData[activeTab].map((item) => (
          <ShiftCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MyShifts;