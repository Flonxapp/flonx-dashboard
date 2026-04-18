import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spin, message } from "antd";
import { useRegisterUserMutation } from "../page/redux/api/userApi";

const JoinAs = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "venueOwner",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formValues.password !== formValues.confirmPassword) {
      message.error("Password and Confirm Password do not match!");
      return;
    }

    try {
      const payload = { ...formValues };
      const response = await registerUser(payload).unwrap();

      // ✅ Save only email to localStorage
      localStorage.setItem("registerEmail", formValues.email);

      message.success(response?.message || "Registration successful!");
      navigate("/registerVerify");
    } catch (error) {
      console.error("Registration error:", error);
      message.error(error?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="flex font-nunito justify-center items-center min-h-screen px-4 lg:px-0 bg-[#0F0B1A]">
      <div className="w-full max-w-lg lg:p-8 p-4 border-[#2A2448] rounded-lg bg-[#822CE71A]">
        <h2 className="text-2xl font-semibold text-white italic mb-2">
          Join as a Venue Owner
        </h2>
        <p className="text-gray-400 mb-6 text-sm">
          Create your account to manage your Venue, post shifts, and hire bartenders.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-400 block mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-3 py-2 bg-[#1D1733] border border-[#2A2448] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#822CE7]"
              required
            />
          </div>

          <div>
            <label className="text-gray-400 block mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-3 py-2 bg-[#1D1733] border border-[#2A2448] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#822CE7]"
              required
            />
          </div>

          <div>
            <label className="text-gray-400 block mb-1">Contact Phone</label>
            <input
              type="tel"
              name="phone"
              value={formValues.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full px-3 py-2 bg-[#1D1733] border border-[#2A2448] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#822CE7]"
              required
            />
          </div>

          <div>
            <label className="text-gray-400 block mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formValues.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-3 py-2 bg-[#1D1733] border border-[#2A2448] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#822CE7]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div>
            <label className="text-gray-400 block mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formValues.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-3 py-2 bg-[#1D1733] border border-[#2A2448] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#822CE7]"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded text-white flex justify-center items-center gap-2 ${
              isLoading ? "bg-[#b879ff]" : "bg-[#822CE7] hover:bg-[#4a0e8f]"
            }`}
          >
            {isLoading ? (
              <>
                <Spin size="small" />
                <span>Submitting...</span>
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <span className="flex justify-center pt-2 text-white">
          Already have an account?
          <Link to={"/login"}>
            <span className="text-[#822CE7]"> Sign In</span>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default JoinAs;