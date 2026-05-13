import React from "react";
import { Navigate } from "../../Navigate";
import { Form, Input, message } from "antd";
import { useAddLegalCompanyMutation } from "../../page/redux/api/admin/manageApiAdmin";


const AddLegalCompany = () => {
  const [addLegalCompany, { isLoading }] = useAddLegalCompanyMutation();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
   
      const payload = {
        companyName: values.companyName,
        businessType: values.businessType,
        registeredAddress: values.registeredAddress,
        contactEmail: values.contactEmail,
        contactPhone: values.contactPhone,
        jurisdiction: values.jurisdiction,
        officialWebsite: values.officialWebsite,
      };

      await addLegalCompany(payload).unwrap();

      message.success("Company information added successfully!");
      form.resetFields();
    } catch (error) {
      message.error("Something went wrong!");
    }
  };

  return (
    <div className="p-3 h-[87vh] overflow-auto">
      <Navigate title="Legal & Company Info" />

      <div className="mt-6 border text-white border-[#2A2448] rounded-xl space-y-3">
        <div className="border-b border-[#2A2448] p-3">
          <h1 className="text-xl font-semibold pb-1">
            Update Legal & Company Info
          </h1>
          <p className="text-[#C9C6D6]">
            Manage and update your official company details.
          </p>
        </div>

        <div className="p-4">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="custom-form"
          >
            <div className="grid grid-cols-2 gap-4">

              {/* Company Name */}
              <Form.Item
                label="Company Name"
                name="companyName"
                rules={[{ required: true }]}
              >
                <Input className="custom-input" placeholder="Company Name"/>
              </Form.Item>

              {/* Business Type */}
              <Form.Item
                label="Business Type"
                name="businessType"
                rules={[{ required: true }]}
              >
                <Input className="custom-input" placeholder="Business Type"/>
              </Form.Item>

              {/* Email */}
              <Form.Item
                label="Contact Email"
                name="contactEmail"
                rules={[{ required: true, type: "email" }]}
              >
                <Input className="custom-input" placeholder="Contact Email"/>
              </Form.Item>

              {/* Phone */}
              <Form.Item
                label="Contact Phone"
                name="contactPhone"
                rules={[{ required: true }]}
              >
                <Input className="custom-input" placeholder="Contact Phone"/>
              </Form.Item>

              {/* Jurisdiction */}
              <Form.Item
                label="Jurisdiction"
                name="jurisdiction"
                rules={[{ required: true }]}
              >
                <Input className="custom-input" placeholder="Jurisdiction"/>
              </Form.Item>

              {/* Address */}
              <Form.Item
                label="Registered Address"
                name="registeredAddress"
                className="col-span-2"
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={3} className="custom-input" placeholder="Registered Address"/>
              </Form.Item>

              {/* Website */}
              <Form.Item
                label="Official Website"
                name="officialWebsite"
                className="col-span-2"
              >
                <Input className="custom-input" placeholder="Official Website"/>
              </Form.Item>
            </div>

            <Form.Item>
              <button
                type="submit" 
                disabled={isLoading}
                className="bg-gradient-to-tr w-[185px] from-[#822CE7] to-[#BB82FF] text-white shadow-md px-3 py-2 rounded-full"
              >
                {isLoading ? "Saving..." : "Save The Changes"}
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddLegalCompany;