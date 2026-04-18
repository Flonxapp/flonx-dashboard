import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import { Spin, message } from "antd";
import { useRegisterVerifyMutation, useResentVerifyMutation } from "../page/redux/api/userApi";
import { useDispatch } from "react-redux";
import { setToken } from "../page/redux/features/auth/authSlice";

const RegisterVerify = () => {
  const dispatch = useDispatch();
  const [registerVerify, { isLoading }] = useRegisterVerifyMutation();
  const [resendVerify, { isLoading: isResending }] = useResentVerifyMutation();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // Load email from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("registerEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      message.error("No email found! Please register first.");
      navigate("/joinAs");
    }
  }, [navigate]);

  // Verify OTP
  const handleVerify = async () => {
    if (otp.length !== 6) {
      message.error("Please enter the 6-digit code.");
      return;
    }

    try {
      const payload = { email, verifyCode: Number(otp) };
      const response = await registerVerify(payload).unwrap();
console.log(response)
      message.success(response?.message || "Verification successful!");
      localStorage.removeItem("registerEmail");
      dispatch(setToken(response?.data?.accessToken));
      navigate("/completeProfile");
    } catch (error) {
      console.error("Verification error:", error);
      message.error(error?.data?.message || "Verification failed!");
    }
  };

  // Resend OTP
  const handleResend = async () => {
    try {
      const payload = { email };
      const response = await resendVerify(payload).unwrap();
      message.success(response?.message || "OTP resent successfully!");
    } catch (error) {
      console.error("Resend error:", error);
      message.error(error?.data?.message || "Failed to resend OTP!");
    }
  };

  return (
    <div className="flex font-nunito justify-center items-center min-h-screen px-4 lg:px-0 bg-[#0F0B1A]">
      <div className="w-full max-w-lg p-8 border border-[#2A2448] rounded-lg bg-[#822CE71A]">
        <h2 className="text-2xl font-semibold text-white mb-2">
          Verify Your Account
        </h2>
        <p className="text-gray-400 mb-6 text-sm">
          Enter the 6-digit code sent to{" "}
          <span className="text-[#822CE7]">{email}</span> to complete registration.
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center mb-5 gap-2">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span className="mx-1"></span>}
            renderInput={(props) => (
              <input
                {...props}
                className="w-16 h-16 text-center bg-[#1D1733] text-white text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                style={{ width: "40px", height: "50px" }}
              />
            )}
          />
        </div>

        {/* Continue Button */}
        <button
          type="button"
          onClick={handleVerify}
          disabled={isLoading}
          className={`w-full py-3 rounded text-white flex justify-center items-center gap-2 ${
            isLoading ? "bg-[#b879ff] cursor-not-allowed" : "bg-[#822CE7] hover:bg-[#4a0e8f]"
          }`}
        >
          {isLoading ? (
            <>
              <Spin size="small" />
              <span>Verifying...</span>
            </>
          ) : (
            "Continue"
          )}
        </button>

        {/* Resend Link */}
        <span className="flex justify-center mt-4 text-gray-400 text-sm">
          Didn't receive the code?{" "}
          <span
            className={`text-[#D17C51] cursor-pointer pl-2 ${
              isResending ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={isResending ? null : handleResend}
          >
            {isResending ? "Resending..." : "Resend"}
          </span>
        </span>
      </div>
    </div>
  );
};

export default RegisterVerify;