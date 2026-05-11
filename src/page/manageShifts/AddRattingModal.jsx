"use client";

import React, { useState } from "react";
import { Modal, Spin, message } from "antd";
import { Star } from "lucide-react";
import { useAddRattingMutation } from "../redux/api/productApi";

const AddRattingModal = ({
  openAddModal,
  setOpenAddModal,
  shift,
  bartender,
}) => {
    console.log(shift, bartender)
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const [addRatting, { isLoading }] = useAddRattingMutation();

  // 👉 Close modal
  const handleCancel = () => {
    setOpenAddModal(false);
    setRating(0);
  };

  // 👉 Submit rating
  const handleSubmit = async () => {
    try {
      const payload = {
        bartender,
        shift,
        rating,
      };

      const res = await addRatting(payload).unwrap();

      message.success(
        res?.message || "Rating submitted successfully"
      );

      handleCancel();
    } catch (error) {
      console.error(error);

      message.error(
        error?.data?.message || "Failed to submit rating"
      );
    }
  };

  return (
    <Modal
      centered
      open={openAddModal}
      onCancel={handleCancel}
      footer={null}
      width={500}
    >
      <div className="bg-[#0F0B1A] mx-[-25px] mt-[-20px] mb-[-45px] rounded-lg p-6 border border-[#2A2448]">
        
        {/* Title */}
        <h1 className="text-2xl font-semibold text-center text-white mb-2">
          Rate Your Bartender
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Tap the stars to rate your experience
        </p>

        {/* Custom Rating */}
        <div className="flex justify-center gap-3 mb-10">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="transition-transform duration-200 hover:scale-110"
            >
              <Star
                size={40}
                className={`transition-all duration-200 ${
                  star <= (hover || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-500"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={isLoading || !rating}
          className={` px-5 py-3 rounded-full text-white flex justify-center items-center gap-2 transition-all ${
            isLoading || !rating
              ? "bg-[#b879ff]"
              : "bg-[#822CE7] hover:bg-[#4a0e8f]"
          }`}
        >
          {isLoading ? (
            <>
              <Spin size="small" />
              <span>Submitting</span>
            </>
          ) : (
            "Submit Rating"
          )}
        </button>
      </div>
    </Modal>
  );
};

export default AddRattingModal;