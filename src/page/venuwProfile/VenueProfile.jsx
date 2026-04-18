import React, { useState, useRef } from "react";
import { Navigate } from "../../Navigate";
import { FiEye } from "react-icons/fi";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { Link } from "react-router-dom";
import EditIco from "../../components/icon/EditIco";
import CopyIco from "../../components/icon/CopyIco";
import ShareIco from "../../components/icon/ShareIco";
import DownloadIco from "../../components/icon/DownloadIco";
import { useGetMyVenueQuery } from "../redux/api/productApi";

const VenueProfile = () => {
  const { data: venueProdile, isLoading } = useGetMyVenueQuery();
  const venue = venueProdile?.data;
  console.log(venueProdile);
  const venueLink = `https://localhost:3000/auth/login/${venue?._id}`;
  const [showQRModal, setShowQRModal] = useState(false);
  const qrRef = useRef(null);

  // ✅ Copy
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(venueLink);
      alert("Link copied!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // ✅ Share
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Venue Order Link",
          text: "Check this venue",
          url: venueLink,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      await navigator.clipboard.writeText(venueLink);
      alert("Sharing not supported. Link copied instead!");
    }
  };

  // ✅ Download QR
  const handleDownload = async () => {
    try {
      const response = await fetch(venue?.qrCodeUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `${venue?.name}_QR.png`;
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  // ✅ Loading state
  if (isLoading) {
    return <p className="text-white p-5">Loading...</p>;
  }

  return (
    <div className="p-3 h-[87vh] overflow-auto text-white">
      <Navigate title="Venue Profile" />

      {/* Logo */}
      <div className="flex items-center gap-4">
        <img
          src={venue?.logo || "https://via.placeholder.com/80"}
          alt="Venue Logo"
          className="w-20 h-20 object-cover rounded-lg"
        />
      </div>

      {/* Venue Details */}
      <div className="mt-6 border border-[#2A2448] rounded-xl space-y-3">
        <div className="border-b italic border-[#2A2448] p-3">
          <h1>Venue Details</h1>
        </div>

        <div className="grid p-3 grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400 italic">Venue Name</p>
            <p>{venue?.name || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-400 italic">Owner ID</p>
            <p>{venue?.venueOwner || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-400 italic">Email</p>
            <p>{venue?.email || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-400 italic">Contact Number</p>
            <p>{venue?.phone || "N/A"}</p>
          </div>

          <div className="col-span-2">
            <p className="text-gray-400 italic">Address</p>
            <p>{venue?.address || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* QR Code Section */}
      <div className="mt-6 border border-[#2A2448] rounded-xl">
        <div className="border-b border-[#2A2448] italic p-3">
          <h1>Venue QR Code</h1>
        </div>

        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div ref={qrRef} className="bg-white p-2 rounded">
              <img
                src={venue?.qrCodeUrl}
                alt="QR Code"
                className="w-16 h-16 object-contain"
              />
            </div>

            <div>
              <p className="font-semibold text-gray-400 text-[14px] italic">
                {venue?.name || "N/A"}
              </p>
              <p className="text-white text-sm">
                Share this QR code so customers can quickly view your Venue
                profile and menu.
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowQRModal(true)}
              className="bg-[#822CE71A] p-3 rounded-lg hover:bg-[#3A2B5C]"
            >
              <FiEye className="text-[#822CE7]" />
            </button>

            <button
              onClick={handleDownload}
              className="bg-[#3D8BFF1A] p-3 rounded-lg hover:bg-[#3A2B5C]"
            >
              <DownloadIco />
            </button>
          </div>
        </div>
      </div>

      {/* QR Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          <div className="bg-[#1D1733] p-6 rounded-lg relative flex flex-col items-center">
            <button
              onClick={() => setShowQRModal(false)}
              className="absolute top-2 right-2 text-white text-xl font-bold"
            >
              ✕
            </button>
            <div className="bg-white p-4 rounded">
              <img
                src={venue?.qrCodeUrl}
                alt="QR Code"
                className="w-[200px] h-[200px]"
              />
            </div>

            <p className="text-white mt-4 text-center">
              {venue?.name || "N/A"}
            </p>
          </div>
        </div>
      )}

      {/* Venue Order Manage Link */}
      <div className="mt-6 border border-[#2A2448] rounded-xl">
        <div className="border-b italic border-[#2A2448] text-white p-3">
          <h1>Venue Order Manage Link</h1>
        </div>

        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="border border-[#2A2448] p-2 rounded">
              <EditIco />
            </div>

            <div>
              <p className="font-semibold text-gray-400 text-[14px] italic">
                {venue?.name || "N/A"}
              </p>
              <p className="text-white text-sm">
                Copy the ordering link or redirect to your venue’s live order
                page
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="border border-[#2A2448] bg-[#3D8BFF1A] p-3 rounded-lg hover:bg-[#3A2B5C]"
            >
              <CopyIco className="text-gray-300" />
            </button>

            <button
              onClick={handleShare}
              className="border border-[#2A2448] bg-[#822CE71A] p-3 rounded-lg hover:bg-[#3A2B5C]"
            >
              <ShareIco className="text-gray-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Update Button */}
      <div className="mt-6">
        <Link to={`/dashboard/UpdateVenueProfile/${venue?._id}`}>
          <button className="bg-gradient-to-tr w-[185px] from-[#822CE7] to-[#BB82FF] text-white shadow-md px-3 py-2 rounded-full">
            Update Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VenueProfile;
