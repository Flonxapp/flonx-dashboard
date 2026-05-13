import React, { useState } from "react";
import { Link } from "react-router-dom";
import OTPInput from "react-otp-input";

const Verify = () => {
  const [otp, setOtp] = useState("");

  return (
    <div className="flex font-nunito justify-center items-center min-h-screen px-4 lg:px-0 bg-[#0F0B1A]">
      <div className="w-full max-w-lg p-8 border-[#2A2448] rounded-lg bg-[#822CE71A]">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-white mb-2">
          Check your email
        </h2>
        <p className="text-gray-400 mb-6 text-sm">
          We sent a reset link to <span className="text-white">foisalrk2@gmail.com</span>. Enter the 6-digit code
          mentioned in the email.
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
                className="w-16 h-16 text-white text-center bg-[#1D1733] text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                style={{ width: "40px", height: "50px" }}
              />
            )}
          />
        </div>

        {/* Continue Button */}
        <Link to={"/reset-password"}>
          <button
            type="button"
            className="w-full bg-gradient-to-tr from-[#822CE7] to-[#BB82FF] py-3 text-white rounded-full shadow-md hover:opacity-90 transition"
          >
            Continue
          </button>
        </Link>

        {/* Resend Link */}
        <span className="flex justify-center mt-4 text-gray-400 text-sm">
          You have not received the email?{" "}
          <span
            className="text-[#D17C51] cursor-pointer pl-2"
            // onClick={handleResend}
          >
            Resend
          </span>
        </span>
      </div>
    </div>
  );
};

export default Verify;