import React from "react";
import { Star, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import { Navigate } from "../../Navigate";

const MyProfile = () => {
  return (
    <div className=" px-3 pb-5">
      <div className="flex items-center py-4 ">
        <Navigate></Navigate>
        <h1 className="text-[16px] font-montserrat italic text-white">
          My Profile
        </h1>
      </div>
      <div className="">
        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-[#822CE71A] flex items-center justify-center text-purple-400 text-xl font-semibold shadow-lg">
            RJ
          </div>
        </div>

        {/* Card Container */}
        <div className="space-y-4">
          {/* Name */}
          <div className="bg-[#822CE71A] border border-[#2A2448] rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">Name</p>
            <p className="text-white text-sm italic">Roberts Junior</p>
          </div>

          {/* Email */}
          <div className="bg-[#822CE71A] border border-[#2A2448] rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">Email</p>
            <p className="text-white text-sm italic">robert@canaletto.com</p>
          </div>

          {/* Phone */}
          <div className="bg-[#822CE71A] border border-[#2A2448] rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">Contact Phone</p>
            <p className="text-white text-sm italic">+1 (212) 555-0148</p>
          </div>

          {/* Experience */}
          <div className="bg-[#822CE71A] border border-[#2A2448] rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">Experience</p>
            <p className="text-white text-sm italic">2 Years</p>
          </div>

          {/* Skills */}
          <div className="bg-[#822CE71A] border border-[#2A2448] rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-2">Primary Bar Skills</p>
            <div className="flex flex-wrap gap-2">
              {["Mixology", "CustomerService", "Multitasking", "Inventory"].map(
                (skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs rounded-full bg-[#822CE71A] text-[#822CE7]"
                  >
                    {skill}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="bg-[#822CE71A] border border-[#2A2448] rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">Short Bio</p>
            <p className="text-white text-sm italic leading-relaxed">
              Experienced bartender with strong mixology skills and a passion
              for delivering excellent customer service in fast-paced
              environments.
            </p>
          </div>

          {/* Rating */}
          <div className="bg-[#822CE71A] border border-[#2A2448] rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">Overall Rating</p>
            <div className="flex items-center gap-2 text-yellow-400 text-sm">
              <Star className="w-4 h-4 fill-yellow-400" />
              <span>4.4 (112)</span>
            </div>
          </div>

          {/* Button */}
          <Link to={"/dashboard/UpdateProfile"}>
            <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-purple-400 py-3 rounded-full text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition">
              <Pencil className="w-4 h-4" />
              Update Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
