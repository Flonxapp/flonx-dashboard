import React, { useState } from "react";
import { Navigate } from "../../Navigate";

const PassWordChange = () => {
  const [formValues, setFormValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValues.newPassword !== formValues.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Password Data:", formValues);
    alert("Password updated successfully!");

    setFormValues({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="p-3 h-[87vh] overflow-auto">
      <div className="flex items-center py-4 ">
               <Navigate></Navigate>
               <h1 className="text-[16px] italic text-white font-montserrat">Account Setting </h1>
             </div>
      <div className="">
     
        <div className="">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Old Password */}
            <div>
              <label className="block mb-1 text-[#C9C6D6]">
                Old Password
              </label>
              <input
                type="password"
                name="oldPassword"
                value={formValues.oldPassword}
                onChange={handleChange}
                placeholder="Enter old password"
                className="w-full px-3 py-2 bg-[#1D1733] border border-[#2A2448] text-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#822CE7] placeholder-white/70"
                required
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block mb-1 text-[#C9C6D6]">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={formValues.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full px-3 py-2 bg-[#1D1733] border border-[#2A2448] text-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#822CE7] placeholder-white/70"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-1 text-[#C9C6D6]">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formValues.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-full px-3 py-2 bg-[#1D1733] border border-[#2A2448] text-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#822CE7] placeholder-white/70"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-gradient-to-tr w-full from-[#822CE7] to-[#BB82FF] text-white shadow-md px-3 py-2 rounded-full"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PassWordChange;