import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Form, Input, Button, Upload, message, Spin } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { useAddVenueMutation } from "../page/redux/api/userApi";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const CompleteProfile = () => {
    const [locationValue, setLocationValue] = useState("");
  const [completeProfile, { isLoading }] = useAddVenueMutation();
  const [position, setPosition] = useState(null);

  const [form] = Form.useForm();
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [fileList, setFileList] = useState([]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
const handlePlaceChanged = () => {
  if (autocomplete !== null) {
    const place = autocomplete.getPlace();

    if (place?.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const address = place.formatted_address;

      setLocationValue(address);          
      form.setFieldsValue({ location: address }); 

      setPosition({ lat, lng });
      map?.panTo({ lat, lng });
    }
  }
};
  // Upload handlers
  const onChange = ({ fileList: newFileList }) => setFileList(newFileList);

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
    imgWindow?.document.write(`<img src="${src}" style="width:100%" />`);
  };

  const handleSubmit = async (values) => {
    if (!fileList.length) {
      message.error("Please upload venue logo.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("venue_logo", fileList[0].originFileObj);

      const data = {
        name: values.venueName,
        email: values.email,
        phone: values.contact,
        address: values.location,
        location: {
          type: "Point",
          coordinates: [position?.lng, position?.lat],
        },
      };

      // ✅ DEBUG START
      console.log("Form Values:", values);
      console.log("Final Data Object:", data);
      console.log("Latitude:", values.lat);
      console.log("Longitude:", values.lng);
      console.log("Uploaded File:", fileList[0]);

      // FormData check
      formData.append("data", JSON.stringify(data));

      for (let pair of formData.entries()) {
        console.log("FormData =>", pair[0], pair[1]);
      }
      // ✅ DEBUG END

      const response = await completeProfile(formData).unwrap();

      message.success(response?.message || "Venue added successfully!");
    } catch (error) {
      console.error("API ERROR:", error);
      message.error(error?.data?.message || "Submission failed!");
    }
  };
  return (
    <div className="flex font-nunito justify-center items-center min-h-screen px-4 lg:px-0 ">
      <div className="w-full max-w-lg p-8 border border-[#2A2448] rounded-lg bg-[#822CE71A]">
        <h2 className="text-2xl font-semibold text-white mb-2 italic">
          Complete Your Venue Profile
        </h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="custom-form"
        >
          {/* Upload Image */}
          <Form.Item label="Upload Venue Logo" required>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              beforeUpload={() => false}
              className="custom-upload"
            >
              {fileList.length < 1 && (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8, color: "white" }}>
                    Upload Venue Image
                  </div>
                </div>
              )}
            </Upload>
          </Form.Item>

          {/* Venue Name */}
          <Form.Item
            label="Venue Name"
            name="venueName"
            rules={[{ required: true, message: "Please enter venue name" }]}
          >
            <Input className="custom-input" placeholder="Venue Name" />
          </Form.Item>

          {/* Owner Name */}
          <Form.Item
            label="Owner Name"
            name="ownerName"
            rules={[{ required: true, message: "Please enter owner name" }]}
          >
            <Input className="custom-input" placeholder="Owner Name" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <Input className="custom-input" placeholder="Email" />
          </Form.Item>

          {/* Contact */}
          <Form.Item
            label="Contact"
            name="contact"
            rules={[{ required: true, message: "Please enter contact number" }]}
          >
            <Input className="custom-input" placeholder="Contact Number" />
          </Form.Item>

          {/* Location */}
        {/* Location */}
<Form.Item
  label="Location"
  name="location"
  rules={[{ required: true, message: "Please select location" }]}
>
  {isLoaded && (
    <Autocomplete
      onLoad={(autoC) => setAutocomplete(autoC)}
      onPlaceChanged={handlePlaceChanged}
    >
      <Input
        className="custom-input"
        placeholder="Venue Location"
        value={locationValue}                               // ✅
        onChange={(e) => setLocationValue(e.target.value)} // ✅
      />
    </Autocomplete>
  )}
</Form.Item>
         

          {/* Google Map */}
          {isLoaded && position && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={position}
              zoom={15}
              onLoad={(map) => setMap(map)}
            >
              <Marker position={position} />
            </GoogleMap>
          )}

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
                <span>Submit in...</span>
              </>
            ) : (
              "Submit"
            )}
          </button>
        </Form>
      </div>
    </div>
  );
};

export default CompleteProfile;
