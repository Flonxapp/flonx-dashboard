import React from "react";
import { Navigate } from "../../Navigate";
import { Form, Input, message } from "antd";

const UpdatePassword = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Password Data:", values);
    message.success("Password updated successfully!");
    form.resetFields();
  };

  return (
    <div className="p-3 h-[87vh] overflow-auto">
      <Navigate title="Manage Profile" />

      <div className="mt-6 border text-white border-[#2A2448] rounded-xl space-y-3">
        <div className="border-b border-[#2A2448] p-3">
          <h1 className="text-xl font-semibold pb-1">Update Password</h1>
          <p className="text-[#C9C6D6]">
            Change your password to keep your account secure.
          </p>
        </div>

        <div className="p-4">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="custom-form"
          >
            {/* Old Password */}
            <Form.Item
              label="Old Password"
              name="oldPassword"
              rules={[{ required: true, message: "Please enter old password" }]}
            >
              <Input.Password
                className="custom-input"
                placeholder="Enter old password"
              />
            </Form.Item>

            {/* New Password */}
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[{ required: true, message: "Please enter new password" }]}
            >
              <Input.Password
                className="custom-input"
                placeholder="Enter new password"
              />
            </Form.Item>

            {/* Confirm Password */}
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Passwords do not match")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                className="custom-input"
                placeholder="Confirm new password"
              />
            </Form.Item>

            <Form.Item>
              <button
                type="submit"
                className="bg-gradient-to-tr w-[185px] from-[#822CE7] to-[#BB82FF] text-white shadow-md px-3 py-2 rounded-full"
              >
                Update Password
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;