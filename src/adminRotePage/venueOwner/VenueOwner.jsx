import React, { useState } from "react";
import { Input, Modal, Pagination, Select, Table, message } from "antd";
import { MdBlockFlipped } from "react-icons/md";
import { FaArrowLeft, FaChevronDown } from "react-icons/fa";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { SearchOutlined } from "@ant-design/icons";
import { LuEye } from "react-icons/lu";
import { Navigate } from "../../Navigate";
import UserDtailsIco from "../../components/icon/UserDtailsIco";
import { Link } from "react-router-dom";

import { handleDeleteConfirm } from "../../components/ConfirmDelete";
import { useGetAllVenueOwnerQuery, useUserBlockUnblockMutation } from "../../page/redux/api/admin/userApiAdmin";



const VenueOwner = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState(undefined);

  const pageSize = 10;
  const { data: userData } = useGetAllVenueOwnerQuery({
    searchTerm,
    page: currentPage,
    limit: pageSize,
    
    status,
  });
  const [blockUnblock] = useUserBlockUnblockMutation();
  const users = userData?.data?.result || [];

  // Modal states
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleCancel2 = () => {
    setIsModalOpen2(false);
    setSelectedUser(null);
  };

  // Dummy Block/Unblock
const handleBlockUnblock = async (record) => {
  const id = record?.user?._id;
  const isBlocked = record.user.isBlocked || false;
console.log(isBlocked)
  handleDeleteConfirm({
    title: isBlocked ? "Unblock User" : "Block User",
    content: isBlocked
      ? "Are you sure you want to unblock this user?"
      : "Are you sure you want to block this user?",
    
    onConfirm: async () => {
      try {
        await blockUnblock(id).unwrap();
        message.success(
          isBlocked ? "Venue Owner is Unblocked" : "Venue Owner is Blocked"
        );
      } catch (error) {
        message.error("Failed");
      }
    },
  });
};
const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Joined On",
    render: (_, record) =>
      new Date(record.createdAt).toLocaleDateString(),
  },
  {
    title: "Status",
    render: (_, record) => {
      const isBlocked = record.isBlocked || false; // fallback

      return (
        <span
          className={`px-3 py-1 italic rounded-full text-sm ${
            isBlocked
              ? "bg-red-500/20 text-red-500"
              : "bg-green-500/20 text-green-500"
          }`}
        >
          {isBlocked ? "Blocked" : "Active"}
        </span>
      );
    },
  },
   {
      title: "Action",
      align: "end",
      render: (_, record) => (
        <div className="flex gap-2 justify-end items-center">
          {/* Details */}
          <Link to={`/admin/dashboard/venue_owner/details/${record._id}`}>
            <button className="w-[30px] h-[30px] bg-[#822CE71A] flex justify-center items-center rounded-md">
              <UserDtailsIco />
            </button>
          </Link>

          {/* Block / Unblock */}
          <button
            onClick={() => handleBlockUnblock(record)}
            className={`w-[30px] h-[30px] flex justify-center items-center rounded-md ${
              record.user?.isBlocked
                ? "bg-[#EF44441A] text-[#EF4444]"
                : "bg-[#22C55E1A] text-[#22C55E]"
            }`}
          >
            <MdBlockFlipped />
          </button>
        </div>
      ),
    },
];

  // Pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className=" p-3 h-[87vh] overflow-auto ">
      <div className="flex mb-3 justify-between ">
        <Navigate title={"Venue Owner"} />
        <div className="flex gap-2 items-center">
          {/* 🔍 Search */}
          <Input
            placeholder="Search User..."
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="custom-input"
          />

          {/* 🔽 Status Filter */}
          <Select
            className="custom-select -mt-2"
            placeholder="Select Status"
            dropdownClassName="custom-select-dropdown"
            suffixIcon={
              <FaChevronDown className="text-[#C9C6D6] text-sm mt-2" />
            }
            allowClear
            onChange={(value) => {
              if (!value || value === "all") {
                setStatus(undefined); // 🔥 nothing sent
              } else {
                setStatus(value);
              }
              setCurrentPage(1);
            }}
          >
            <Option value="all">All</Option>
            <Option value="blocked">Block</Option>
            <Option value="unblocked">Unblock</Option>
          </Select>
        </div>
      </div>

      <Table
        dataSource={userData?.data?.result}
        columns={columns}
        pagination={false}
        scroll={{ x: "max-content" }}
        className="custom-table "
      />

      {/* Modal */}
      <Modal
        open={isModalOpen2}
        centered
        onCancel={handleCancel2}
        footer={null}
      >
        {selectedUser && (
          <div className="w-full max-w-md p-5 mx-auto">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-blue-100 mb-3 overflow-hidden">
                <img
                  src={selectedUser.image}
                  alt="Profile avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-bold">{selectedUser.name}</h2>

              <div className="flex items-center text-gray-500 mt-1">
                <AiOutlinePhone size={16} className="text-gray-400" />
                <span className="ml-1 text-sm">{selectedUser.phone}</span>
              </div>

              <div className="flex items-center text-gray-500 mt-1">
                <GoLocation size={16} className="text-gray-400" />
                <span className="ml-1 text-sm">Location unavailable</span>
              </div>

              <div className="flex items-center text-gray-500 mt-1">
                <AiOutlineMail size={16} className="text-gray-400" />
                <span className="ml-1 text-sm">{selectedUser.email}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
      <div className="bg-[#822CE71A] w-full py-3 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={userData?.data?.meta?.total || 0}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default VenueOwner;
