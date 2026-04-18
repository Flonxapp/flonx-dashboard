import { Form, Input, message, Modal, Spin, Upload } from "antd";
import React, { useEffect, useState } from "react";
// import { useUpdateCategoryMutation } from "../redux/api/categoryApi";
import { imageUrl } from "../redux/api/baseApi";
import { useUpdateCategoryMutation } from "../redux/api/categoryApi";

const EditCategories = ({ editModal, setEditModal, selectedCategory }) => {
  console.log(selectedCategory)
  const [form] = Form.useForm();
const [editCategory, { isLoading }] = useUpdateCategoryMutation();
 

  // const [updateCategory] = useUpdateCategoryMutation();


  // ✅ Whenever modal opens, fill default data again
  useEffect(() => {
    if (editModal && selectedCategory) {
      form.setFieldsValue({
        name: selectedCategory?.name,
      });

     
    }
  }, [editModal, selectedCategory, form]);


  const handleCancel = () => {
    form.resetFields();
  
    setEditModal(false);
  };

  const handleSubmit = async (values) => {
  try {
    const data = {
      name: values.name,
    };

    console.log("Update ID:", selectedCategory?._id);
    console.log("Update Data:", data);

    const res = await editCategory({
      id: selectedCategory?._id,
      data,
    }).unwrap();

    message.success(res?.message || "Category updated successfully");

    handleCancel();
  } catch (error) {
    console.error(error);
    message.error(error?.data?.message || "Update failed");
  }
};

  return (
     <Modal
      centered
     open={editModal}
      onCancel={handleCancel}
      footer={null}
      width={600}
     
    >
      <div className="bg-[#0F0B1A] mx-[-25px] mt-[-20px]  mb-[-45px] rounded-lg p-4 border border-[#2A2448]">
        <div>
          <div className="font-bold text-center text-white">+ Edit Category</div>

          <Form
  form={form}
  layout="vertical"
  onFinish={handleSubmit}
  className="custom-form"
>
  <Form.Item
    label="Category Name"
    name="name"
    rules={[{ required: true, message: "Please input name!" }]}
  >
    <Input placeholder="Enter title" className="custom-input" />
  </Form.Item>

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
          <span>Updating...</span>
        </>
      ) : (
        "Update Category"
      )}
    </button>
  </Form.Item>
</Form>
        </div>
      </div>
    </Modal>
  );
};

export default EditCategories;
