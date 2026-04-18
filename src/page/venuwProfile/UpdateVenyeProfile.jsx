import React, { useEffect, useState } from "react";
import { Navigate } from "../../Navigate";
import { Form, Input, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import {
  useGetSingleVenueQuery,
  useUpdateVenueDetailsMutation,
} from "../redux/api/productApi";

import {
  GoogleMap,
  Marker,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const UpdateVenyeProfile = () => {
  const [locationValue, setLocationValue] = useState("");
  const { id } = useParams();
  const { data: singleVenueDetails } = useGetSingleVenueQuery({ id });
  const [updateVenue] = useUpdateVenueDetailsMutation();

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const [position, setPosition] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const venue = singleVenueDetails?.data;

  // ✅ DEFAULT DATA LOAD
useEffect(() => {
  if (venue) {
    form.setFieldsValue({
      name: venue.name,
      email: venue.email,
      contact: venue.phone,
      location: venue.address,
      ownerName: venue?.venueOwner?.name || "",
    });


    if (venue.address) {
      setLocationValue(venue.address);
    }

    setFileList([
      {
        uid: "-1",
        name: "logo.png",
        status: "done",
        url: venue.logo,
      },
    ]);

    const lat = venue.location?.coordinates[1];
    const lng = venue.location?.coordinates[0];
    setPosition({ lat, lng });
  }
}, [venue, form]);
  // ✅ PLACE SELECT
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

  // ✅ SUBMIT
const handleSubmit = async (values) => {
  try {
    const formData = new FormData();

    // ✅ image
    if (fileList[0]?.originFileObj) {
      formData.append("venue_logo", fileList[0].originFileObj);
    }


    const data = {
      name: values.name,
      phone: values.contact,
      address: values.location,
      location: {
        type: "Point",
        coordinates: [position.lng, position.lat], // ⚠️ lng first
      },
    };

    // 🔥 VERY IMPORTANT
    formData.append("data", JSON.stringify(data));

    // API call
    await updateVenue({
      id: venue?._id,
      data: formData,
    }).unwrap();

    message.success("Venue updated successfully!");
  } catch (error) {
    console.error(error);
    message.error("Update failed");
  }
};
  return (
    <div className="p-3 h-[87vh] overflow-auto">
      <Navigate title="Venue Profile" />

      <div className="mt-6 border text-white border-[#2A2448] rounded-xl space-y-3">
        <div className="border-b border-[#2A2448] p-3">
          <h1 className="text-[18px] italic font-semibold">
            Update Venue Information
          </h1>
        </div>

        <div className="p-4">
          <Form className="custom-form" form={form} layout="vertical" onFinish={handleSubmit}>
            {/* Image */}
            <Form.Item label="Upload Venue Image">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 1 && <PlusOutlined />}
              </Upload>
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item name="name" label="Venue Name" rules={[{ required: true }]}>
                <Input className="custom-input"/>
              </Form.Item>

              <Form.Item name="ownerName" label="Owner Name">
                <Input className="custom-input"/>
              </Form.Item>

              <Form.Item name="email" label="Email">
                <Input disabled className="custom-input"/>
              </Form.Item>

              <Form.Item name="contact" label="Contact Number" rules={[{ required: true }]}>
                <Input className="custom-input"/>
              </Form.Item>
            </div>

            {/* Location */}
            <Form.Item name="location" label="Location" rules={[{ required: true }]}>
  {isLoaded && (
    <Autocomplete
      onLoad={(auto) => setAutocomplete(auto)}
      onPlaceChanged={handlePlaceChanged}
    >
      <Input
        placeholder="Search location"
        className="custom-input"
        value={locationValue}                               // ✅
        onChange={(e) => setLocationValue(e.target.value)} // ✅
      />
    </Autocomplete>
  )}
</Form.Item>

            {/* Map */}
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

            <Form.Item>
              <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
                Update
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdateVenyeProfile;