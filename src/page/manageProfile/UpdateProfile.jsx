import React, { useEffect, useState } from "react";
import { Navigate } from "../../Navigate";
import { Form, Input, Spin, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../redux/api/userApi";

const UpdateProfile = () => {
  const { data: adminProfile } = useGetProfileQuery();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const venue = adminProfile?.data;

  // ✅ Load default data
  useEffect(() => {
    if (venue) {
      form.setFieldsValue({
        name: venue.name,
        phone: venue.phone,
        email: venue.email,
      });

      setFileList(
        venue.profile_image
          ? [
              {
                uid: "-1",
                name: "profile.png",
                status: "done",
                url: venue.profile_image,
              },
            ]
          : []
      );
    }
  }, [venue, form]);

  // Upload
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
    const imgWindow = window.open(src);
    imgWindow?.document.write(`<img src="${src}" />`);
  };

  // Submit
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();

      if (fileList[0]?.originFileObj) {
        formData.append("profile_image", fileList[0].originFileObj);
      }

      const data = {
        name: values.name,
        phone: values.phone,
      };

     formData.append("data", JSON.stringify(data));

      const res  = await updateProfile({
       
        data: formData,
      }).unwrap();

      message.success(res?.message || "Profile updated successfully!");
    } catch (error) {
      console.error(error);
      message.error(error?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="p-3 h-[87vh] overflow-auto">
      <Navigate title="Update Profile" />

      <div className="mt-6 border text-white border-[#2A2448] rounded-xl space-y-3">
        <div className="border-b border-[#2A2448] p-3">
          <h1 className="text-xl font-semibold">Update Profile</h1>
          <p className="text-[#C9C6D6]">
            Review and update your details as needed.
          </p>
        </div>

        <div className="p-4">
          <Form   className="custom-form" form={form} layout="vertical" onFinish={handleSubmit}>
            
            {/* Profile Image */}
            <Form.Item label="Profile Image">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 1 && (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8, color: "white" }}>
                      Upload Profile Image
                    </div>
                  </div>
                )}
              </Upload>
            </Form.Item>

            {/* Name */}
         <div className="grid grid-cols-2 gap-4">
             <Form.Item
              label="Profile Name"
              name="name"
              rules={[{ required: true, message: "Please enter name" }]}
            >
              <Input className="custom-input" />
            </Form.Item>

            {/* Email (READ ONLY) */}
            <Form.Item label="Email Address" name="email">
              <Input className="custom-input" disabled />
            </Form.Item>
         </div>

            {/* Phone */}
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[{ required: true, message: "Please enter phone number" }]}
            >
              <Input className="custom-input" />
            </Form.Item>

            {/* Submit */}
            <Form.Item>
              <button
           type="submit"
            disabled={isLoading}
            className={`px-4 py-2 rounded-full text-white flex justify-center items-center gap-2 ${
              isLoading ? "bg-[#b879ff]" : "bg-[#822CE7] hover:bg-[#4a0e8f]"
            }`}
          >
            {isLoading ? (
              <>
                <Spin size="small" />
                <span>Updating profile...</span>
              </>
            ) : (
              "Update Profile"
            )}
              </button>
            </Form.Item>

          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;