import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import {
  useRegisterVerifyMutation,
  useResentVerifyMutation,
} from "../page/redux/api/userApi";
import { message, Spin } from "antd";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const [verifyOtp, { isLoading }] = useRegisterVerifyMutation();
  const [resendOtp, { isLoading: isResendLoading }] =
    useResentVerifyMutation();

  const email = localStorage.getItem("resetEmail");

  // ✅ resend
  const handleResend = async () => {
    if (!email) {
      message.error("Email not found!");
      return;
    }

    try {
      const res = await resendOtp({ email }).unwrap();
      message.success(res?.message || "Code resent!");
    } catch (err) {
      message.error(err?.data?.message || "Resend failed");
    }
  };

  // ✅ verify
  const handleSubmit = async () => {
    if (!email) {
      message.error("Email not found!");
      return;
    }

    if (otp.length !== 6) {
      message.error("Enter 6-digit OTP");
      return;
    }

    try {
      const res = await verifyOtp({
        email,
        resetCode: Number(otp),
      }).unwrap();

      message.success(res?.message || "OTP verified!");

      // ✅ correct navigation
      navigate("/reset-password");

    } catch (err) {
      message.error(err?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0F0B1A] px-4">
      <div className="w-full max-w-lg p-8 bg-[#822CE71A] rounded-lg">

        <h2 className="text-2xl text-white mb-2">Check your email</h2>

        <p className="text-gray-400 mb-6 text-sm">
          Code sent to <span className="text-white">{email}</span>
        </p>

        {/* OTP */}
        <div className="flex justify-center mb-5">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => (
              <input
                {...props}
                className="w-10 h-12 mx-1 text-center bg-[#1D1733] text-white rounded"
              />
            )}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-3 text-white rounded-full bg-gradient-to-tr from-[#822CE7] to-[#BB82FF]"
        >
          {isLoading ? (
            <div className="flex justify-center gap-2">
              <Spin size="small" />
              Verifying...
            </div>
          ) : (
            "Continue"
          )}
        </button>

        {/* Resend */}
        <div className="text-center mt-4 text-gray-400 text-sm">
          Didn’t get code?{" "}
          <span
            onClick={handleResend}
            className="text-[#D17C51] cursor-pointer"
          >
            {isResendLoading ? "Sending..." : "Resend"}
          </span>
        </div>

      </div>
    </div>
  );
};

export default Verify;