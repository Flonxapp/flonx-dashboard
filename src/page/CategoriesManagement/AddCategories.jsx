import { Form, Input, message, Modal, Spin } from "antd";
import React, { useState } from "react";
import { useAddCategoryMutation } from "../redux/api/categoryApi";

const AddCategories = ({ openAddModal, setOpenAddModal }) => {
  const [addCategory, { isLoading }] = useAddCategoryMutation();
  const [form] = Form.useForm();

  // Close modal and reset form
  const handleCancel = () => {
    form.resetFields();
    setOpenAddModal(false);
  };

  // Submit form
  const handleSubmit = async (values) => {
    try {
      const payload = { name: values.name };
      const response = await addCategory(payload).unwrap();
      message.success(response?.message || "Category added successfully!");
      form.resetFields();
      setOpenAddModal(false);
    } catch (error) {
      console.error("Add category error:", error);
      message.error(error?.data?.message || "Failed to add category!");
    }
  };

  return (
    <Modal
      centered
      open={openAddModal}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <div className="bg-[#0F0B1A] mx-[-25px] mt-[-20px] mb-[-45px] rounded-lg p-4 border border-[#2A2448]">
        <div>
          <div className="font-bold text-center text-white">+ Add Category</div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="custom-form"
          >
            {/* Category Name */}
            <Form.Item
              label="Category Name"
              name="name"
              rules={[{ required: true, message: "Please input name!" }]}
            >
              <Input placeholder="Enter title" className="custom-input" />
            </Form.Item>

            {/* Submit */}
            <Form.Item>
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
                    <span>Adding...</span>
                  </>
                ) : (
                  "Add Category"
                )}
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default AddCategories;
