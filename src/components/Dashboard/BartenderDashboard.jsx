"use client";

import { MapPin, Clock } from "lucide-react";
import image from "../../assets/header/image.png";
import LocationIco from "../icon/LocationIco";
import CalenderIco from "../icon/CalenderIco";
import { Link } from "react-router-dom";
import ArrayRightIco from "../icon/ArrayRightIco";
import DetailsIco from "../icon/DetailsIco";
const Card = ({ title, location, date, time, price, status }) => {
  return (
    <div className="bg-gradient-to-br from-[#1a0f2e] to-[#140a24] rounded-2xl p-4 border border-[#2A2448] shadow-lg mb-5">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="  ">
            <img
              className="w-[60px] h-[60px] object-cover rounded-2xl"
              src={image}
              alt=""
            />
          </div>
        </div>

        <span
          className={`text-xs px-3 py-1 rounded-full 
          ${status === "active" ? "bg-green-500/20 text-green-400" : "bg-purple-500/20 text-purple-300"}`}
        >
          {status === "active" ? "Active" : "Upcoming"}
        </span>
      </div>
      <div>
        <h3 className="text-white font-semibold text-[18px] mt-2">{title}</h3>
        <div className="flex items-center text-gray-400 text-[14px] gap-1">
          <LocationIco></LocationIco>
          {location}
        </div>
      </div>
      {/* Middle Row */}
      <div className="flex items-center justify-between mt-1 text-gray-400 text-sm">
        <div className="flex items-center text-gray-400 text-[14px] gap-1">
          <CalenderIco></CalenderIco>
          {date}
        </div>
        <div className="flex items-center gap-1">
          <Clock size={14} />
          {time}
        </div>
      </div>

      <hr className="border border-[#2A2448] my-4" />

      {/* Bottom Row */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">Shift Rate</p>
          <h2 className="text-white text-xl italic font-bold">${price}</h2>
        </div>

        <Link to={"/dashboard/shifts/details"}>
          {" "}
          <button className="bg-gradient-to-br from-[#822CE7] to-[#BB82FF] text-white px-5 flex gap-2 justify-between items-center py-2 rounded-full text-sm font-medium hover:opacity-90 transition">
            View Details <DetailsIco></DetailsIco>
          </button>
        </Link>
      </div>
    </div>
  );
};

const BartenderDashboard = () => {
  return (
    <div className="  p-3">
      {/* Active Shifts */}
      <h2 className="text-white text-[16px] italic mb-4">Active Shifts</h2>
      <Card
        title="Copper Alley Bar"
        location="Austin, Texas, USA"
        date="9th Feb 2026"
        time="8:30 PM — 2:30 AM"
        price="410.00"
        status="active"
      />

      {/* Upcoming */}
      <div className="flex justify-between items-center mt-8 mb-4">
        <h2 className="text-white text-[16px] italic">Upcoming Shifts</h2>
        <span className="text-[#3D8BFF] text-sm cursor-pointer">View All</span>
      </div>

      <Card
        title="Margarita"
        location="Los Angeles, CA — Griffith Park Fields"
        date="9th Feb 2026"
        time="8:30 PM — 2:30 AM"
        price="355.00"
        status="upcoming"
      />

      {/* Requests */}
      <div className="flex justify-between items-center mt-8 mb-4">
        <h2 className="text-white text-[16px] italic">Shift Requests</h2>
        <span className="text-[#3D8BFF] text-sm cursor-pointer">View All</span>
      </div>

      <Card
        title="Margarita"
        location="Los Angeles, CA — Griffith Park Fields"
        date="9th Feb 2026"
        time="8:30 PM — 2:30 AM"
        price="355.00"
        status="upcoming"
      />
    </div>
  );
};

export default BartenderDashboard;
