import React from "react";
import { Camera, X } from "lucide-react";
import { Navigate } from "../../Navigate";

const UpdateVenyeProfile = () => {
  return (
    <div className="px-3 pb-5">
             <div className="flex items-center py-4 ">
                      <Navigate></Navigate>
                      <h1 className="text-[16px] italic text-white font-montserrat">Update Profile</h1>
                    </div>
      <div className="">

        {/* Avatar */}
        <div className="flex justify-center mb-6 relative">
          <div className="w-24 h-24 border border-[#2A2448] rounded-2xl bg-[#1a0d2e] flex items-center justify-center text-purple-400 text-xl font-semibold shadow-lg relative">
            RJ

            {/* Camera Icon */}
            <div className="absolute bottom-1 right-1 bg-[#822CE7]  p-1 rounded">
              <Camera className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">

          {/* Full Name */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Full Name</label>
            <input
              type="text"
              defaultValue="Roberts Junior"
              className="w-full bg-[#1D1733] text-white px-4 py-3 rounded-full outline-none border border-[#2A2448] placeholder-[#8C88A3]"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Contact Phone</label>
            <input
              type="text"
              defaultValue="+1 (212) 555-0148"
              className="w-full bg-[#1D1733] text-white px-4 py-3 rounded-full outline-none border border-[#2A2448] placeholder-[#8C88A3]"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Years of Experience</label>
            <input
              type="text"
              defaultValue="2 Years"
           className="w-full bg-[#1D1733] text-white px-4 py-3 rounded-full outline-none border border-[#2A2448] placeholder-[#8C88A3]"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block">Primary Bar Skills</label>
            <div className="w-full bg-[#1D1733] border border-[#2A2448] rounded-full px-3 py-3 flex flex-wrap gap-2">
              {["Mixology", "CustomerService", "Multitasking", "Inventory"].map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 bg-[#2a0f4d] text-purple-300 px-3 py-1 rounded-full text-xs"
                >
                  {skill}
                  <X className="w-3 h-3 cursor-pointer" />
                </div>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Short Bio</label>
            <textarea
              rows="4"
              defaultValue="Experienced bartender with strong mixology skills and a passion for delivering excellent customer service in fast-paced environments."
              className="w-full bg-[#1D1733] text-white px-4 py-3 rounded-xl outline-none border border-[#2A2448] resize-none"
            ></textarea>
          </div>

          {/* Button */}
          <button className="w-full mt-4 bg-gradient-to-br from-[#822CE7] to-[#BB82FF] py-3 rounded-full text-white text-sm font-medium hover:opacity-90 transition">
            Save The Changes
          </button>

          {/* Note */}
          <div className="flex items-start gap-2 mt-3 text-xs text-gray-400">
            <div className="border border-[#EF4444] text-red-400 w-[20px] h-[20px] flex justify-center items-center rounded-md">
              !
            </div>
            <p>
              Email updates are restricted as it is linked to authentication and system records.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UpdateVenyeProfile;