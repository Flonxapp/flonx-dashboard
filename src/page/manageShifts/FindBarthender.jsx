import React, { useState } from "react";
import { Navigate } from "../../Navigate";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetAllBartenderQuery } from "../redux/api/manageShiftApi";
import { Pagination, Input } from "antd";
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

const FindBarthender = () => {
  const [locationValue, setLocationValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [maxDistance, setMaxDistance] = useState(5); 
  const [position, setPosition] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [map, setMap] = useState(null);

  const { data: bartenderData, isLoading } = useGetAllBartenderQuery({
    searchTerm,
    page: currentPage,
    limit: pageSize,
    lat,
    lng,
    maxDistance,
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();

      if (place?.geometry) {
        const newLat = place.geometry.location.lat();
        const newLng = place.geometry.location.lng();

        setLat(newLat);
        setLng(newLng);
        setPosition({ lat: newLat, lng: newLng });
        setCurrentPage(1);
        map?.panTo({ lat: newLat, lng: newLng });

        setLocationValue(place.formatted_address);
      }
    }
  };

  if (isLoading) return <p className="text-white p-4">Loading...</p>;

  return (
    <div className="p-4 text-white">
      <Navigate title="Search Bartender" />

      {/* 🔍 Search + Location */}
      <div className="grid grid-cols-3 items-center gap-3 mt-4">
        <Input
          placeholder="Search bartender..."
          className="custom-input"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        {isLoaded && (
          <Autocomplete
            onLoad={(auto) => setAutocomplete(auto)}
            onPlaceChanged={handlePlaceChanged}
          >
            <Input
              placeholder="Search location"
              className="custom-input"
              value={locationValue}
              onChange={(e) => setLocationValue(e.target.value)}
            />
          </Autocomplete>
        )}
        <Input
          placeholder="Max Distance..."
          type="number"
          className="custom-input"
          value={maxDistance} // controlled input
          onChange={(e) => setMaxDistance(Number(e.target.value))}
        />
      </div>

      {/* 🗺 Map */}
      {isLoaded && position && (
        <div className="mt-4">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={position}
            zoom={14}
            onLoad={(map) => setMap(map)}
          >
            <Marker position={position} />
          </GoogleMap>
        </div>
      )}

      {/* 📦 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {bartenderData?.data?.result?.map((item, index) => (
          <div
            key={item._id}
            className="bg-[#822CE71A] border border-[#2A2448] rounded-2xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-[#2A2448] rounded-lg text-sm">
                {item.name?.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold italic">{item.name}</p>
                <p className="text-gray-400 text-sm">{item.email}</p>
              </div>
            </div>

            <div className="border-t border-[#2A2448] my-3"></div>

            <div className="flex justify-between text-sm">
              <div>
                <p className="text-gray-400">Phone</p>
                <p>{item.phone}</p>
              </div>

              <div>
                <p className="text-gray-400">Rating</p>
                <p className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  {item.averageRating || 0} ({item.totalRatings || 0})
                </p>
              </div>
            </div>

            <div className="border-b border-[#2A2448] my-3"></div>

            <Link to={`/dashboard/BartenderShifts/details/${item._id}`}>
              <button className="mt-4 bg-gradient-to-r from-[#822CE7] to-[#BB82FF] px-5 py-2 rounded-full text-sm">
                View Profile
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* 📄 Pagination */}
      <div className="bg-[#822CE71A] w-full py-3 mt-6 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={bartenderData?.data?.meta?.total || 0}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default FindBarthender;
