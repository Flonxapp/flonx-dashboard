import React, { useEffect, useState } from "react";
import { Navigate } from "../../Navigate";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Spin,
  Upload,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FaChevronDown } from "react-icons/fa";
import { useGetSingleProductQuery, useUpdateProductMutation } from "../redux/api/productApi";
import { useGetCategoryAllQuery } from "../redux/api/categoryApi";
import { useParams } from "react-router-dom";

const { Option } = Select;

const EditProduct = () => {
  const {id} = useParams();
    const {data:productDetails} = useGetSingleProductQuery({id})
    console.log(productDetails)
    const product = productDetails?.data;
      const [form] = Form.useForm();
    useEffect(() => {
  if (product) {
    form.setFieldsValue({
      name: product.name,
      slogan: product.slogan,
      category: product.category?._id,
      price: product.price,
      availability: product.isAvailable ? "available" : "not-available",
      description: product.description,
      tags: product.tags,
      stock: product.stock,
    });

    // ✅ image preview show
    setFileList([
      {
        uid: "-1",
        name: "product.png",
        status: "done",
        url: product.image,
      },
    ]);
  }
}, [product, form]);
  const [updateProduct, { isLoading }] = useUpdateProductMutation()
    const {data:category} = useGetCategoryAllQuery()
     const formCategory = category?.data?.result;

  const [fileList, setFileList] = useState([]);

  // Upload handle
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

const handleSubmit = async (values) => {
  try {
    const formData = new FormData();

    // ✅ image (only if changed)
    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append("product_image", fileList[0].originFileObj);
    }

    // ✅ fields
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("category", values.category);
    formData.append("price", values.price);
    formData.append("slogan", values.slogan);
    formData.append("stock", values.stock);

    // ✅ availability
    formData.append(
      "isAvailable",
      values.availability === "available"
    );

    // ✅ tags
    values.tags?.forEach((tag) => {
      formData.append("tags", tag);
    });

    // 🔥 FIX HERE
    await updateProduct({ id, data: formData }).unwrap();

    message.success("Product updated successfully!");
  } catch (error) {
    console.error(error);
    message.error("Update failed");
  }
};
  return (
    <div className="p-3 h-[87vh] overflow-auto">
      <Navigate title="Edit Product" />

      <div className="mt-6 border text-white border-[#2A2448] rounded-xl space-y-3">
        <div className="border-b border-[#2A2448] p-3">
          <h1 className="text-[18px] font-semibold pb-1 italic">Update Product</h1>
          <p className="text-[#C9C6D6] italic">
            Enter product details to display on your Venue menu.
          </p>
        </div>

        <div className="p-4">
            <Form
                      form={form}
                      layout="vertical"
                      onFinish={handleSubmit}
                      className="custom-form"
                    >
                      {/* Product Image */}
                      <Form.Item label="Upload Product Image">
                        <Upload
                          listType="picture-card"
                          fileList={fileList}
                          onChange={onChange}
                          onPreview={onPreview}
                          multiple
                          className="custom-upload"
                        >
                          {fileList.length < 5 && (
                            <div>
                              <PlusOutlined />
                              <div style={{ marginTop: 8, color: "white" }}>Upload</div>
                            </div>
                          )}
                        </Upload>
                      </Form.Item>
          
                      {/* Product Name */}
                     <div className="grid grid-cols-2 gap-4">
                       <Form.Item
                        label="Product Name"
                        name="name"
                        rules={[{ required: true, message: "Please enter product name" }]}
                      >
                        <Input
                          className="custom-input"
                          placeholder="Enter product name"
                        />
                      </Form.Item>
          
                      {/* Product Slogan */}
                      <Form.Item
                        label="Product Slogan"
                        name="slogan"
                        rules={[
                          { required: true, message: "Please enter product slogan" },
                        ]}
                      >
                        <Input
                          className="custom-input"
                          placeholder="Enter product slogan"
                        />
                      </Form.Item>
          
                      {/* Product Category */}
                      <Form.Item
                        label="Product Category"
                        name="category"
                        rules={[{ required: true, message: "Please select a category" }]}
                      >
                        <Select
                          className="custom-select"
                          placeholder="Select category"
                          dropdownClassName="custom-select-dropdown"
                          suffixIcon={<FaChevronDown className="text-[#C9C6D6] text-sm mt-2" />} // Optional: Remove default icon if you want a custom one
                        >
                          {formCategory?.map((cat) => (
                          <Select.Option key={cat?._id} value={cat?._id}>
                            {cat?.name}
                          </Select.Option>
                        ))}
                        </Select>
                      </Form.Item>
          
                      {/* Product Price */}
                      <Form.Item
                        label="Product Price ($)"
                        name="price"
                        rules={[
                          { required: true, message: "Please enter product price" },
                        ]}
                      >
                        <InputNumber
                          className="custom-input w-full"
                          min={0}
                          placeholder="Enter product price"
                        />
                      </Form.Item>
          
                     </div>
                      {/* Availability */}
                      <Form.Item
                        label="Availability"
                        name="availability"
                        rules={[
                          { required: true, message: "Please select availability" },
                        ]}
                      >
                        <Select
                          className="custom-select"
                          placeholder="Select availability"
                          dropdownClassName="custom-select-dropdown"
                          suffixIcon={<FaChevronDown className="text-[#C9C6D6] text-sm mt-2" />} // Optional: Remove default icon if you want a custom one
                        >
                          <Option value="available">Available</Option>
                          <Option value="not-available">Not Available</Option>
                        </Select>
                      </Form.Item>
          
                      {/* Description */}
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea
              rows={3}
              className="custom-input"
              placeholder="Enter product description"
            />
          </Form.Item>
          
          {/* Tags (multiple) */}
          <Form.Item
            label="Tags"
            name="tags"
            rules={[{ required: true, message: "Please add tags" }]}
          >
            <Select
              mode="tags"
              className="custom-select"
              placeholder="Enter tags"
              dropdownClassName="custom-select-dropdown"
            />
          </Form.Item>
          
          {/* Stock */}
          <Form.Item
            label="Stock"
            name="stock"
            rules={[{ required: true, message: "Please enter stock" }]}
          >
            <InputNumber
              className="custom-input w-full"
              min={0}
              placeholder="Enter stock quantity"
            />
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
                  "Edit Product"
                )}
                        </button>
                      </Form.Item>
                    </Form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
