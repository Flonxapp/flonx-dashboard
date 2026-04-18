import React from "react";
import { Navigate } from "../../Navigate";
import { Form, Input, message, Spin } from "antd";
import { useCreateSupportMutation } from "../redux/api/supportApi";

const HelpSupport = () => {
  const [createSupport, { isLoading }] = useCreateSupportMutation();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const payload = {
        contactReason: values.topic, // 🔥 mapping fix
        message: values.message,
      };

      await createSupport(payload).unwrap();

      message.success("Your message has been sent!");
      form.resetFields();
    } catch (error) {
      console.log(error);
      message.error("Failed to send message!");
    }
  };

  return (
    <div className="p-3 h-[87vh] overflow-auto">
      <Navigate title="Help & Support" />

      <div className="mt-6 border text-white border-[#2A2448] rounded-xl space-y-3">
        <div className="border-b border-[#2A2448] p-3">
          <h1 className="text-[18px] italic font-semibold pb-1">
            Contact Support
          </h1>
          <p className="text-[#C9C6D6] italic">
            Send us your questions or concerns, and our team will get back to you.
          </p>
        </div>

        <div className="p-4">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="custom-form"
          >
            {/* Topic */}
            <Form.Item
              label="Contact Topic"
              name="topic"
              rules={[{ required: true, message: "Please enter a topic" }]}
            >
              <Input className="custom-input" placeholder="Enter the topic" />
            </Form.Item>

            {/* Message */}
            <Form.Item
              label="Message"
              name="message"
              rules={[{ required: true, message: "Please enter your message" }]}
            >
              <Input.TextArea
                className="custom-input"
                placeholder="Type your message here..."
                autoSize={{ minRows: 6, maxRows: 10 }}
              />
            </Form.Item>

            {/* Submit */}
            <Form.Item>
              <button
                type="submit"
                disabled={isLoading}
                className={` shadow-md px-3 py-2 rounded-full ${
                  isLoading
                    ? "bg-[#b879ff]"
                    : "bg-gradient-to-tr w-[185px] from-[#822CE7] to-[#BB82FF] text-white "
                }`}
              >
                {isLoading ? (
                  <>
                    <Spin size="small" />
                    <span>Creating Support...</span>
                  </>
                ) : (
                  "Create Support"
                )}
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;