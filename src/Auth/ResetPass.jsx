import React, { useState } from "react";
import { Form, Input, message, Spin } from "antd";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../page/redux/api/userApi";

const ResetPass = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);



  const onFinish = async (values) => {
    const email = localStorage.getItem("resetEmail");

    if (!email) {
      message.error("Email not found!");
      return;
    }

    try {
      const res = await resetPassword({
        email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      }).unwrap();

      message.success(res?.message || "Password reset successful!");

    
      navigate("/login");

    } catch (error) {
      message.error(error?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-[#0F0B1A]">
      <div className="w-full max-w-lg p-6 bg-[#822CE71A] rounded-lg">

        {/* Title */}
        <h2 className="text-2xl font-semibold text-white mb-2">
          Set a New Password
        </h2>

        <p className="mb-6 text-sm text-gray-400">
          Secure your account by creating a new password.
        </p>

        {/* Form */}
        <Form form={form} layout="vertical" onFinish={onFinish}>

          {/* Password */}
          <label className="text-gray-400 block mb-1">
            New Password
          </label>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Enter your password!" },
              { min: 6, message: "Minimum 6 characters!" },
            ]}
          >
            <Input
              style={{ height: "50px" }}
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              suffix={
                <span
                  className="cursor-pointer text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              }
            />
          </Form.Item>

          {/* Confirm Password */}
          <label className="text-gray-400 block mb-1">
            Confirm Password
          </label>

          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input
              style={{ height: "50px" }}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              suffix={
                <span
                  className="cursor-pointer text-gray-400"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              }
            />
          </Form.Item>

          {/* Submit */}
          <Form.Item>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-white rounded-full bg-gradient-to-tr from-[#822CE7] to-[#BB82FF]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Spin size="small" />
                  <span>Processing...</span>
                </div>
              ) : (
                "Continue"
              )}
            </button>
          </Form.Item>

        </Form>
      </div>
    </div>
  );
};

export default ResetPass;