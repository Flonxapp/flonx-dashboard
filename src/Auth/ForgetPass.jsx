import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../page/redux/api/userApi";
import { message, Spin } from "antd";

const ForgetPass = () => {
  const [email, setEmail] = useState("");
  const [forgetPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate(); // ✅ FIXED

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await forgetPassword({ email }).unwrap();

      if (response?.success) {
        message.success(
          response?.message || "Verification code sent successfully!"
        );

        localStorage.setItem("resetEmail", email);

        navigate("/verification"); // ✅ now works
      }
    } catch (error) {
      message.error(
        error?.data?.message || "Failed to send verification code."
      );
    }
  };

  return (
    <div className="flex font-nunito justify-center items-center min-h-screen px-4 lg:px-0 bg-[#0F0B1A]">
      <div className="w-full max-w-lg p-8 border-[#2A2448] rounded-lg bg-[#822CE71A]">

        <h2 className="text-2xl font-semibold text-white mb-2 italic">
          Forget Password
        </h2>

        <p className="text-gray-400 mb-6 text-sm">
          Enter your email to receive a verification code.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email */}
          <div>
            <label className="text-gray-400 block mb-1">
              Enter Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-[#1D1733] border border-[#2A2448] text-white rounded-lg"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full mt-3 py-3 text-white rounded-full ${
              isLoading
                ? "bg-[#b879ff]"
                : "bg-gradient-to-tr from-[#822CE7] to-[#BB82FF]"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Spin size="small" />
                <span>Submitting...</span>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPass;